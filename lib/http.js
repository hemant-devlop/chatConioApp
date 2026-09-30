
const base_url = process.env.NEXT_PUBLIC_API_URL;

export async function refreshAccessToken() {
    const response = await fetch(`${base_url}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),

    })
    const data = response.json()
    return data;
}
export async function getMe(accessToken) {
    const response = await fetch(`${base_url}/api/user/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    })
    const data = response.json()
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
    const data = response.json()
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
    const data = response.json()
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
    const response = await fetch(`${base_url}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body:  JSON.stringify({ }),
    })
    const data = await response.json()
    return data;
}

export async function getConversations(accessToken) {
    const response = await fetch(`${base_url}/api/chat/conversations`, {
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
    const response = await fetch(`${base_url}/api/chat/new-conversation/${userId}`, {
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


export async function sendMessage(conversationId, text) {

}
