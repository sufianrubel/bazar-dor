# 🛒 Bazar Dor — Daily Essentials Price Tracker

**Track daily essential prices across Bangladesh in one place.**

Bazar Dor is a modern, responsive web application that helps users explore daily essential product prices, compare market rates, and discover price increases and decreases across Bangladesh.

## ✨ Features

* **API-backed catalog** — Browse products and categories from the configured API.
* **Price trends** — Discover products with increasing or decreasing prices.
* **Product details** — View API market ranges and product price summaries.
* **Responsive design** — Layouts adapt to mobile, tablet, and desktop.
* **Authentication** — Persisted email/password sessions with optional Google and GitHub sign-in through BetterAuth.
* **Notifications** — Show localized success and error feedback for account actions and form validation.

## 🛠️ Tech Stack

| Technology                                                | Purpose                        |
| --------------------------------------------------------- | ------------------------------ |
| [Next.js](https://nextjs.org/)                            | React framework and App Router |
| JavaScript                                                | Application logic              |
| [Tailwind CSS](https://tailwindcss.com/)                  | Styling and responsive layouts |
| [HeroUI](https://heroui.com/)                             | UI components                  |
| [React Icons](https://react-icons.github.io/react-icons/) | Icons                          |
| [BetterAuth](https://www.better-auth.com/)                | Authentication                 |
| [React Hot Toast](https://react-hot-toast.com/)           | Notifications                  |

## 🚀 Getting Started

### Prerequisites

* Node.js (LTS recommended)
* npm
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/sufianrubel/bazar-dor.git
cd bazar-dor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the environment template to `.env.local` in the project root:

```bash
cp .env.example .env.local
```

`NEXT_PUBLIC_API_URL` is the configured API base URL. Replace it if your API provider supplies a different URL. BetterAuth requires a reachable MongoDB database, a strong secret, and the application's origin:

* Set `MONGODB_URI` and `MONGODB_DB` to a MongoDB replica set and database (MongoDB Atlas supports the transactions BetterAuth uses). For local development, start MongoDB with `mongod --replSet rs0 --bind_ip localhost`, then initialize it with `mongosh --eval "rs.initiate()"` to match the sample URI.
* Generate `BETTER_AUTH_SECRET` with `openssl rand -base64 32`.
* Set `BETTER_AUTH_URL` to the application origin (for example, `http://localhost:3000`).
* Google and GitHub sign-in are optional. Configure both client ID and secret for each provider to enable its button. Set each provider's callback URL to `<BETTER_AUTH_URL>/api/auth/callback/google` or `<BETTER_AUTH_URL>/api/auth/callback/github`.

Keep secret values private and never commit `.env.local`. Authentication uses the Node.js runtime and a MongoDB deployment reachable from the application server.

### 4. Start the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

The catalog uses `GET /products`, `GET /products?category=<slug>`,
`GET /products/<id>`, and `GET /categories` relative to `NEXT_PUBLIC_API_URL`.
API failures are shown in the page UI; catalog responses are revalidated every
five minutes.

## 📁 Project Structure

```text
bazar-dor/
├── public/                 # Static assets
├── src/
│   ├── app/                # App Router routes and root layout
│   │   ├── (auth)/         # Sign-in and sign-up routes
│   │   ├── (main)/         # Home, category, and product routes
│   │   ├── profile/
│   │   └── globals.css
│   ├── components/         # Feature-based reusable UI
│   ├── constants/          # Shared configuration and options
│   ├── data/               # Product, category, and mock content
│   └── lib/                # Catalog, formatting, and auth utilities
├── .env.example            # Environment variable template
├── .env.local              # Local environment variables
├── AGENTS.md               # Project coding guidelines
├── package.json
└── README.md
```

## 🧪 Available Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Start the production server  |
| `npm run lint`  | Run ESLint, if configured    |

## 🔐 Security

* Keep environment files and authentication secrets out of version control.
* Validate authentication and authorization on protected resources.
* Handle API errors without exposing sensitive information.
* Follow the official BetterAuth security recommendations.

## 🌐 Deployment

This repository includes an OpenNext adapter and Wrangler configuration for
[Cloudflare Workers](https://developers.cloudflare.com/workers/). In the
Cloudflare Worker settings, add the following production variables before
deploying:

| Variable | Type | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Plain text | Configured in `wrangler.jsonc` as `https://api.api-store.workers.dev/api/bazardor` |
| `BETTER_AUTH_URL` | Plain text | Configured in `wrangler.jsonc` as `https://bazar-dor.rubel-nstu27.workers.dev` |
| `MONGODB_DB` | Plain text | Configured in `wrangler.jsonc` as `bazar-dor` |
| `BETTER_AUTH_SECRET` | Secret | Generate a strong, unique value with `openssl rand -base64 32` |
| `MONGODB_URI` | Secret | Connection string for a production MongoDB replica set |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Plain text / secret | Optional; set both to enable Google sign-in |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | Plain text / secret | Optional; set both to enable GitHub sign-in |

Configure enabled OAuth providers with the production origin's BetterAuth
callback URLs. Add required and optional secrets through the Cloudflare
dashboard or `npx wrangler secret put <NAME>`; do not add credentials to
Wrangler config, `.env.example`, or source control. If using Cloudflare's build
pipeline, also provide `NEXT_PUBLIC_API_URL` as a build environment variable
because Next.js embeds public variables during build.

Deploy from a configured environment with:

```bash
npm run deploy
```

Vercel is another possible Next.js host, but this repository's checked-in
deployment configuration targets Cloudflare Workers.

Before deployment:

1. Configure production variables and secrets in the hosting provider.
2. Run the production build.
3. Verify authentication and protected routes.
4. Test product, category, and dynamic detail routes.
5. Check responsive layouts and browser console errors.

## 👨‍💻 Development Guidelines

* Follow the repository's `AGENTS.md` instructions.
* Use JavaScript and JSX.
* Use Tailwind CSS for styling and HeroUI for UI components.
* Use React Icons for icons.
* Keep components reusable and maintain a clean Git history.
* Test relevant changes before submitting them.

## 📄 License

This project was created for educational purposes as part of a Programming Hero assignment. Add an explicit license if you intend to distribute the source code under specific reuse terms.

## 🙌 Acknowledgements

* [Programming Hero](https://www.programming-hero.com/)
* The Bazar Dor API provider
* The open-source community

---

**Bazar Dor — Essential prices, made easier to explore.**
