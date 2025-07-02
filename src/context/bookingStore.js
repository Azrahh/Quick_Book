import { create } from 'zustand';
import { format, parseISO } from 'date-fns';

const generateMockBookings = () => {
    const services = ['Consultation', 'Treatment', 'Check-up', 'Therapy', 'Screening'];
    const statuses = ['Confirmed', 'Pending', 'Cancelled'];
    const bookings = [];

    for (let i = 1; i <= 45; i++) {
        const randomDays = Math.floor(Math.random() * 30);
        const date = new Date();
        date.setDate(date.getDate() + randomDays);

        bookings.push({
            id: i,
            userName: `User ${i}`,
            email: `user${i}@example.com`,
            service: services[Math.floor(Math.random() * services.length)],
            duration: `${Math.floor(Math.random() * 6) * 15 + 15} mins`,
            date: format(date, 'MMM d, yyyy'),
            time: format(date, 'h:mm a'),
            status: statuses[Math.floor(Math.random() * statuses.length)]
        });
    }

    return bookings;
};

export const useBookingsStore = create((set, get) => ({
    bookings: generateMockBookings(),
    filters: {
        search: '',
        service: 'All Services',
        status: 'All Status',
        date: ''
    },
    currentPage: 1,
    itemsPerPage: 10,

    setFilter: (filterName, value) => set((state) => ({
        filters: { ...state.filters, [filterName]: value },
        currentPage: 1
    })),

    setPage: (page) => set({ currentPage: page }),

    getFilteredBookings: () => {
        const { bookings, filters } = get();
        return bookings.filter(booking => {
            const matchesSearch = filters.search === '' ||
                booking.userName.toLowerCase().includes(filters.search.toLowerCase()) ||
                booking.email.toLowerCase().includes(filters.search.toLowerCase());
            const matchesService = filters.service === 'All Services' ||
                booking.service === filters.service;
            const matchesStatus = filters.status === 'All Status' ||
                booking.status === filters.status;
            const matchesDate = filters.date === '' ||
                booking.date === format(parseISO(filters.date), 'MMM d, yyyy');

            return matchesSearch && matchesService && matchesStatus && matchesDate;
        });
    },

    confirmBooking: (id) => set((state) => ({
        bookings: state.bookings.map(booking =>
            booking.id === id ? { ...booking, status: 'Confirmed' } : booking
        )
    })),

    cancelBooking: (id) => set((state) => ({
        bookings: state.bookings.map(booking =>
            booking.id === id ? { ...booking, status: 'Cancelled' } : booking
        )
    })),

    deleteBooking: (id) => set((state) => ({
        bookings: state.bookings.filter(booking => booking.id !== id)
    }))
}));