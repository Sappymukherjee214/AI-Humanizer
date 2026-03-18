# ✨ AI Humanizer: The Ultimate AI-to-Human Text Transformer

![AI Humanizer Mockup](./assets/mockup.png)

## 🚀 Overview

**AI Humanizer** is a state-of-the-art, research-grade platform designed to bypass AI detection and transform machine-generated content into high-quality, undetectable human-like prose. Leveraging an advanced **Iterative Detection-Refinement Loop**, it ensures your content consistently passes AI audits (like GPTZero) while maintaining impeccable readability and tone.

Whether you're an academic, a creative professional, or an SEO specialist, AI Humanizer provides the tools to ensure your voice remains authentic and your content remains indistinguishable from human writing.

---

## 🌟 Key Features

### 🧠 Advanced Refinement Engine
- **Iterative Detection-Refinement Loop**: Unlike simple paraphrasers, AI Humanizer runs a recursive loop (up to 3 iterations) that checks the text against AI detectors and re-humanizes it until the "AI Probability Score" drops below **15%**.
- **Context-Aware Humanization**: Infuses natural sentence flow, varied syntax, and human-like idioms into every paragraph.

### 🎭 Multi-Style Humanization Modes
Tailor your output based on your specific needs:
- 🎓 **Academic**: Sophisticated, rigorous, and citation-ready.
- 💼 **Professional**: Polished, clear, and business-focused.
- ☕ **Casual**: Relaxed, conversational, and engaging.
- 📈 **SEO-Optimized**: Humanized while retaining keyword density and search intent.
- 🎨 **Creative**: Vivid, expressive, and narratively rich.
- ⚖️ **Balanced**: The perfect middle ground for general-purpose writing.

### 📁 Comprehensive File Support
- **Full Extract/Export**: Drag and drop `.pdf`, `.docx`, or `.txt` files directly into the editor.
- **Batch Processing**: Extract text from documents and export humanized results in multiple formats.

### 📊 Real-time Analytics & Scoring
- **AI Probability Score**: Live feedback powered by detection algorithms.
- **Plagiarism Guard**: Integrated checks to ensure originality.
- **History & Analytics**: Track your transformation journey and refinement stats.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Interactive UI**: [React Dropzone](https://react-dropzone.js.org/), [Recharts](https://recharts.org/), [React Markdown](https://github.com/remarkjs/react-markdown)

### Backend
- **Core**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Intelligence**: [Google Gemini AI API](https://ai.google.dev/) (Refinement) + [GPTZero API](https://gptzero.me/) (Detection)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Processing**: [Multer](https://github.com/expressjs/multer), [PDF-Parse](https://www.npmjs.com/package/pdf-parse), [Mammoth](https://github.com/mwilliamson/mammoth.js) (Word Processing)
- **Security**: [JWT](https://jwt.io/) & [Bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Payments**: [Stripe](https://stripe.com/)

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running
- API Keys: Google Gemini AI, GPTZero

### 1. Clone the repository
```bash
git clone https://github.com/your-repo/ai-humanizer.git
cd ai-humanizer
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/ai_humanizer"
JWT_SECRET="your_secret_key"
GEMINI_API_KEY="your_gemini_key"
GPTZERO_API_KEY="your_gptzero_key"
STRIPE_SECRET_KEY="your_stripe_key"
STRIPE_WEBHOOK_SECRET="your_webhook_secret"
```
Initialize the database:
```bash
npx prisma db push
npx prisma generate
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Start the development server:
```bash
npm run dev
```

---

## 🛣️ API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate and get JWT |
| `POST` | `/api/humanize` | Transform text with detection-refinement loop |
| `POST` | `/api/extract` | Extract text from PDF/DOCX files |
| `POST` | `/api/export` | Export humanized text to PDF/DOCX |
| `POST` | `/api/payment/create-checkout` | Handle Stripe subscriptions |

---

## 🛡️ License

Distributed under the **ISC License**. See `LICENSE` for more information.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git checkout origin feature/AmazingFeature`)
5. Open a Pull Request

---

*Built with ❤️ by Saptarshi Mukherjee.*
