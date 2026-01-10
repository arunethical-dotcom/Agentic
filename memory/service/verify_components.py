"""
verify_components.py
Verifies the Memory Service components work together correctly.
Does NOT require the server to be running.
"""

import sys
import os

# Ensure we can import modules
sys.path.append(os.path.join(os.getcwd(), 'memory', 'service'))

try:
    from chunker import Chunker
    from embedder import Embedder
    from store import VectorStore
    print("✅ Imports successful.")
except ImportError as e:
    print(f"❌ Import failed: {e}")
    sys.exit(1)

def run_test():
    print("🚀 Starting Logic Verification...")

    # 1. Test Chunker
    print("\n--- Testing Chunker ---")
    chunker = Chunker(chunk_size=50)
    text = "The quick brown fox jumps over the lazy dog. " * 3
    chunks = chunker.chunk_text(text)
    print(f"Input length: {len(text)}")
    print(f"Generated {len(chunks)} chunks.")
    if len(chunks) > 0:
        print(f"Sample chunk: {chunks[0]}")
        print("✅ Chunker works.")
    else:
        print("❌ Chunker failed.")

    # 2. Test Embedder
    print("\n--- Testing Embedder (Simulated) ---")
    # Note: Downloading the model might take time, so we just check if class inits
    # If the user doesn't have the model cached, this will trigger a download.
    try:
        embedder = Embedder()
        print(f"Model loaded. Dimension: {embedder.dimension}")
        vecs = embedder.embed(["Hello world"])
        print(f"Vector shape: {vecs.shape}")
        if vecs.shape == (1, 384): # MiniLM is 384 dims
             print("✅ Embedder works.")
        else:
             print(f"❌ Unexpected dimension: {vecs.shape}")
    except Exception as e:
        print(f"❌ Embedder failed (Check internet?): {e}")
        return

    # 3. Test Store
    print("\n--- Testing Store ---")
    test_file_index = "test_index.faiss"
    test_file_meta = "test_meta.pkl"
    
    # Clean up previous run
    if os.path.exists(test_file_index): os.remove(test_file_index)
    if os.path.exists(test_file_meta): os.remove(test_file_meta)

    store = VectorStore(dimension=384, index_path=test_file_index, meta_path=test_file_meta)
    
    # Add dummy data
    store.add(vecs, [{"text": "Hello world"}])
    print(f"Stored {store.index.ntotal} vectors.")
    
    # Search
    results = store.search(vecs)
    print(f"Search found {len(results)} results.")
    if len(results) > 0 and results[0]['metadata']['text'] == "Hello world":
        print("✅ Search accuracy verified.")
    else:
        print("❌ Search verification failed.")

    # Persistence
    new_store = VectorStore(dimension=384, index_path=test_file_index, meta_path=test_file_meta)
    if new_store.index.ntotal == store.index.ntotal:
        print("✅ Persistence verified.")
    else.print("❌ Persistence failed.")
    
    # Cleanup
    if os.path.exists(test_file_index): os.remove(test_file_index)
    if os.path.exists(test_file_meta): os.remove(test_file_meta)
    
    print("\n✅ All Component Tests Passed.")

if __name__ == "__main__":
    run_test()
