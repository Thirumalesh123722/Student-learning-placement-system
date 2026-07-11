# Smart Learning Placement System

Full-stack application (Express + MongoDB backend, React frontend) for managing courses, assignments, jobs, and applications.

Quick start (development):

1. Backend

```powershell
cd backend
npm install
# Set MongoDB URI for Atlas or leave blank to use in-memory DB for development
$env:MONGO_URI=
npm run dev
```

2. Frontend

```powershell
cd frontend
npm install
npm start
```

Notes:
- If you want to use MongoDB Atlas, whitelist your machine IP in Atlas Network Access.
- Do not commit `.env` with secrets; use environment variables or CI secrets.
# Smart Learning Placement System

This repository contains a MERN application (Express + MongoDB backend, React frontend) for coursework, job postings, enrollments, submissions, and job applications.

Quick start (development)

1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit backend/.env and set MONGO_URI and JWT_SECRET
npm run dev
```

2. Frontend

```bash
cd frontend
npm install
npm start
```

Open the frontend at http://localhost:3000

Deployment options

- Frontend: Vercel / Netlify (set `REACT_APP_API_URL` to your backend API)
- Backend: Render / Railway / Fly / Heroku (set `MONGO_URI`, `JWT_SECRET` in provider)

Serve frontend from backend (single deploy)

```bash
cd frontend
npm run build
cd ../backend
# ensure backend serves static from frontend/build (server.js)
npm start
```

Deploy to Heroku

1. Create a new Heroku app.
2. Set config vars in Heroku:
   - `MONGO_URI`
   - `JWT_SECRET`
3. Push the repo and Heroku will run `npm run build` because of `heroku-postbuild`.

```bash
heroku git:remote -a your-heroku-app-name
git push heroku master
```

Docker (local test)

```bash
# from repo root
docker-compose up --build
```

Security notes

- Never commit real secrets in `.env`.
- If secrets were pushed, rotate credentials immediately and purge git history.

Files added to help deploy:

- `.gitignore` - ignores `node_modules`, build outputs and `.env` files
- `backend/.env.example` - sample env file
- `docker-compose.yml` and `backend/Dockerfile` - quick Docker setup for local testing

The repository includes a GitHub Actions workflow at `.github/workflows/ci.yml` that:

- installs backend and frontend dependencies
- builds the frontend
- optionally deploys the frontend to Vercel when manually triggered and secrets are configured

To use the deploy step, add these repository secrets in GitHub:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

For backend Heroku deployment (optional):

- `HEROKU_API_KEY` (Heroku account API key)
- `HEROKU_APP_NAME` (Heroku app name)
- `HEROKU_EMAIL` (Heroku account email)

Then run the workflow manually from the Actions tab and set `deploy` to `true`.
