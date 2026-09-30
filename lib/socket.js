import { io } from "socket.io-client";
export const socket=io(process.env.NEXT_PUBLIC_API_URL,{
    autoConnect:false,
    reconnection:true,
    reconnectionAttempts:10,
    reconnectionDelay:1000,
    reconnectionDelayMax:5000,
    withCredentials:true
});

export function setSocketToken(accessToken){
    socket.auth={
        token:accessToken
    }
}  

export function connectSocket(accessToken){
    setSocketToken(accessToken)

    if(!socket.connected){
        socket.connect()
    }
};

export function disconnectSocket(){
    if(socket.connected){
        socket.disconnect()
    }
}