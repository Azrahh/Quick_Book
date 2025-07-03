import { create } from 'zustand';
import { format, parseISO, addMinutes } from 'date-fns';
import { mockAppointments } from '../data/mockData';
import useSlotStore from './slotStore';

// 🔧 Utility functions
const toDateTime = (dateStr, timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date(dateStr);
    date.setHours(+hours, +minutes, 0, 0);
    return date;
};

const toTimeString = (date) => {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

const allTimeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

const useBookingsStore = create((set, get) => {
    const today = new Date();
    const cleanExpiredAppointments = (appointments) =>
        appointments.map((booking) => {
            const bookingDate = new Date(booking.date);
            if (
                booking.status === 'Pending' &&
                bookingDate < new Date(today.toDateString())
            ) {
                return { ...booking, status: 'Cancelled' };
            }
            return booking;
        });

    const initialBookings = cleanExpiredAppointments(mockAppointments);

    return {
        bookings: initialBookings,

        filters: {
            search: '',
            service: 'All Services',
            status: 'All Status',
            date: '',
        },

        currentPage: 1,
        itemsPerPage: 5,

        // Filters & Pagination
        setFilter: (filterName, value) =>
            set((state) => ({
                filters: { ...state.filters, [filterName]: value },
                currentPage: 1,
            })),

        setPage: (page) => set({ currentPage: page }),

        getFilteredBookings: () => {
            const { bookings, filters } = get();
            return bookings.filter((booking) => {
                const matchesSearch =
                    filters.search === '' ||
                    booking.service.toLowerCase().includes(filters.search.toLowerCase()) ||
                    booking.email.toLowerCase().includes(filters.search.toLowerCase()) ||
                    booking.date.toLowerCase().includes(filters.search.toLowerCase()) ||
                    booking.time.toLowerCase().includes(filters.search.toLowerCase());

                const matchesService =
                    filters.service === 'All Services' || booking.service === filters.service;

                const matchesStatus =
                    filters.status === 'All Status' || booking.status === filters.status;

                const matchesDate =
                    filters.date === '' ||
                    booking.date === format(parseISO(filters.date), 'MMM d, yyyy');

                return matchesSearch && matchesService && matchesStatus && matchesDate;
            });
        },

        getPaginatedBookings: () => {
            const { currentPage, itemsPerPage } = get();
            const filtered = get().getFilteredBookings();
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return filtered.slice(startIndex, endIndex);
        },

        getTotalPages: () => {
            const totalItems = get().getFilteredBookings().length;
            return Math.ceil(totalItems / get().itemsPerPage);
        },

        // Booking Actions
        addBooking: (booking) => {
            const slotStore = useSlotStore.getState();
            const slot = slotStore.getSlotByDetails(booking.date, booking.time, booking.service);
            if (slot) {
                slotStore.incrementBookings(slot.id);
            }
            set((state) => ({
                bookings: [
                    ...state.bookings,
                    { ...booking, id: Date.now(), status: 'Pending' },
                ],
            }));
        },

        confirmBooking: (id) =>
            set((state) => ({
                bookings: state.bookings.map((booking) =>
                    booking.id === id ? { ...booking, status: 'Confirmed' } : booking
                ),
            })),

        cancelBooking: (id) =>
            set((state) => ({
                bookings: state.bookings.map((booking) =>
                    booking.id === id ? { ...booking, status: 'Cancelled' } : booking
                ),
            })),

        deleteBooking: (id) =>
            set((state) => ({
                bookings: state.bookings.filter((booking) => booking.id !== id),
            })),

        updateBooking: (id, updatedFields) =>
            set((state) => ({
                bookings: state.bookings.map((b) =>
                    b.id === id ? { ...b, ...updatedFields } : b
                ),
            })),

        // Available Slots
        getAvailableSlots: (date, serviceName) => {
            if (!date || !serviceName) return [];

            const dateStr = format(date, 'yyyy-MM-dd');
            const bookings = get().bookings.filter(
                (b) =>
                    b.date === dateStr &&
                    b.service === serviceName &&
                    b.status !== 'Cancelled'
            );

            const slots = [];

            for (let time of allTimeSlots) {
                const start = toDateTime(dateStr, time);
                const end = addMinutes(start, 30);
                const overlaps = bookings.some((b) => {
                    const bStart = toDateTime(b.date, b.time);
                    const bEnd = addMinutes(bStart, parseInt(b.duration));
                    return start < bEnd && bStart < end;
                });
                if (!overlaps) {
                    slots.push({ startTime: time, endTime: toTimeString(end) });
                }
            }

            return slots;
        },
    };
});

export default useBookingsStore;
