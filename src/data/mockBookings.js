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
            status: statuses[Math.floor(Math.random() * statuses.length)]
        });
    }

    return bookings;
};
