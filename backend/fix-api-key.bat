@echo off
echo ========================================
echo   Gemini API Key Setup Helper
echo ========================================
echo.
echo Current API Key in .env file:
type .env | findstr GEMINI_API_KEY
echo.
echo ========================================
echo.
echo STEPS TO FIX:
echo.
echo 1. Get a new API key from:
echo    https://aistudio.google.com/app/apikey
echo.
echo 2. Open .env file and replace the API key:
echo    notepad .env
echo.
echo 3. Save the file and run this test:
echo    node test-gemini.js
echo.
echo ========================================
echo.
pause
