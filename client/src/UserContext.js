import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('');

    const logout = () => {
        setUsername('');
        localStorage.removeItem('token'); // Optional: Remove any saved token
    };

    return (
        <UserContext.Provider value={{ username, setUsername, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);