# WALLBORN: Siege of Aethermoor

An original dark-military fantasy story archive — full-stack web app built with
**React + Vite + Zustand** (frontend) and **Node.js + Express + MongoDB** (backend).

> **Note on originality:** This is an original IP — characters, the "Hollow Kin" creatures,
> and the Aethermoor storyline are all original creative work, not reproductions of any
> existing copyrighted series. That's deliberate, so you can deploy and share this app
> publicly without IP risk.

## What's inside

- 15 original characters (soldiers, scholars, council members) across three military
  orders: **Vanguard**, **Ironwatch**, **Cinder Corps**
- 9 original "Hollow Kin" creatures (the titan-equivalent threats), including a
  Sealed God-tier apex horror
- Full story chronicle / timeline page
- User accounts (signup/login), favorites ("dossier"), and a comment system for
  lore discussion on each character/titan page
- A custom "military dossier" visual design system (dark palette, stencil-serif
  display type, monospace intel-readout labels, status stamps)

## Tech stack

| Layer    | Tech |
|----------|------|
| Frontend | React 19, Vite, Zustand, React Router, Framer Motion, Axios |
| Backend  | Node.js, Express, Mongoose, JWT (httpOnly cookie auth), bcrypt |
| Database | MongoDB |

## Project structure

```
wallborn/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── api/            # Axios client
│   │   ├── components/     # Navbar, cards, Portrait, Comments, etc.
│   │   ├── pages/          # Home, Roster, Bestiary, Detail pages, Auth, Favorites
│   │   ├── store/          # Zustand stores (auth, characters, titans, favorites)
│   │   └── styles/         # global.css design tokens
│   └── .env                # VITE_API_URL
└── server/                  # Express + MongoDB backend
    ├── src/
    │   ├── config/          # db.js, jwt.js
    │   ├── controllers/     # route logic
    │   ├── middleware/      # auth middleware
    │   ├── models/          # Character, TitanKin, User, Comment
    │   ├── routes/          # Express routers
    │   ├── seed/seed.js     # populates the DB with all story content
    │   └── app.js / server.js
    └── .env                 # PORT, MONGODB_URI, JWT_SECRET, CLIENT_URL
```

## Setup

### 1. Backend

```bash
cd server
npm install
```

Edit `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/wallborn   # or your MongoDB Atlas URI
JWT_SECRET=replace_with_a_long_random_string
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**You need a MongoDB instance.** Easiest options:
- Local: install MongoDB Community Server, it'll listen on `mongodb://127.0.0.1:27017`
- Cloud (free tier, recommended for deploying publicly): create a cluster at
  MongoDB Atlas and paste the connection string into `MONGODB_URI`

Seed the database with all story content (characters + titans):
```bash
node src/seed/seed.js
```

Run the API:
```bash
npm run dev      # nodemon, auto-restarts on changes
# or
npm start
```

API will be live at `http://localhost:5000/api`. Sanity check: `GET /api/health`.

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

App will be live at `http://localhost:5173`.

## Swapping placeholder art for real illustrations

Every character and titan currently renders a **colored placeholder portrait**
(initials + color wash) instead of artwork — this was intentional so the full app
structure could be built and tested first.

To add real illustrations:
1. Generate or commission anime-style character/titan art (one image per character/titan)
2. Host the images (e.g. a `/public/portraits/` folder in `client`, or a cloud bucket)
3. Update each document's `portraitUrl` field in MongoDB (via the seed file or directly)
   — once `portraitUrl` is set, the `Portrait` component automatically renders the
   real image instead of the placeholder. No other code changes needed.

## Expanding the story

- Add more characters/titans: extend the arrays in `server/src/seed/seed.js`, re-run the seed script
- Add more story arcs: each character/titan has a `storyArcs` array — add entries there
  and they'll automatically render on the detail page and could be surfaced on
  `pages/Story.jsx` too
- The Story/Chronicle timeline (`client/src/pages/Story.jsx`) is currently static —
  consider moving it into MongoDB as a proper collection if it'll grow a lot

## Auth notes

Auth uses an httpOnly JWT cookie (not localStorage), set by the backend on
login/signup. `CLIENT_URL` in the backend `.env` must exactly match wherever your
frontend is hosted (including protocol/port) for cookies + CORS to work correctly.

## Deploying

- **Backend**: any Node host (Render, Railway, Fly.io, etc.) + MongoDB Atlas
- **Frontend**: any static host (Vercel, Netlify, Cloudflare Pages) — run `npm run build`
  in `client/`, deploy the `dist/` folder, and set `VITE_API_URL` to your deployed
  backend's URL
- Remember to set `NODE_ENV=production` and `secure: true` cookies will activate
  automatically (requires HTTPS in production)
"# wallborn.attack-on-titan" 
