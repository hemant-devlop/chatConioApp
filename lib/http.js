// const base_url = 'https://chatconnio.onrender.com'
const base_url = process.env.NEXT_PUBLIC_API_URL





export async function refreshAccessToken() {
    const response = await fetch(`${base_url}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),

    })
    const data =await response.json()
    return data;
}

export async function getMe(accessToken) {
    const request = new Request(`${base_url}/api/user/me`)

    // const cache = await caches.open("me");
    // const cacheResponse = await cache.match(request);
    // if (cacheResponse) {
    //     return cacheResponse.json()
    // }
    const response = await fetch(request, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    })
    // if (response.ok) {
    //     await cache.put(request, response.clone())
    // }

    const data =await response.json()
    return data;
}
export async function getUser(accessToken, userId) {
    const response = await fetch(`${base_url}/api/user/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,

        },
    })
    const data = await response.json()
    return data;
}
export async function findUserByUsername(accessToken, username) {
    const response = await fetch(`${base_url}/api/user?username=${username}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,

        },
    })
    const data = await response.json()
    return data;
}

export async function login(email, password) {
    const response = await fetch(`${base_url}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
    return data;
}
export async function register(registerData) {
    const response = await fetch(`${base_url}/api/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
    })
    const data = await response.json()
    return data;
}
export async function logout(accessToken) {
    const request=new Request(`${base_url}/api/auth/logout`)
    const allCache=await caches.keys()
    const response = await fetch(request, {                                                                 
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({}),
    })
    if(response.ok){
        await Promise.all(allCache.map(name=>caches.delete(name)))
    }
    const data = await response.json()
    return data;
}

export async function getConversations(accessToken) {
    const request = new Request(`${base_url}/api/chat/conversations/all`)
    // const cache = await caches.open('conversations');

    // const cacheResponse = await cache.match(request);
    // if (cacheResponse) {
    //     return cacheResponse.json()
    // }
    const response = await fetch(request, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        }
    })

    // if (response.ok) {
    //     await cache.put(request, response.clone())
    // }

    return response.json()
}
export async function getConversationUser(accessToken, conversationId) {
    const response = await fetch(`${base_url}/api/chat/${conversationId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        }
    })
    const data = await response.json()
    return data;
}
export async function getNewConversation(accessToken, userId) {
    const request = new Request(`${base_url}/api/chat/new-conversation/${userId}`)
    const response = await fetch(request, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    })
    const data = await response.json()
    return data;
}

export async function getConversation(accessToken, conversationId) {
    const response = await fetch(`${base_url}/api/chat/conversation/${conversationId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    })
    const data = await response.json()
    return data
}


