# 🏥 Discharge AI Agent

A full-stack web application that simplifies complex hospital discharge notes into easy-to-understand, patient-friendly language using AI (OpenAI GPT).

## 📋 Table of Contents

- [Problem Statement](#problem-statement)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Sample Input/Output](#sample-inputoutput)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)
- [Healthcare Safety & Disclaimer](#healthcare-safety--disclaimer)

---

## 🎯 Problem Statement

Hospital discharge notes are often written in complex medical terminology that is difficult for patients to understand. This creates barriers to proper post-discharge care, leading to:

- Medication non-compliance
- Missed follow-up appointments
- Confusion about recovery instructions
- Increased readmission rates

**Discharge AI Agent** solves this by converting medical jargon into simple, clear instructions while preserving critical medical information like medication names, dosages, and important warnings.

---

## ✨ Features

### Frontend (Patient UI)
- ✅ Clean, professional healthcare-themed interface (white and blue)
- ✅ Simple form to paste discharge notes
- ✅ Structured display of simplified information:
  - Simple summary
  - Day-by-day care plan
  - Medication checklist (with checkboxes)
  - Warning signs section (red alerts)
  - Follow-up reminders
- ✅ Mobile-responsive design
- ✅ Loading states and error handling
- ✅ Real-time API integration

### Backend (API Server)
- ✅ RESTful API with Express.js
- ✅ OpenAI GPT-4 integration
- ✅ Healthcare-grade prompt engineering
- ✅ Structured JSON response
- ✅ Error handling and validation
- ✅ CORS enabled for frontend communication

### AI Integration
- ✅ OpenAI GPT-4/GPT-3.5 API integration
- ✅ Custom prompts for medical simplification
- ✅ Preserves medication names and dosages exactly
- ✅ Converts medical jargon to simple language
- ✅ Structured JSON output

---

## 🛠 Tech Stack

### Frontend
- **React.js 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client (though using native fetch in this implementation)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **OpenAI SDK** - OpenAI API client
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing
- **body-parser** - Request body parsing

### AI/LLM
- **OpenAI GPT-4** (or GPT-3.5-turbo) - Language model via API

**Why API-based LLM instead of training a model?**
- **Cost-effective**: No need for expensive GPU infrastructure
- **Rapid development**: No training data collection or model training required
- **High accuracy**: GPT-4 provides excellent language understanding and generation
- **Maintenance-free**: OpenAI handles model updates and improvements
- **Accessibility**: Works on any computer with internet connection
- **Scalability**: Can handle multiple requests without infrastructure setup

---

## 🏗 Architecture

```
┌─────────────┐
│   Frontend  │  (React + Tailwind)
│  (Port 3000)│
└──────┬──────┘
       │ HTTP POST
       │ /api/simplify-discharge
       ▼
┌─────────────┐
│   Backend   │  (Express.js)
│  (Port 5000)│
└──────┬──────┘
       │ API Call
       │ OpenAI SDK
       ▼
┌─────────────┐
│  OpenAI API │  (GPT-4)
│   (Cloud)   │
└─────────────┘
```

**Data Flow:**
1. User pastes discharge notes in the frontend form
2. Frontend sends POST request to backend `/api/simplify-discharge`
3. Backend validates input and calls OpenAI API with healthcare prompt
4. OpenAI processes and returns structured JSON
5. Backend forwards response to frontend
6. Frontend displays simplified, structured information

---

## 📁 Project Structure

```
discharge-ai-agent/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DischargeForm.jsx          # Input form component
│   │   │   ├── SimplifiedView.jsx         # Main display component
│   │   │   ├── CarePlanDay.jsx            # Day-wise care plan card
│   │   │   ├── MedicationChecklist.jsx    # Medication checklist
│   │   │   ├── WarningSigns.jsx           # Warning signs display
│   │   │   └── FollowUpReminders.jsx      # Follow-up reminders
│   │   ├── App.jsx                        # Main React app
│   │   ├── App.css                        # App styles
│   │   ├── main.jsx                       # React entry point
│   │   └── index.css                      # Global styles (Tailwind)
│   ├── index.html                         # HTML template
│   ├── package.json                       # Frontend dependencies
│   ├── vite.config.js                     # Vite configuration
│   ├── tailwind.config.js                 # Tailwind configuration
│   ├── postcss.config.js                  # PostCSS configuration
│   └── .env.example                       # Frontend env example
│
├── backend/
│   ├── controllers/
│   │   └── dischargeController.js         # API logic & OpenAI integration
│   ├── server.js                          # Express server
│   ├── package.json                       # Backend dependencies
│   └── .env.example                       # Backend env example
│
├── .env.example                           # Root env example
├── .gitignore                             # Git ignore rules
└── README.md                              # This file
```

---

## 📦 Installation

### Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

### Step 1: Clone or Download the Project

If using git:
```bash
git clone <repository-url>
cd discharge-ai-agent
```

Or extract the project folder to your desired location.

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

Open a new terminal window:
```bash
cd frontend
npm install
```

### Step 4: Configure Environment Variables

#### Backend Configuration

1. Copy the example environment file:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Edit `backend/.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   OPENAI_MODEL=gpt-4
   PORT=5000
   ```

**How to get OpenAI API Key:**
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key and paste it in your `.env` file

**Important:** Never commit your `.env` file to version control. It's already in `.gitignore`.

#### Frontend Configuration (Optional)

If your backend runs on a different port, update `frontend/.env`:
```bash
cd frontend
cp .env.example .env
# Edit .env if needed (default is http://localhost:5000)
```

---

## 🚀 Running the Application

### Step 1: Start the Backend Server

Open a terminal in the `backend` directory:
```bash
cd backend
npm start
```

For development with auto-reload:
```bash
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5000
📋 API endpoint: http://localhost:5000/api/simplify-discharge
```

### Step 2: Start the Frontend

Open a **new terminal** in the `frontend` directory:
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### Step 3: Open in Browser

Open your browser and navigate to:
```
http://localhost:3000
```

The application should now be running! 🎉

---

## 📝 Sample Input/Output

### Sample Input (Indian Medical Style Discharge Note)

```
DISCHARGE SUMMARY

Patient Name: [Name]
Age: 45 years
DOA: 15/01/2024
DOD: 18/01/2024

DIAGNOSIS:
Acute exacerbation of bronchial asthma with community-acquired pneumonia

HISTORY:
Patient presented with complaints of breathlessness, productive cough with 
yellowish sputum, and fever for 3 days. Chest X-ray showed right lower lobe 
consolidation.

INVESTIGATIONS:
- CBC: WBC count elevated
- Chest X-ray: Right lower lobe consolidation
- Sputum culture: Pending

TREATMENT GIVEN:
- Nebulization with Salbutamol + Ipratropium
- IV antibiotics: Ceftriaxone 1gm BD for 5 days
- Oral medications: Azithromycin 500mg OD for 5 days
- Steroids: Prednisolone 40mg OD tapering over 7 days

DISCHARGE MEDICATIONS:
1. Tab Azithromycin 500mg - Once daily after meals for 5 days
2. Tab Prednisolone 40mg - Once daily morning for 3 days, then 20mg for 2 days, then 10mg for 2 days
3. Tab Montelukast 10mg - Once daily at bedtime for 1 month
4. Inhaler: Salbutamol MDI - 2 puffs SOS (as needed for breathlessness)
5. Inhaler: Budesonide + Formoterol - 2 puffs twice daily for 3 months

FOLLOW-UP:
- Review after 7 days in OPD
- Repeat chest X-ray after 2 weeks if symptoms persist
- Continue inhalers as prescribed

PRECAUTIONS:
- Avoid smoking and exposure to dust/pollution
- Watch for increasing breathlessness, high fever, or chest pain
- Complete full course of antibiotics
```

### Sample Output (Structured JSON)

```json
{
  "success": true,
  "data": {
    "summary": "You were treated for a severe asthma attack with pneumonia (lung infection). You received antibiotics and medications to help your breathing. Continue taking your medications as prescribed and follow up with your doctor in 7 days.",
    "carePlan": [
      {
        "day": 1,
        "instructions": "Take all medications as prescribed. Use your inhalers as directed. Rest and avoid physical exertion. Monitor your breathing."
      },
      {
        "day": 2,
        "instructions": "Continue medications. Start tapering Prednisolone to 20mg. Watch for any breathing difficulties."
      },
      {
        "day": 3,
        "instructions": "Continue all medications. Keep using inhalers regularly. Complete the full course of Azithromycin."
      },
      {
        "day": 4,
        "instructions": "Continue medications. Taper Prednisolone to 10mg. Monitor for improvement in symptoms."
      },
      {
        "day": 5,
        "instructions": "Complete Azithromycin course today. Continue other medications. Prepare for follow-up visit in 2 days."
      }
    ],
    "medications": [
      {
        "name": "Tab Azithromycin 500mg",
        "dosage": "500mg",
        "frequency": "Once daily after meals",
        "duration": "5 days",
        "importantNotes": "Complete the full 5-day course even if you feel better"
      },
      {
        "name": "Tab Prednisolone",
        "dosage": "40mg (days 1-3), then 20mg (days 4-5), then 10mg (days 6-7)",
        "frequency": "Once daily in the morning",
        "duration": "7 days (tapering schedule)",
        "importantNotes": "Take with food. Do not stop suddenly - follow the tapering schedule"
      },
      {
        "name": "Tab Montelukast 10mg",
        "dosage": "10mg",
        "frequency": "Once daily at bedtime",
        "duration": "1 month",
        "importantNotes": "Continue for full month to prevent asthma attacks"
      },
      {
        "name": "Salbutamol MDI Inhaler",
        "dosage": "2 puffs",
        "frequency": "As needed (SOS) for breathlessness",
        "duration": "As needed",
        "importantNotes": "Use only when you feel breathless. If you need it more than 3-4 times a day, contact your doctor"
      },
      {
        "name": "Budesonide + Formoterol Inhaler",
        "dosage": "2 puffs",
        "frequency": "Twice daily",
        "duration": "3 months",
        "importantNotes": "Use regularly even if you feel fine. Rinse mouth after each use"
      }
    ],
    "warningSigns": [
      "Increasing breathlessness or difficulty breathing",
      "High fever (above 101°F or 38.5°C)",
      "Severe chest pain",
      "Blue or purple lips or fingertips",
      "Feeling very weak or unable to perform daily activities",
      "Coughing up blood or dark-colored sputum"
    ],
    "followUpReminders": [
      {
        "date": "After 7 days",
        "action": "Visit your doctor for follow-up in OPD (Outpatient Department)"
      },
      {
        "date": "After 2 weeks",
        "action": "Repeat chest X-ray if symptoms persist"
      },
      {
        "date": "After 3 months",
        "action": "Review inhaler usage and asthma control"
      }
    ]
  },
  "timestamp": "2024-01-18T10:30:00.000Z"
}
```

---

## 🔌 API Endpoints

### POST `/api/simplify-discharge`

Simplifies discharge notes using AI.

**Request Body:**
```json
{
  "dischargeNotes": "Your discharge notes text here..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": "...",
    "carePlan": [...],
    "medications": [...],
    "warningSigns": [...],
    "followUpReminders": [...]
  },
  "timestamp": "2024-01-18T10:30:00.000Z"
}
```

**Error Response (400/500):**
```json
{
  "error": "Error type",
  "message": "Error message description"
}
```

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Discharge AI Agent API is running"
}
```

---

## 🔮 Future Enhancements

Potential improvements for the project:

1. **Multi-language Support**
   - Support for Hindi, Bengali, Tamil, and other Indian languages
   - Automatic language detection

2. **PDF Processing**
   - Extract text from PDF discharge notes automatically
   - OCR for scanned documents

3. **User Accounts & History**
   - Save simplified notes (with user consent)
   - View past discharge summaries
   - Download as PDF

4. **WhatsApp Integration**
   - Send daily medication reminders via WhatsApp
   - WhatsApp-style formatted messages

5. **Voice Input/Output**
   - Speak discharge notes instead of typing
   - Audio playback of simplified instructions

6. **Mobile App**
   - Native iOS/Android apps
   - Offline support

7. **Enhanced AI Features**
   - Drug interaction warnings
   - Personalized care recommendations
   - Integration with hospital systems

8. **Accessibility Improvements**
   - Screen reader support
   - High contrast mode
   - Font size adjustments

---

## ⚠️ Healthcare Safety & Disclaimer

### **IMPORTANT MEDICAL DISCLAIMER**

**This system is NOT a replacement for a doctor or medical professional.**

- **Educational Purpose Only**: This tool is designed for educational purposes and to help patients better understand their discharge notes. It is not a diagnostic tool.

- **Not Medical Advice**: The simplified information provided should not be used as a substitute for professional medical advice, diagnosis, or treatment.

- **Always Consult Your Doctor**: 
  - Always follow your doctor's instructions
  - Consult your doctor before making any medical decisions
  - If you have concerns or questions, contact your healthcare provider immediately

- **Emergency Situations**: If you experience any warning signs or medical emergencies, seek immediate medical attention. Do not rely on this tool for emergency guidance.

- **Accuracy**: While we strive for accuracy, AI-generated content may contain errors. Always verify important information with your healthcare provider.

- **Data Privacy**: 
  - This application does not store any patient data
  - Discharge notes are processed in real-time and not saved
  - API calls to OpenAI are subject to OpenAI's privacy policy
  - For production use, ensure HIPAA/GDPR compliance as required

- **No Liability**: The developers and contributors of this project are not liable for any medical decisions made based on the information provided by this tool.

**By using this application, you acknowledge that you understand and agree to these disclaimers.**

---

## 📄 License

MIT License - Feel free to use this project for educational purposes.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Support

For questions or issues, please open an issue on the project repository.

---

**Built with ❤️ for better healthcare understanding**

