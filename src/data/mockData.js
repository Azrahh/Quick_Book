import { format } from 'date-fns';
import { SERVICES } from './services';

const statuses = ['Confirmed', 'Pending', 'Cancelled'];

export const generateMockBookings = () => {
    const bookings = [];

    for (let i = 1; i <= 45; i++) {
        const randomDays = Math.floor(Math.random() * 30);
        const date = new Date();
        date.setDate(date.getDate() + randomDays);

        bookings.push({
            id: i,
            userName: `User ${i}`,
            email: `user${i}@example.com`,
            service: SERVICES[Math.floor(Math.random() * SERVICES.length)],
            duration: `${Math.floor(Math.random() * 6) * 15 + 15} mins`,
            date: format(date, 'MMM d, yyyy'),
            time: format(date, 'h:mm a'),
            status: statuses[Math.floor(Math.random() * statuses.length)],
        });
    }

    return bookings;
};

export const mockAppointments = [
    {
        id: 1,
        userName: "Regular User",
        email: "user@quickbook.com",
        service: "Check-up",
        date: "2025-04-24",
        time: "10:30 AM",
        duration: "30 mins",
        status: "Pending",
    },
    {
        id: 2,
        userName: "Regular User",
        email: "user@quickbook.com",
        service: "Screening",
        date: "2025-04-26",
        time: "2:00 PM",
        duration: "30 mins",
        status: "Confirmed",
    },
    {
        id: 3,
        userName: "Regular User",
        email: "user@quickbook.com",
        service: "Therapy",
        date: "2025-04-28",
        time: "11:15 AM",
        duration: "45 mins",
        status: "Cancelled",
    },
    {
        id: 4,
        userName: "Regular User",
        email: "user@quickbook.com",
        service: "Check-up",
        date: "2025-05-01",
        time: "9:00 AM",
        duration: "30 mins",
        status: "Pending",
    },
    {
        id: 5,
        userName: "Regular User",
        email: "user@quickbook.com",
        service: "Check-up",
        date: "2025-07-03",
        time: "3:30 PM",
        duration: "45 mins",
        status: "Confirmed",
    },
    {
        id: 6,
        userName: "Regular User",
        email: "user@quickbook.com",
        service: "Treatment",
        date: "2025-07-05",
        time: "1:45 PM",
        duration: "15 mins",
        status: "Pending",
    },
    {
        id: 7,
        userName: "Regular User",
        email: "user@quickbook.com",
        service: "Screening",
        date: "2025-07-07",
        time: "10:00 AM",
        duration: "20 mins",
        status: "Confirmed",
    },
    {
        id: 8,
        userName: "Regular User",
        email: "user@quickbook.com",
        service: "Screening",
        date: "2025-07-09",
        time: "8:30 AM",
        duration: "15 mins",
        status: "Pending",
    },
    {
        id: 9,
        userName: "Regular User",
        email: "user@quickbook.com",
        service: "Screening",
        date: "2025-07-11",
        time: "2:15 PM",
        duration: "30 mins",
        status: "Confirmed",
    },
    {
        id: 10,
        userName: "Regular User",
        email: "user@quickbook.com",
        service: "Screening",
        date: "2025-07-15",
        time: "4:00 PM",
        duration: "60 mins",
        status: "Pending",
    },
];

export const mockSlots = [
    {
        id: 1,
        date: '2025-07-01',
        startTime: '09:00',
        endTime: '09:30',
        service: 'Consultation',
        maxBookings: 5,
        bookings: 3,
    },
    {
        id: 2,
        date: '2025-07-01',
        startTime: '10:00',
        endTime: '10:30',
        service: 'Treatment',
        maxBookings: 3,
        bookings: 0,
    },
    {
        id: 3,
        date: '2025-07-02',
        startTime: '11:00',
        endTime: '11:45',
        service: 'Check-up',
        maxBookings: 4,
        bookings: 2,
    },
];
