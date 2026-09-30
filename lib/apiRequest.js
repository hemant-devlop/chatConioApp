export async function apiRequest(config) {
    return fetch(config.url,{
        method:config.method || "GET",
        headers:{
            "content-type":"application/json",
            ...(config.headers),
        },
        body:config.body?JSON.stringify(config.body):undefined,
        credentials:'include'
    })
}