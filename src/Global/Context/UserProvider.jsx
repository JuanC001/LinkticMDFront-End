import { useEffect, useState } from 'react'
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [authStatus, setAuthStatus] = useState("checking");

    const loggedIn = (respUser) => {

        const { uid, name, lastname, username, email, token } = respUser
        setUser({
            uid,
            name,
            lastname,
            username,
            email,
            token
        })
        setAuthStatus(true);
        window.sessionStorage.setItem('user', JSON.stringify({ uid, name, token }));

    }

    const logout = () => {

        setUser(null);
        setAuthStatus(false);
        window.location.href = '/login';
        window.sessionStorage.removeItem('user');
        window.sessionStorage.clear();
        window.localStorage.clear();

    }

    useEffect(() => {

        const user = window.sessionStorage.getItem('user');
        if (user) {
            loggedIn(JSON.parse(user));
            return
        }
        setAuthStatus(false);

    }, [])

    return (
        <UserContext.Provider value={{ user, authStatus, loggedIn, logout }}>
            {children}
        </UserContext.Provider>

    )
}