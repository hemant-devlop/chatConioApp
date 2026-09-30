import { refreshAccessToken } from "./http";

let refreshPromise=null;

export async function getFreshAccessToken() {
    if(!refreshPromise){
        refreshPromise=refreshAccessToken().finally(()=>{
            refreshPromise=null;
        });
    }
    return refreshPromise;
}