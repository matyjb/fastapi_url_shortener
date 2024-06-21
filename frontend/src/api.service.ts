const API_URL = import.meta.env.VITE_API_URL;

function createShortUrl(originalUrl: string): Promise<string | void> {
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
    .then(data => `${location.origin}/${data.short_url_id}`)
    .catch(err => console.log(err))
}

function getUrl(shortUrlId: string): Promise<string> {
  return fetch(`${API_URL}/${shortUrlId}`)
    .then(res => res.json())
    .then(data => data.original_url)
    .catch(err => console.log(err))
}

export { createShortUrl, getUrl }