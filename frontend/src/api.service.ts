import { API } from "./api";
import { T_URL } from "./types";

function createShortUrl(originalUrl: string): Promise<string | void> {
  return API.createShortUrl(originalUrl)
    .then(data => {
      if (!data) {
        throw new Error('Could not create short url')
      }
      return data;
    })
    .then(data => `${location.origin}/${data.short_url_id}`)
    .catch(err => console.log(err))
}

function getUrl(shortUrlId: string): Promise<T_URL | void> {
  return API.getUrl(shortUrlId)
    .then(data => data)
    .catch(err => console.log(err))
}

export { createShortUrl, getUrl }