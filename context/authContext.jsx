'use client';
import { getMe, refreshAccessToken } from "@/lib/http";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null)
    const [user, setUser] = useState(null);
    const currAuth = {
        loading: "loading",
        authenticated: "authenticated",
        unauthenticated: "unauthenticated"
    };
    const [authStatus, setAuthStatus] = useState(currAuth?.loading)
    const authPaths = ['/login', '/signup', '/forgot-password']
    const pathname = usePathname()
    useEffect(() => {

        async function refreshWeb() {
            const response = await refreshAccessToken()
            if (response.success) {
                setAuthStatus(currAuth?.authenticated)
                setAccessToken(response?.data?.accessToken)
            } else {
                setAuthStatus(currAuth?.unauthenticated)
                setAccessToken(null)
            }
        }
        refreshWeb();
    }, [])
    useEffect(() => {
        if (!accessToken) {
            return;
        }
        async function getUserdata() {
            const response = await getMe(accessToken)
            if (response.success) {
                setUser(response?.data)
            } else {
                setUser(null)
            }
        }
        getUserdata();
    }, [accessToken])

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