from fastapi import FastAPI

from app.schemas import URLCreate

app = FastAPI()


@app.post("/create")
async def root(original_url: URLCreate):
    return {"message": "Create url", "url": original_url.original_url}


@app.get("/{id}")
async def get_url(id: str):
    return {"message": "Get url", "url": id}
