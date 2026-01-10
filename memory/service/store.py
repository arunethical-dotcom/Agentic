"""
store.py
Manages FAISS index and metadata storage.
"""
import faiss
import pickle
import os
import numpy as np

class VectorStore:
    def __init__(self, dimension, index_path="memory_index.faiss", meta_path="memory_meta.pkl"):
        self.dimension = dimension
        self.index_path = index_path
        self.meta_path = meta_path
        self.metadata = [] # List of dicts, parallel to index IDs
        
        if os.path.exists(self.index_path) and os.path.exists(self.meta_path):
            self.load()
        else:
            print("Creating new FAISS index...")
            self.index = faiss.IndexFlatL2(self.dimension)

    def add(self, vectors, metadatas):
        """
        Adds vectors and corresponding metadata to the store.
        """
        if len(vectors) != len(metadatas):
            raise ValueError("Vectors and metadata counts must match.")
        
        self.index.add(vectors)
        self.metadata.extend(metadatas)
        self.save() # Auto-save for simplicity in this prototype

    def search(self, query_vector, top_k=5):
        """
        Searches the index for the nearest neighbors.
        """
        if self.index.ntotal == 0:
            return []

        distances, indices = self.index.search(query_vector, top_k)
        
        results = []
        for i, idx in enumerate(indices[0]):
            if idx == -1: continue # No enough results
            
            meta = self.metadata[idx] if idx < len(self.metadata) else {}
            results.append({
                "score": float(distances[0][i]),
                "metadata": meta
            })
            
        return results

    def save(self):
        faiss.write_index(self.index, self.index_path)
        with open(self.meta_path, "wb") as f:
            pickle.dump(self.metadata, f)
        print(f"Index saved with {self.index.ntotal} vectors.")

    def load(self):
        print("Loading existing FAISS index...")
        self.index = faiss.read_index(self.index_path)
        with open(self.meta_path, "rb") as f:
            self.metadata = pickle.load(f)
        print(f"Loaded {self.index.ntotal} vectors.")
