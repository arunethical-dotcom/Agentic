# Debugging Guide - "Failed to generate response" Error

## Quick Diagnostic Steps

### 1. Check Backend Console Logs
When you see the error, check your backend terminal for:
- `📥 Query request received:` - Shows what the server received
- `❌ Query Error:` - Shows the actual error
- `❌ Gemini API call failed:` - Shows Gemini-specific errors

### 2. Test Gemini API Key
Visit this URL in your browser or use curl:
```
http://localhost:5000/api/test-gemini
```

**Expected Response (Success):**
```json
{
  "status": "ok",
  "message": "Gemini API key is valid",
  "testResponse": "Hello",
  "model": "gemini-2.5-flash"
}
```

**If you see an error:**
- Check your `backend/.env` file
- Make sure `GEMINI_API_KEY` is set
- Verify the API key is valid at https://makersuite.google.com/app/apikey

### 3. Check Environment Variables
Make sure your `backend/.env` file contains:
```env
GEMINI_API_KEY=your-actual-api-key-here
GEMINI_MODEL=gemini-2.5-flash
PORT=5000
```

### 4. Common Error Causes

#### Error: "Gemini API key not configured"
- **Fix:** Add `GEMINI_API_KEY` to `backend/.env`
- **Verify:** Restart backend server after adding the key

#### Error: "Invalid or unauthorized Gemini API key"
- **Fix:** Get a new API key from https://makersuite.google.com/app/apikey
- **Verify:** Make sure there are no extra spaces in the key

#### Error: "Rate limit exceeded"
- **Fix:** Wait a few minutes and try again
- **Note:** Free tier has rate limits

#### Error: "Gemini API service unavailable"
- **Fix:** Wait and retry (this is a temporary Google service issue)

### 5. Check Browser Console
Open browser DevTools (F12) and check:
- **Console tab:** Look for any JavaScript errors
- **Network tab:** Check the `/api/query` request
  - Status code (should be 200)
  - Response body (shows actual error message)

### 6. Test with Simple Text Message
Try sending a simple text message WITHOUT a file:
- Type: "Hello"
- Click Send
- If this works, the issue is with file handling
- If this fails, the issue is with the API key or Gemini connection

### 7. Test File Upload
Try uploading a small image file:
- Click the paperclip icon
- Select a small PNG/JPEG image (< 1MB)
- Type a message or leave blank
- Click Send

## Getting Detailed Error Messages

The backend now logs detailed errors. Check your backend terminal for:
- Full error messages
- Stack traces
- API response codes

## Still Having Issues?

1. **Check backend logs** - Look for `❌` error messages
2. **Test API key** - Visit `/api/test-gemini` endpoint
3. **Check file size** - Must be under 5MB
4. **Check file type** - Only PNG, JPEG, or PDF
5. **Restart backend** - After changing `.env` file

## Contact for Help

If the error persists, share:
1. Backend console error output
2. Browser console error output
3. Response from `/api/test-gemini` endpoint
4. Your `.env` file structure (without the actual API key)


