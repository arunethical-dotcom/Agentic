"""
embedder.py
Handles generating vector embeddings from text using local models.
"""
from sentence_transformers import SentenceTransformer
import numpy as np

class Embedder:
    def __init__(self, model_name='all-MiniLM-L6-v2'):
        print(f"Loading embedding model: {model_name}...")
        self.model = SentenceTransformer(model_name)
        print("Model loaded.")

    def embed(self, texts):
        """
        Generates embeddings for a list of texts.
        Returns numpy array of float32.
        """
        if isinstance(texts, str):
            texts = [texts]
            
        embeddings = self.model.encode(texts)
        return np.array(embeddings).astype('float32')

    @property
    def dimension(self):
        return self.model.get_sentence_embedding_dimension()
