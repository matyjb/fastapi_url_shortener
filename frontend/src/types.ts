type T_URL = {
    original_url: string,
    short_url_id: string,
    clicks: number,
    expiration_date: string,
    id: number,
}

type T_ErrorBody = {
    detail: string
}

export type { T_URL, T_ErrorBody }