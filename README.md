# 🏥 Discharge AI Agent (Gemini)

Full-stack web app that simplifies hospital discharge notes into clear, patient-friendly instructions using Google Gemini.

## Overview
- Frontend: React + Vite + Tailwind (UI unchanged)
- Backend: Node.js + Express
- LLM Provider: Google Gemini (no OpenAI dependencies)
- API-first: frontend calls backend `/api/simplify-discharge`

## Architecture
```
┌─────────────┐
│   Frontend  │ (React, Port 3000)
└──────┬──────┘
       │ POST /api/simplify-discharge
┌──────▼──────┐
│   Backend   │ (Express, Port 5000)
└──────┬──────┘
       │ Google Gemini API
┌──────▼──────┐
│   Gemini    │ (Cloud)
└─────────────┘
```

## Project Structure
```
discharge-ai-agent/
├── backend/
│   ├── controllers/dischargeController.js
│   ├── services/geminiClient.js
│   ├── server.js
│   ├── package.json
│   └── env.example
├── frontend/
│   └── src/...
└── README.md
```

## Prerequisites
- Node.js 18+
- Google AI Studio API key with access to Gemini models

## Setup
1) Backend
```bash
cd backend
cp env.example .env  # fill GEMINI_API_KEY, optional GEMINI_MODEL, PORT
npm install
```

2) Frontend
```bash
cd frontend
npm install
```

## Running
In two terminals:
```bash
cd backend && npm start
cd frontend && npm run dev
```
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## Configuration
`backend/.env` (from `env.example`)
```
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-1.5-pro
PORT=5000
```
Frontend can override API base with `VITE_API_URL` (defaults to backend localhost:5000).

## API
- `POST /api/simplify-discharge`
  - Body: `{ "dischargeNotes": "text" }`
  - Response: `{ success: true, data: { summary, carePlan[], medications[], warningSigns[], followUpReminders[] }, timestamp }`
- `GET /api/health` – health check

## Sample Output (shortened)
The backend returns structured JSON such as:
```json
{
  "success": true,
  "data": {
    "summary": "You were treated for a severe asthma attack with pneumonia...",
    "carePlan": [{ "day": 1, "instructions": "..." }],
    "medications": [{ "name": "Tab Azithromycin 500mg", "dosage": "500mg", "frequency": "Once daily after meals", "duration": "5 days" }],
    "warningSigns": ["Increasing breathlessness", "High fever"],
    "followUpReminders": [{ "date": "After 7 days", "action": "Visit your doctor" }]
  }
}
```

## Healthcare Safety
This tool is for education only and not medical advice. Always follow your clinician’s guidance and seek emergency care when needed. No patient data is stored by the app.

## License
MIT

