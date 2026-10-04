'use client';
import { getMe, refreshAccessToken } from "@/lib/http";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const authStatusValues = {
    loading: "loading",
    authenticated: "authenticated",
    unauthenticated: "unauthenticated"
};

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null)
    const [user, setUser] = useState(null);
    const [authStatus, setAuthStatus] = useState(authStatusValues.loading)
    useEffect(() => {
        let active = true;

        async function loadAuth() {
            try {
                const refreshResponse = await refreshAccessToken()
                console.log("context::",refreshResponse)
                const token = refreshResponse?.success ? refreshResponse?.data?.accessToken : null

                if (!active) return;  

                if (!token) {
                    setAuthStatus(authStatusValues.unauthenticated)
                    return;
                }

                const userResponse = await getMe(token)
                if (!active) return;

                if (!userResponse?.success || !userResponse?.data) {
                    setUser(null)
                    setAccessToken(null)
                    setAuthStatus(authStatusValues.unauthenticated)
                    return;
                }

                setUser(userResponse.data)
                setAccessToken(token)
                setAuthStatus(authStatusValues.authenticated)
            } catch (error) {
                if (!active) return;
                setUser(null)
                setAccessToken(null)
                setAuthStatus(authStatusValues.unauthenticated)
            }
        }

        loadAuth();
        return () => {
            active = false;
        };
    }, [])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser, authStatus, setAuthStatus }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('auth must use in provider')
    }

    return context;
}