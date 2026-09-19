from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import supabase

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "http://127.0.0.1:5173"
                   ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hello, World!"}

@app.get("/api/hello")
def hello():
    return {"message": "Hello from the API!"}

@app.get("/api/products")
def get_products():
    response = (
    supabase
    .table("products")
    .select("id, name, description, image_url, ingredients_text, brands(name), categories(name)")
    .execute()
    )

    return response.data