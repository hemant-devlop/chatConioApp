'use client'

import { useAuth } from '@/context/authContext';
import { connectSocket, disconnectSocket, setSocketToken, socket } from '@/lib/socket';
import { getFreshAccessToken } from '@/lib/tokenRefresh';
import React, { useEffect } from 'react'

const SocketProvider = ({ children }) => {
    const { accessToken } = useAuth();
    useEffect(() => {
        if (!accessToken) {
            return;
        }

        socket.auth = {
            token: accessToken
        }

        function handleConnect() {
            console.log('socket_connected', socket.id)
        }

        function handleDisconnect(reason) {
            console.log('socket_disconnect', reason)
        }

        async function handleConnectError(error) {

            console.log('socket connection error', error.message)

            if (error.message !== 'INVALID_ACCESS_TOKEN') {
                return;
            }
            try {
                const newAccessToken = await getFreshAccessToken()

                setSocketToken(newAccessToken);


            } catch (error) {
                console.error('refresh faild', error);
                setSocketToken(null)
            }
        }


        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('connect_error', handleConnectError);
        connectSocket(accessToken);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('connect_error', handleConnectError);
            disconnectSocket();
        }
    }, [accessToken])

    return children;
}

export default SocketProvider