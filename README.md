# 🛒 Bazar Dor — Daily Essentials Price Tracker

**Track daily essential prices across Bangladesh in one place.**

Bazar Dor is a modern, responsive web application that helps users explore daily essential product prices, compare market rates, and discover price increases and decreases across Bangladesh.

## ✨ Features

* **Price Tracking** — Explore prices of daily essential products.
* **Price Trends** — Discover products with increasing or decreasing prices.
* **Category Filtering** — Browse products by category.
* **Product Details** — View price summaries and market-wise pricing information.
* **Authentication** — Secure sign-in and registration with BetterAuth.
* **Protected Routes** — Restrict access to authenticated users.
* **Responsive Design** — Optimized for mobile, tablet, and desktop.
* **Interactive UI** — Loading skeletons, notifications, and intuitive navigation.
* **Profile Management** — Update user profile information.

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
| [React Hook Form](https://react-hook-form.com/)           | Form management                |

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

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://api.api-store.workers.dev/api/bazardor
```

If the API provider supplies a different base URL, replace the value accordingly.

Configure any additional BetterAuth variables required by your existing authentication setup. Keep secret values private and never commit them.

### 4. Start the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 📡 API Reference

Base URL:

```text
https://api.api-store.workers.dev/api/bazardor
```

| Endpoint                      | Description                   |
| ----------------------------- | ----------------------------- |
| `GET /products`               | Retrieve products             |
| `GET /products?category=chal` | Retrieve products by category |
| `GET /products/1`             | Retrieve a product by ID      |
| `GET /categories`             | Retrieve available categories |
| `GET /categories/chal`        | Retrieve a category by slug   |

*API availability and response structures depend on the external API provider.*

## 📁 Project Structure

```text
bazar-dor/
├── public/                 # Static assets
├── src/
│   ├── app/                # App Router pages and layouts
│   │   ├── category/[slug]/
│   │   ├── product/[slug]/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── profile/
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── globals.css
│   ├── components/         # Reusable UI components
│   └── lib/                # API and authentication utilities
├── .env.local              # Local environment variables
├── AGENTS.md               # AI coding guidelines
├── package.json
└── README.md
```

*The structure above is illustrative; keep it aligned with the actual repository.*

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

Deploy the application using a Next.js-compatible hosting platform, such as [Vercel](https://vercel.com/).

Before deployment:

1. Configure the required environment variables.
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
