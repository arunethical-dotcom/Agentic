"""
chunker.py
Handles splitting text into manageable chunks for embedding.
"""

class Chunker:
    def __init__(self, chunk_size=500, overlap=50):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def chunk_text(self, text: str):
        """
        Splits text into overlapping chunks based on character count.
        Note: For production, a token-based splitter fits model limits better,
        but char-based is sufficient for this prototype.
        """
        if not text:
            return []

        chunks = []
        start = 0
        text_len = len(text)

        while start < text_len:
            end = start + self.chunk_size
            chunk = text[start:end]
            
            # Try to break at the last period or space if cutting in middle of word
            if end < text_len:
                last_space = chunk.rfind(' ')
                if last_space != -1 and last_space > self.chunk_size * 0.5:
                     end = start + last_space + 1
                     chunk = text[start:end]

            chunks.append(chunk.strip())
            start += (len(chunk) - self.overlap)
        
        return chunks
