// src/data/mockUsers.js

const USERS_KEY = 'quickbook_users';

const defaultUsers = [
    {
        id: 1,
        name: 'Admin User',
        email: 'admin@quickbook.com',
        password: 'admin123',
        role: 'admin',
        avatar: '/avatars/default.png',
    },
    {
        id: 2,
        name: 'Azrah',
        email: 'user@quickbook.com',
        password: 'user123',
        role: 'user',
        avatar: '/avatars/avatar4.png',
    }
];

// 🔄 Get all users
export const getMockUsers = () => {
    const fromLocal = JSON.parse(localStorage.getItem(USERS_KEY));
    if (fromLocal && Array.isArray(fromLocal)) {
        return fromLocal;
    } else {
        localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
        return defaultUsers;
    }
};

// ✅ Add new user
export const addMockUser = (newUser) => {
    const users = getMockUsers();
    users.push({
        ...newUser,
        id: Date.now(),
        role: 'user',
        avatar: '/avatars/avatar1.png', // Fixed single avatar
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// 🔍 Find user by email
export const findUserByEmail = (email) => {
    return getMockUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
};
