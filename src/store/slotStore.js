import { create } from 'zustand';
import { mockSlots } from '../data/mockData'; // Adjust the import path as necessary
import { format } from 'date-fns';

const useSlotStore = create((set, get) => ({
    slots: [...mockSlots],

    // Add a new slot
    addSlot: (slotData) => {
        const newSlot = {
            ...slotData,
            id: Date.now(),
            bookings: 0,
        };
        set((state) => ({
            slots: [...state.slots, newSlot],
        }));
    },

    // Delete slot by ID
    deleteSlot: (id) => {
        set((state) => ({
            slots: state.slots.filter((slot) => slot.id !== id),
        }));
    },

    // Filter slots by date and tab type
    getFilteredSlots: (selectedDate, activeTab) => {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        return get().slots.filter((slot) => {
            const isSameDate = slot.date === formattedDate;

            if (activeTab === 'available') {
                return isSameDate && slot.bookings < slot.maxBookings;
            } else if (activeTab === 'full') {
                return isSameDate && slot.bookings >= slot.maxBookings;
            }
            return isSameDate;
        });
    },

    // Increase bookings count when user books a slot
    incrementBookings: (slotId) => {
        set((state) => ({
            slots: state.slots.map((slot) =>
                slot.id === slotId
                    ? { ...slot, bookings: slot.bookings + 1 }
                    : slot
            ),
        }));
    },

    // Lookup slot by date, time and service
    getSlotByDetails: (date, time, service) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        return get().slots.find(
            (slot) =>
                slot.date === formattedDate &&
                slot.startTime === time &&
                slot.service === service
        );
    },

    // Optional utility for UI components
    getAvailableSlots: (date, service) => {
        const formattedDate = format(date, 'yyyy-MM-dd');

        return get().slots
            .filter((slot) =>
                slot.date === formattedDate &&
                slot.bookings < slot.maxBookings &&
                slot.service === service
            )
            .map(({ startTime, endTime }) => ({
                startTime,
                endTime
            }));
    }
}));

export default useSlotStore;
