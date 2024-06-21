import { T_URL } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

function createShortUrl(originalUrl: string): Promise<T_URL> {
    return fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            original_url: originalUrl
        })
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}

function getUrl(shortUrlId: string): Promise<T_URL> {
    return fetch(`${API_URL}/${shortUrlId}`)
        .then(res => res.json())
        .catch(err => console.log(err))
}

export const API = {
    createShortUrl,
    getUrl,
}