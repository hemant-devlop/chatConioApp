'use client';
import { getMe, refreshAccessToken } from "@/lib/http";
import { setError } from "@/redux/ReduxSlices/app";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
    const dispatch = useDispatch();
    const [resp,setResp]=useState('')
    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem("isLoggedIn")
        let active = true;

        async function loadAuth() {
            try {
                if (!isUserLoggedIn) {
                    setAuthStatus(authStatusValues.unauthenticated)
                    return;
                }
                const refreshResponse = await refreshAccessToken()
                const ress=JSON.stringify(refreshResponse)
                // setResp((prev)=>prev+"refT"+ress)
                // console.log("context::", refreshResponse)
                const token = refreshResponse?.success ? refreshResponse?.data?.accessToken : null
              
                if (!active) return;

                if (!token) {
                    setAuthStatus(authStatusValues.unauthenticated)
                    localStorage.clear();
                    return;
                }

                const userResponse = await getMe(token)
                if (!active) return;

                if (!userResponse?.success || !userResponse?.data) {
                    setUser(null)
                    setAccessToken(null)
                    setAuthStatus(authStatusValues.unauthenticated)
                    localStorage.clear()
                    return;
                }

                setUser(userResponse.data)
                setAccessToken(token)
                setAuthStatus(authStatusValues.authenticated)
            } catch (error) {
                if (!active) return;
                setUser(null)
                setAccessToken(null)
                localStorage.clear()
                setAuthStatus(authStatusValues.unauthenticated)
            }
        }

        loadAuth();
        return () => {
            active = false;
        };
    }, [])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser, authStatus, setAuthStatus,setResp }}>
    <div className="fixed z-999 flex justify-center items-center bg-black/40 text-red-300 ">
   
    <div className="max-w-100 mt-auto bg-black text-xs">
         {resp}
    </div>
    </div>
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