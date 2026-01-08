# Discharge AI Agent

A full-stack application that acts as a medical assistant. It helps simplify hospital discharge notes and answers patient questions using Google Gemini AI.

## Features

- **Persistent Chat Interface**: Intelligent conversation about your health documents.
- **File Upload Support**: Upload **Images (PNG, JPEG)** or **PDFs**.
- **Automated Text Extraction**: Integrated OCR and PDF parsing to "read" your documents.
- **Medical Simplification**: Converts complex medical jargon into easy-to-understand language.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express, Multer
- **AI**: Google Gemini API
- **Processing**: Tesseract.js (OCR), pdf-parse

## Setup

1.  **Clone the repository**.
2.  **Install Dependencies**:

    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the `backend/` directory:

    ```env
    PORT=5000
    GEMINI_API_KEY=your_gemini_api_key_here
    GEMINI_MODEL=gemini-1.5-pro
    ```

4.  **Run the Application**:

    Start the Backend:
    ```bash
    cd backend
    npm start
    ```

    Start the Frontend:
    ```bash
    cd frontend
    npm run dev
    ```

## Usage

1.  Open the frontend (usually `http://localhost:5173`).
2.  You will see a Chat Interface.
3.  **To Simplify a Note**: Click the "paperclip" icon to upload a photo of your discharge summary or a PDF.
4.  **To Chat**: Type your questions in the text box. The AI will use the context of the uploaded file to answer you.

## Troubleshooting

-   **Upload Errors**: Ensure files are under 5MB. Supported formats: Images, PDF.
-   **Server Crash**: Check that `GEMINI_API_KEY` is set correctly.
