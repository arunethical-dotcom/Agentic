# Sample Data for Discharge AI Agent

This document contains sample input and output data for testing and demonstration purposes.

---

## Sample Input: Discharge Note (Indian Medical Style)

```
DISCHARGE SUMMARY

Patient Name: [Name]
Age: 52 years, Male
DOA: 10/02/2024
DOD: 13/02/2024
Ward: General Medicine
Consultant: Dr. [Name]

PRESENTING COMPLAINTS:
- Chest pain radiating to left arm
- Breathlessness on exertion
- Sweating and nausea

DIAGNOSIS:
Acute ST-elevation myocardial infarction (STEMI) - Anterior wall
Post-PCI (Percutaneous Coronary Intervention) - LAD stenting
Hypertension
Type 2 Diabetes Mellitus

PROCEDURE DONE:
Primary PCI with drug-eluting stent to LAD (Left Anterior Descending artery)

HOSPITAL COURSE:
Patient was admitted with acute myocardial infarction. Emergency angiography 
revealed 95% blockage in LAD. Primary PCI was performed successfully with 
stent placement. Patient responded well to treatment. Vital signs stable.

INVESTIGATIONS:
- ECG: ST elevation in anterior leads
- Troponin I: Elevated (12.5 ng/ml)
- Echo: EF 45%, anterior wall hypokinesia
- Lipid profile: Total cholesterol 240, LDL 160

DISCHARGE MEDICATIONS:
1. Tab Clopidogrel 75mg - Once daily for 1 year (take with food)
2. Tab Aspirin 75mg - Once daily lifelong (take after breakfast)
3. Tab Atorvastatin 80mg - Once daily at bedtime for 1 month, then 40mg lifelong
4. Tab Metoprolol 50mg - Twice daily (morning and evening)
5. Tab Ramipril 5mg - Once daily in the morning
6. Tab Metformin 500mg - Twice daily (after breakfast and dinner)
7. Tab Pantoprazole 40mg - Once daily before breakfast for 1 month

DIETARY ADVICE:
- Low salt, low fat, low cholesterol diet
- Avoid fried and processed foods
- Diabetic diet with controlled carbohydrates
- Small frequent meals

ACTIVITY:
- Light activities only for first 2 weeks
- No heavy lifting or strenuous exercise for 6 weeks
- Gradual increase in activity as tolerated
- Walking is encouraged

FOLLOW-UP:
- Cardiology OPD after 2 weeks
- Repeat echo after 6 weeks
- Lipid profile after 3 months
- Continue cardiac rehabilitation program

PRECAUTIONS:
- Take all medications regularly - DO NOT STOP suddenly
- Watch for chest pain, breathlessness, or unusual fatigue
- If chest pain occurs, take Tab Sorbitrate 5mg sublingually and seek immediate medical help
- Control blood sugar and blood pressure regularly
- Avoid smoking and alcohol completely
- Maintain ideal body weight

RED FLAG SYMPTOMS (Seek immediate medical attention):
- Severe chest pain or pressure
- Severe breathlessness
- Fainting or dizziness
- Irregular heartbeat or palpitations
- Nausea or vomiting
```

---

## Expected Output Structure

The AI should convert the above into a structured JSON format like this:

```json
{
  "summary": "You had a heart attack and underwent a procedure to open a blocked artery in your heart. A small tube (stent) was placed to keep the artery open. You are now recovering and need to take medications regularly and make lifestyle changes.",
  "carePlan": [
    {
      "day": 1,
      "instructions": "Rest at home. Take all medications as prescribed. Do light activities only. Monitor for any chest pain or discomfort."
    },
    {
      "day": 2,
      "instructions": "Continue medications. Start gentle walking for 5-10 minutes. Avoid any heavy work. Check your blood pressure if you have a monitor."
    }
  ],
  "medications": [
    {
      "name": "Tab Clopidogrel 75mg",
      "dosage": "75mg",
      "frequency": "Once daily with food",
      "duration": "1 year",
      "importantNotes": "Do not stop this medicine. Very important to prevent blood clots. Take with food to avoid stomach upset."
    },
    {
      "name": "Tab Aspirin 75mg",
      "dosage": "75mg",
      "frequency": "Once daily after breakfast",
      "duration": "Lifelong",
      "importantNotes": "Take for the rest of your life. Helps prevent heart attacks. Take after breakfast to avoid stomach problems."
    }
  ],
  "warningSigns": [
    "Severe chest pain or pressure (like someone sitting on your chest)",
    "Severe breathlessness or difficulty breathing",
    "Fainting, dizziness, or feeling like you might pass out",
    "Irregular heartbeat or feeling your heart beating very fast or slow",
    "Nausea or vomiting",
    "Severe sweating or cold sweats"
  ],
  "followUpReminders": [
    {
      "date": "After 2 weeks",
      "action": "Visit Cardiology OPD (Outpatient Department) for follow-up"
    },
    {
      "date": "After 6 weeks",
      "action": "Get a heart echo test (ultrasound of heart) done"
    },
    {
      "date": "After 3 months",
      "action": "Get blood test for cholesterol (lipid profile)"
    }
  ]
}
```

---

## Testing Tips

1. **Use the sample input** above to test the application
2. **Verify** that medication names and dosages are preserved exactly
3. **Check** that medical terms are simplified (e.g., "myocardial infarction" → "heart attack")
4. **Ensure** warning signs are clearly highlighted
5. **Confirm** follow-up dates and actions are clear

---

## Notes

- These are example inputs/outputs. Actual AI responses may vary slightly.
- Always validate important medical information with a healthcare professional.
- The sample data is for demonstration purposes only.

