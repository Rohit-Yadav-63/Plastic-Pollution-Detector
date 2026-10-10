# Frontend

React, Vite, Tailwind CSS, React Router, Lucide React, and Recharts.

Requirements: Node.js 18+ and npm.

    cd frontend
    npm install
    npm run dev

The app needs no backend. To create a production build, run npm run build from this directory. Copy .env.example to .env to change the local API base URL; do not put secrets in Vite variables.

Image analysis currently calls the mock service in src/services/analysisService.js. Outputs use a shared result shape and are explicitly marked simulated; no model runs. The future multipart endpoint is POST /api/analyze. The API client reads VITE_API_BASE_URL, defaulting to http://localhost:8000. Switch USE_MOCK_ANALYSIS in the analysis service when the backend is ready.