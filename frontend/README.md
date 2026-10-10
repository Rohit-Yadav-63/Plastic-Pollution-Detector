# Plastic Pollution Analyzer Frontend

A React and Vite frontend for a B.Tech project. It runs without a backend.

## Run

    cd frontend
    npm install
    npm run dev

Run automated checks with npm test. Create a production build with npm run build in frontend.

## Demo authentication

Signup and login create a temporary frontend demo session. The UI does not verify passwords or create a real account. Password reset, account registration, password verification, and secure sessions need a backend. The demo stores only the session user's name and email in browser storage; it never stores passwords.

Future authentication calls are isolated in src/services/authService.js. Keep demo mode enabled until the backend endpoints are available.

## Image metadata and location privacy

Image dimensions and available EXIF capture time and GPS are read in the browser. Current device location is requested only after the user presses the location button and grants browser permission. Photo GPS, manual place names, and device location are labeled separately. EXIF values do not verify when or where an image was taken.

Images and metadata are not sent to a server in demo mode. Exact GPS coordinates are removed before an analysis is saved to local browser history. The active results page can show exact values, while CSV and printed reports omit exact coordinates unless the user selects the opt-in.

## Analysis output

Object boxes, categories, confidence values, severity scores, and the dashboard's 38 item sample are illustrative. They are not produced by a trained model and are not environmental measurements. src/services/analysisService.js provides the shared result shape and the future /api/analyze integration point.