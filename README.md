# ✨ AI Humanizer: The Ultimate AI-to-Human Text Transformer

[GitHub Repository](https://github.com/Sappymukherjee214/AI-Humanizer)

**A state-of-the-art, research-grade platform designed to bypass AI detection and transform machine-generated content into high-quality, undetectable human-like prose.**

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![License](https://img.shields.io/badge/License-ISC-brightgreen.svg)](LICENSE)
[![GSSoC'26](https://img.shields.io/badge/GSSoC-2026-orange.svg)](https://gssoc.girlscript.tech/)
![Visitors](https://visitor-badge.laobi.icu/badge?page_id=Sappymukherjee214.AI-Humanizer)

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Key Features](#-key-features)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage](#-usage)
- [Development](#-development)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [FAQ](#-faq)
- [License & Policies](#-license--policies)

---

## 🎯 Overview

**AI Humanizer** is a high-performance platform built for academics, creative professionals, and SEO specialists who need to bridge the gap between AI efficiency and human authenticity. Leveraging an advanced **Iterative Detection-Refinement Loop**, it ensures your content consistently passes AI audits (like GPTZero) while maintaining impeccable readability and tone.

### What Makes AI Humanizer Different

- **Evidence-Based Refinement**: Grounded in linguistic analysis and adversarial detection theory.
- **AI-Powered Analysis**: Real-time sentiment preservation and pattern detection using Google Gemini.
- **Recursive Optimization**: Unlike simple paraphrasers, it re-evaluates content until it drops below a **15% AI Probability** threshold.
- **Privacy-First**: Secure JWT-based authentication and modular processing.
- **Research-Driven**: Incorporates findings from NLP research on "machine-sounding" syntax patterns.

---

## 🏗️ Architecture

```mermaid
graph TB
    A[React 19 + Framer Motion<br/>Presentation Layer] --> B[Express.js<br/>Business Logic]
    B --> C[Prisma ORM<br/>Data Integrity]
    C --> D[(PostgreSQL<br/>Local/Cloud Storage)]

    B --> E[Refinement Services<br/>Google Gemini AI]
    B --> F[Detection Services<br/>GPTZero API]
    B --> G[Payment Services<br/>Stripe Integration]

    H[File Parsing System] --> B
    I[Analytics Engine] --> B

    subgraph "Core Components"
        J[User Management]
        K[Iterative Loop Logic]
        L[Document Extractor]
        M[History Tracking]
    end

    B --> J
    B --> K
    B --> L
    B --> M
```

### System Components

| Component              | Technology         | Purpose                                  |
| ---------------------- | ------------------ | ---------------------------------------- |
| **Frontend Shell**     | React 19 + Vite    | Ultra-fast, responsive SPA with HMR      |
| **Styling**            | Tailwind CSS       | Utility-first, premium UI design         |
| **Animations**         | Framer Motion      | Fluid micro-interactions and transitions |
| **Backend Engine**     | Node.js + Express  | High-concurrency API for heavy re-writing |
| **Database**           | PostgreSQL         | Robust relational data persistence       |
| **ORM**                | Prisma             | Type-safe queries and schema management  |
| **ML/AI Core**         | Google Gemini AI   | Deep contextual re-humanization          |
| **Audit System**       | GPTZero            | Enterprise-grade AI detection            |

### Data Flow

```
Input Text → Pattern Analysis → Refinement Execution → AI Probability Check → [Loop if Score > 15%] → Output Generation → UI Sync
```

---

## ✨ Key Features

### Core Humanization

- ✅ **Iterative Loop**: Up to 3 recursive passes for maximum undetectability.
- ✅ **Style Casting**: Specialized modes for Academic, Professional, and Creative writing.
- ✅ **Grammar Guard**: Automatic syntax correction while preserving tone.
- ✅ **Dynamic Refinement**: Option to further "Shorten", "Expand", or "Improve" results.

### AI & Analytics

- **Real-time Scoring**: Live GPTZero-powered "AI Probability Score" feedback.
- **Plagiarism Guard**: Integrated originality checks to ensure unique content.
- **Pattern Recognition**: Detects machine-like sentence structures (e.g., uniform length, lack of idioms).
- **Trend Analysis**: Visualize your humanization journey over time with custom analytics.
- **History Tracking**: Securely store and recall previous transformations.

### User Experience

- **Drag & Drop**: Seamless extraction from `.pdf`, `.docx`, and `.txt` files.
- **Multi-Format Export**: One-click download of results as PDF or Word documents.
- **Premium UI**: Sleek dashboard with retractable sidebars and glassmorphism elements.
- **Secure Auth**: Bcrypt password hashing and JWT token management.
- **Integrated Tools**: Specialized bots for Researcher, Fact-Checker, and Social Media content.

### Developer Experience

- 🧪 **Comprehensive Testing**: Dedicated test suites for both Frontend and Backend.
- 🔄 **Type-Safe Development**: Full TypeScript integration across the stack.
- 🐳 **PostgreSQL Ready**: Easy database migrations with Prisma.
- 📖 **Modular API**: Clean separation of concerns for easy contribution.

---

## 🚀 Getting Started

### 1. Setup Environment

```bash
# Clone the repository
git clone https://github.com/Sappymukherjee214/AI-Humanizer.git
cd AI-Humanizer

# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/ai_humanizer"
JWT_SECRET="your_secret_key"
GEMINI_API_KEY="your_gemini_key"
GPTZERO_API_KEY="your_gptzero_key"
STRIPE_SECRET_KEY="your_stripe_key"
```

### 3. Initialize Database

```bash
cd backend
npx prisma db push
npx prisma generate
```

### 4. Launch Application

#### **A. Backend Server**
```bash
cd backend
npm run dev
```

#### **B. Frontend Client**
```bash
cd frontend
npm run dev
```

---

> [!TIP]
> **Development Workflow**:
> - **Frontend Changes**: Reflected **instantly** via Vite HMR (http://localhost:5173).
> - **Database Changes**: After modifying `schema.prisma`, run `npx prisma db push` to sync.

> [!NOTE]
> For detailed architecture, security protocols, and GSSoC contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md).

---

## 🎮 Usage

### For Users

1. **Launch**: Open the frontend and backend servers.
2. **Setup**: Register a new account and log in.
3. **Analyze**: Paste your AI text or upload a document inside the Dashboard.
4. **Transform**: Select your desired "Mode" (e.g., Professional) and click "Run Humanizer".
5. **Optimize**: If the AI score is still high, use the "Improve Further" dropdown for a manual refinement pass.
6. **Export**: Export your final prose as a professional document.

### For Developers

#### API Documentation

```javascript
// Example: Direct Humanization Request (Node/JS)
const response = await axios.post("http://localhost:5000/api/humanize", {
    text: "AI generated content here...",
    mode: "academic",
    toolId: "humanizer"
}, {
    headers: { Authorization: `Bearer ${YOUR_JWT_TOKEN}` }
});

console.log(`Humanized Content: ${response.data.humanized}`);
console.log(`AI Detection Score: ${response.data.scores.ai}%`);
```

---

## 🧪 Testing

### Run Test Suite

```bash
# Backend Tests
cd backend
npm test

# Frontend Unit Tests
cd frontend
npm run test
```

### Test Categories

- **Unit Tests**: Individual API endpoint and component logic.
- **Integration Tests**: End-to-end data flow (Prisma -> DB).
- **Service Tests**: Mock testing for External APIs (Gemini, GPTZero).
- **UI/UX Tests**: Responsive design and state transition validation.

---

## 🤝 Contributing

We welcome contributions! We are currently active as a project in **GSSoC 2026**.

Please see our [Contributing Guide](CONTRIBUTING.md) for step-by-step instructions on forking, claiming issues, and submitting Pull Requests.

---

## ❓ FAQ

### General Questions

**Is this tool free?**
Currently, we offer free access for GSSoC development purposes. Future updates may include Stripe-based subscription tiers.

**Does it really pass GPTZero?**
Our Iterative Loop is specifically tuned to counter detection patterns. Most results achieve <12% AI probability scores.

**Can I export my work?**
Yes, we support PDF and DOCX export out of the box.

### Technical Questions

**What are the system requirements?**
- Node.js v18.0.0 or higher
- PostgreSQL v14+
- 4GB RAM (minimum for local processing)

**Is my data secure?**
All processing happens via secure HTTPS connections. We use Bcrypt for internal password storage and JWT for session management.

**How do I reset the database?**
```bash
npx prisma migrate reset --force
npx prisma db push
```

---

## 📊 Troubleshooting

### Common Installation Issues

**Prisma Client Out of Sync**
- Solution: Run `npx prisma generate` in the backend folder.

**Database Connection Denied**
- Ensure your `DATABASE_URL` in `.env` matches your local PostgreSQL configuration.
- Check if the PostgreSQL service is running: `pg_isready` (on Linux/Mac).

**Vite Port Conflicts**
- If port 5173 is busy, Vite will automatically pick another. Check the terminal output for the correct URL.

---

## 🛡️ License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI**: For providing high-level LLM capabilities.
- **GPTZero**: For their state-of-the-art detection API.
- **GSSoC 2026**: For the opportunity to grow this project within the open-source community.

---

**Built with ❤️ for authentic human expression and personal growth by Saptarshi Mukherjee**
