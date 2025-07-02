export const mockUsers = {
    admin: {
        id: 1,
        name: "Admin User",
        email: "admin@quickbook.com", // Must be exact
        password: "admin123",        // Case sensitive
        role: "admin",
        avatar: ""
    },
    user: {
        id: 2,
        name: "Regular User",
        email: "user@quickbook.com", // Must be exact
        password: "user123",         // Case sensitive
        role: "user",
        avatar: ""
    }
};
export const mockNavLinks = {
    admin: [
        { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
        { path: "/admin/bookings", label: "Bookings", icon: "📅" },
        { path: "/admin/requests", label: "Requests", icon: "🔄" }
    ],
    user: [
        { path: "/dashboard", label: "Dashboard", icon: "📊" },
        { path: "/book-appointment", label: "Book Appointment", icon: "➕" },
        { path: "/appointments", label: "My Appointments", icon: "📋" }
    ]
};