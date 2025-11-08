# 📚 PDF to MCQ Generator

A full-stack web application that generates Multiple Choice Questions (MCQs) from PDF documents using AI - supports both **Ollama (Local)** and **Google Gemini (Cloud)**.

## ✨ Features

- 📄 **PDF Upload**: Drag & drop or browse to upload PDF files
- 🔢 **Customizable Count**: Choose how many MCQs to generate (1-50 questions)
- 🤖 **Dual AI Support**: 
  - **Primary**: Ollama (Local, Private, Free) - Mistral 7B
  - **Fallback**: Google Gemini 2.5 Flash (Cloud, Fast)
- 🎯 **Smart AI Detection**: Automatically uses best available service
- 🔄 **Automatic Fallback**: Switches to backup AI if primary fails
- 📊 **Service Visibility**: See which AI generated your MCQs
- 📝 **Formatted Output**: MCQs in clean, standardized format
- 💾 **Download Options**: Export MCQs as TXT or PDF
- 🎨 **Modern UI**: 
  - Smooth animations with Framer Motion
  - Dark/Light theme support
  - Responsive design
  - Beautiful glassmorphism effects
- ⚡ **Optimized**: Text chunking for efficient processing
- 🛡️ **Error Handling**: Comprehensive validation and error management

## 🏗️ Project Structure

```
MCQ-GENERATOR/
├─ backend/
│   ├─ index.js                 # Express server entry point
│   ├─ controllers/
│   │   └─ mcqController.js     # Request handling logic
│   ├─ routes/
│   │   └─ mcqRoutes.js         # API route definitions
│   ├─ services/
│   │   └─ geminiService.js     # Google Gemini AI integration
│   ├─ utils/
│   │   └─ pdfExtract.js        # PDF text extraction & chunking
│   ├─ .env                     # Environment variables
│   └─ package.json
│
├─ frontend/
│   ├─ public/
│   │   └─ index.html
│   ├─ src/
│   │   ├─ components/
│   │   │   ├─ UploadBox.jsx    # File upload component
│   │   │   ├─ UploadBox.css
│   │   │   ├─ MCQList.jsx      # MCQ display component
│   │   │   └─ MCQList.css
│   │   ├─ pages/
│   │   │   ├─ Home.jsx         # Main page
│   │   │   └─ Home.css
│   │   ├─ services/
│   │   │   └─ api.js           # API calls & download functions
│   │   ├─ App.jsx
│   │   ├─ index.js
│   │   └─ index.css
│   └─ package.json
│
└─ README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or yarn
- **Option 1 (Recommended)**: Ollama + Mistral 7B ([Download Ollama](https://ollama.com/download))
- **Option 2**: Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))
- **Option 3**: Both (for automatic fallback)

### Installation

#### 1. Clone or navigate to the project

```powershell
cd d:\MCQ-GENERATOR
```

#### 2. Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Copy the example environment file
copy .env.example .env

# Install dependencies
npm install

# Edit .env and add your Gemini API key
notepad .env
```

**Update `.env` file with your configuration:**

**Option 1: Ollama Only (Recommended - 100% Free & Private)**
```properties
PORT=5000
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral:7b
# GEMINI_API_KEY=  # Leave commented
```

**Option 2: Gemini Only (Cloud-based)**
```properties
PORT=5000
# OLLAMA_BASE_URL=http://localhost:11434  # Comment out
# OLLAMA_MODEL=mistral:7b
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

**Option 3: Both (Ollama Primary + Gemini Fallback)**
```properties
PORT=5000
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral:7b
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

**🔒 Security Note:** 
- Never commit the `.env` file to GitHub
- It's already in `.gitignore`
- Only commit `.env.example` (without real keys)
- Your API keys are sensitive - keep them private!

#### 3. Frontend Setup

```powershell
# Navigate to frontend directory (from project root)
cd ..\frontend

# Install dependencies
npm install
```

### 🎯 Running the Application

#### Option 1: Using Ollama (Local AI)

**Terminal 1 - Start Ollama:**
```powershell
# Install model (first time only)
ollama pull mistral:7b

# Start Ollama service
ollama serve
```

**Terminal 2 - Start Backend:**
```powershell
cd backend
npm start
```
Backend will run on: `http://localhost:5000`

**Terminal 3 - Start Frontend:**
```powershell
cd frontend
npm start
```
Frontend will run on: `http://localhost:3000`

#### Option 2: Using Gemini Only

**Terminal 1 - Start Backend:**
```powershell
cd backend
npm start
```

**Terminal 2 - Start Frontend:**
```powershell
cd frontend
npm start
```

#### Verify Everything is Running

```powershell
# Check Ollama (if using)
curl http://localhost:11434

# Check Backend
curl http://localhost:5000/health

# Open Frontend in browser
start http://localhost:3000
```

## 📖 Usage

1. **Open the application** in your browser at `http://localhost:3000`
2. **Upload a PDF** by dragging & dropping or clicking the upload area
3. **Select the number of MCQs** you want (1-50) using the +/- buttons or input field
4. **Click "Generate MCQs"** to process the PDF
5. **Wait** for the AI to generate questions (usually 10-30 seconds)
6. **Review** the generated MCQs displayed on screen
7. **Download** the MCQs:
   - Click "📝 Download as TXT" for plain text format
   - Click "📄 Download as PDF" for PDF format

## 🔧 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Multer** - File upload handling
- **pdf-parse** - PDF text extraction
- **Axios** - HTTP client for Ollama
- **@google/generative-ai** - Google Gemini API integration
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

### Frontend
- **React.js 18** - UI library
- **React Router** - Navigation
- **Framer Motion** - Smooth animations
- **Lenis** - Smooth scrolling
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client
- **jsPDF** - PDF generation
- **CSS3** - Modern styling with themes

### AI Services
- **Ollama** - Local AI inference (Mistral 7B)
- **Google Gemini 2.5 Flash** - Cloud AI service

## 📋 API Endpoints

### POST `/api/mcq/generate`

Generate MCQs from uploaded PDF.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `pdf` (file)

**Response:**
```json
{
  "success": true,
  "mcqs": "Q1. ...\nA) ...\nB) ...\n...",
  "filename": "example.pdf"
}
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "PDF to MCQ Generator API is running"
}
```

## 🎨 MCQ Format

Generated MCQs follow this strict format:

```
Q1. <Question text>
A) <Option A>
B) <Option B>
C) <Option C>
D) <Option D>
Answer: <Correct Option Letter>

Q2. ...
```

## ⚙️ Configuration

### Backend Configuration

- **Port**: Change in `.env` file (default: 5000)
- **File Size Limit**: Modify in `mcqRoutes.js` (default: 10MB)
- **Text Chunk Size**: Adjust in `pdfExtract.js` (default: 4000 characters)

### Frontend Configuration

- **API URL**: Set `REACT_APP_API_URL` in `.env` file (optional)
- **Proxy**: Configured in `package.json` for development

## 🛡️ Error Handling

The application handles:
- ✅ Invalid file types (only PDF allowed)
- ✅ File size limits (10MB max)
- ✅ Empty PDFs or extraction failures
- ✅ API errors and timeouts
- ✅ Network connectivity issues

## 🚧 Troubleshooting

### Backend won't start
- Ensure Node.js is installed: `node --version`
- Check if port 5000 is available
- Verify `.env` file exists with valid API key

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify proxy setting in `frontend/package.json`

### MCQs not generating
- Verify Gemini API key is valid
- Check if PDF contains readable text
- Review backend logs for API errors

### PDF upload fails
- Ensure file is a valid PDF
- Check file size (must be under 10MB)
- Verify file is not password-protected

## 📝 Development

### Adding New Features

1. **Backend**: Add routes in `routes/`, controllers in `controllers/`, services in `services/`
2. **Frontend**: Add components in `components/`, pages in `pages/`
3. **Styling**: Update corresponding `.css` files

### Code Structure

- **Modular**: Separation of concerns with clear folder structure
- **Commented**: All functions include JSDoc comments
- **Error Handling**: Try-catch blocks and validation throughout
- **Responsive**: Mobile-friendly UI design

## 📄 License

MIT License - Feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📧 Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend logs
3. Check browser console for frontend errors

## 🎉 Acknowledgments

- Google Gemini AI for MCQ generation
- React community for excellent documentation
- pdf-parse library for PDF text extraction

---

**Built with ❤️ using React, Node.js, and Google Gemini AI**
