"""
faiss_service.py
FastAPI microservice for Agent Memory.
"""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
import os

from embedder import Embedder
from chunker import Chunker
from store import VectorStore

app = FastAPI(title="Agent Memory Service")

# Initialize components
# Note: These are heavy operations, so they happen on startup
chunker = Chunker()
embedder = Embedder() 
store = VectorStore(dimension=embedder.dimension)

# --- Pydantic Models ---
class AddMemoryRequest(BaseModel):
    text: str
    metadata: Optional[Dict[str, Any]] = {}

class SearchRequest(BaseModel):
    query: str
    top_k: int = 5

class SearchResult(BaseModel):
    text: str
    score: float
    metadata: Dict[str, Any]

# --- Endpoints ---

@app.get("/health")
def health_check():
    return {"status": "ok", "vectors_stored": store.index.ntotal}

@app.post("/memory/add")
def add_memory(request: AddMemoryRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    # 1. Chunk
    chunks = chunker.chunk_text(request.text)
    if not chunks:
         return {"message": "No valid chunks created."}

    # 2. Embed
    embeddings = embedder.embed(chunks)

    # 3. Prepare Metadata
    # We replicate the base metadata for each chunk but add chunk context
    metadatas = []
    for i, chunk in enumerate(chunks):
        meta = request.metadata.copy()
        meta["text"] = chunk # Store the text in metadata for retrieval
        meta["chunk_index"] = i
        metadatas.append(meta)

    # 4. Store
    store.add(embeddings, metadatas)
    
    return {"status": "success", "chunks_added": len(chunks)}

@app.post("/memory/search")
def search_memory(request: SearchRequest):
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    # 1. Embed Query
    query_vector = embedder.embed([request.query])
    
    # 2. Search
    results = store.search(query_vector, top_k=request.top_k)
    
    return {"results": results}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8100))
    uvicorn.run(app, host="0.0.0.0", port=port)
