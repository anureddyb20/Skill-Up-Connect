<div align="center">
  <h1>Skill-Up-Connect</h1>
  <p><em>Bridging the gap between learning and career growth — empowering you to upskill and land your dream role.</em></p>
  <p>
    <img src="https://img.shields.io/badge/Release-v1.0.0-yellow.svg" alt="Release" />
    <img src="https://img.shields.io/badge/Status-Live-success.svg" alt="Status" />
    <img src="https://img.shields.io/badge/UI-Modern%20Glass-blue.svg" alt="UI" />
  </p>
</div>

<hr />

## 📖 Overview

Skill-Up-Connect is a comprehensive, interactive platform designed to integrate skills assessment, personalized learning paths, an interactive resume builder, and a dedicated jobs portal into one seamless experience.

## ✨ Key Features

- **Personalized Dashboard:** Track your learning progress, skills, and activities with interactive charts built using Recharts.
- **Skills Assessment:** Evaluate your current knowledge through dynamic quizzes and get insightful feedback on a detailed results page.
- **Learning Paths:** Custom-tailored courses and modules to help you master new domains.
- **Interactive Resume Builder:** An integrated resume creator with PDF export capabilities (powered by `jspdf` and `html2canvas`).
- **Jobs Portal:** Discover and apply for the latest job opportunities matching your skill profile.
- **Smooth Animations:** High-quality micro-interactions, page transitions, and engaging UI elements powered by Framer Motion.
- **Gamified Elements:** Celebrate your milestones and completed assessments with Confetti effects!

## 🛠️ Tech Stack

**Frontend:**
- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/) (Animations)
- [Recharts](https://recharts.org/) (Data Visualization)
- [Lucide React](https://lucide.dev/) (Icons)

**Backend:**
- [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/) (`server.cjs`)
- [Nodemon](https://nodemon.io/) (Development)

**Utilities:**
- `jspdf` & `html2canvas` (Resume generation)
- `canvas-confetti` (Gamification)

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js (v18 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anureddyb20/Skill-Up-Connect.git
   cd Skill-Up-Connect
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   You can run both the frontend (Vite) and backend (Express) concurrently using a single command:
   ```bash
   npm run dev:all
   ```
   
   *Alternatively, you can run them separately:*
   ```bash
   npm run dev       # Starts the Vite frontend server
   npm run server    # Starts the Node/Express backend server
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```text
skill-up-connect/
├── public/              # Static public assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components (Header, Sidebar)
│   ├── data/            # Mock data, JSON structures, or constants
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Application pages (Dashboard, ResumeBuilder, Jobs, etc.)
│   ├── utils/           # Helper functions
│   ├── App.jsx          # Root component layout and routing
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── server.cjs           # Express backend server script
├── db.json              # Mock database/JSON server data
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](https://github.com/anureddyb20/Skill-Up-Connect/issues) if you want to contribute.

## 📄 License

This project is licensed under the MIT License.
