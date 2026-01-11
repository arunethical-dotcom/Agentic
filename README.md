# Discharge AI Agent (Local-Only)

A privacy-focused autonomous medical discharge AI agent that runs entirely on your local machine using Ollama. This system simplifies complex hospital discharge notes, identifies medical red flags, and answers patient questions with zero cloud dependencies.

## 🌟 Key Features

- **Local-Only LLM**: Powered by Ollama (Default: Mistral) for maximum privacy and data security.
- **Autonomous Agent**: Custom Think-Plan-Act loop for complex medical reasoning.
- **Multimodal Support**: Processes **Images (OCR)** and **PDFs** locally.
- **RAG System**: Local vector search for accurate medical context and citations.
- **Safety First**: Integrated Red-Flag detection and readability scoring (Grade 6-8 target).

## 🏗️ Tech Stack

- **Frontend**: React (Vite), CSS3, Feather Icons
- **Backend**: Node.js (Express), Multer (file handling)
- **AI Engine**: **Ollama**
- **Models**: Mistral (Default), Med-Llama (Optional)
- **Vector Search**: Local JSON Vector Store (RAG)

## 🚀 Getting Started

### Prerequisites

1.  **Ollama**: [Download and Install Ollama](https://ollama.ai/)
2.  **Model**: Run `ollama pull mistral`
3.  **Node.js**: v18+ installed

### Installation & Setup

1.  **Clone the repository**.
2.  **Install Backend Dependencies**:
    ```bash
    cd backend
    npm install
    ```
3.  **Configure Environment**:
    Create a `.env` file in the `backend/` directory:
    ```env
    LLM_PROVIDER=ollama
    LLM_MODE=local_only
    OLLAMA_MODEL=mistral
    OLLAMA_BASE_URL=http://localhost:11434
    PORT=5000
    ```
4.  **Install Frontend Dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```

### Running the App

1.  **Start the Backend**:
    ```bash
    cd backend
    npm start
    ```
    *The server will verify Ollama connectivity on startup.*

2.  **Start the Frontend**:
    ```bash
    cd frontend
    npm run dev
    ```

## 🛡️ Privacy & Security

This application is designed to be **Local-Only**. It does not send patient data to cloud providers like Google Gemini or OpenAI. All text processing and embeddings are performed on your local machine via Ollama.

---
**Disclaimer**: This is an AI-generated tool for informational purposes. Always consult with a healthcare professional for medical advice.
