# AGENTS.md

## 1. Project Overview

Bazar Dor is a responsive Bangladeshi daily essentials price-tracking application.

**Stack:** Next.js App Router, JavaScript, Tailwind CSS, HeroUI, React Icons, BetterAuth, React Hot Toast, React Hook Form.

## 2. Development Rules

* Read `package.json` and the existing project structure before making changes.
* Use JavaScript/JSX only; never introduce TypeScript.
* Follow Next.js App Router best practices and existing conventions.
* Prefer reusable components, clean code, and minimal dependencies.
* Avoid unnecessary refactoring, duplicated logic, and unrelated changes.

## 3. Tailwind CSS Restrictions

* Use Tailwind CSS utilities as the primary styling solution.
* Use HeroUI for accessible, reusable UI components.
* Do not use DaisyUI, Bootstrap, or competing UI frameworks.
* Avoid inline styles, unnecessary custom CSS, and `@apply`.
* Keep `globals.css` minimal.
* Prefer standard utilities and consistent design tokens over arbitrary values.
* Use complete, statically detectable class names; never construct dynamic Tailwind classes.
* Follow the installed Tailwind version and official configuration conventions.

## 4. UI and Component Guidelines

* Use [HeroUI](https://heroui.com/) for appropriate interface components.
* Use [React Icons](https://react-icons.github.io/react-icons/) for icons; do not use Lucide React.
* Use React Hot Toast for notifications and React Hook Form when appropriate.
* Maintain responsive layouts, consistent styling, semantic HTML, accessibility, and visible focus states.
* Include suitable loading, empty, and error states.

## 5. Next.js and API Best Practices

* Prefer Server Components; use `"use client"` only when necessary.
* Use `next/link` for internal navigation and `next/image` when appropriate.
* Centralize API requests and handle network errors and invalid data.
* Ensure dynamic routes work on direct navigation and reload.
* Store configuration in environment variables; never expose secrets through `NEXT_PUBLIC_` variables.

## 6. Project Structure

```text
bazar-dor/
├── public/
│   ├── images/
│   ├── icons/
│   └── logo.png
│
├── src/
│   ├── app/
│   │   ├── (main)/
│   │   │   ├── page.js
│   │   │   ├── category/
│   │   │   │   └── [slug]/
│   │   │   │       ├── page.js
│   │   │   │       └── loading.js
│   │   │   └── product/
│   │   │       └── [slug]/
│   │   │           └── page.js
│   │   │
│   │   ├── (auth)/
│   │   │   ├── signin/
│   │   │   │   └── page.js
│   │   │   └── signup/
│   │   │       └── page.js
│   │   │
│   │   ├── profile/
│   │   │   └── update/
│   │   │       └── page.js
│   │   │
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.js
│   │   │
│   │   ├── layout.js
│   │   ├── loading.js
│   │   ├── error.js
│   │   ├── not-found.js
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PriceTicker.jsx
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── PriceTrendSection.jsx
│   │   │   └── ProductSection.jsx
│   │   │
│   │   ├── product/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   └── ProductDetails.jsx
│   │   │
│   │   ├── category/
│   │   │   └── CategoryHeader.jsx
│   │   │
│   │   ├── auth/
│   │   │   ├── SignInForm.jsx
│   │   │   └── SignUpForm.jsx
│   │   │
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Badge.jsx
│   │       ├── Input.jsx
│   │       ├── Select.jsx
│   │       ├── Dropdown.jsx
│   │       ├── Modal.jsx
│   │       ├── SectionHeader.jsx
│   │       ├── LoadingSkeleton.jsx
│   │       └── EmptyState.jsx
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.js
│   │   │   ├── products.js
│   │   │   └── categories.js
│   │   ├── auth/
│   │   │   ├── auth-client.js
│   │   │   └── auth.js
│   │   └── utils.js
│   │
│   └── constants/
│       └── index.js
│
├── .env.example
├── .env.local
├── .gitignore
├── AGENTS.md
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

## 7. Security

* Follow BetterAuth documentation and existing configuration.
* Enforce authentication and authorization on the server.
* Validate user input and protect sensitive data.
* Never expose credentials, tokens, or secrets.

## 8. Testing and Git

* Run available lint and build commands after changes.
* Test affected routes, forms, authentication, and responsive layouts.
* Review the Git diff and preserve existing user changes.
* Use conventional commits such as `feat:`, `fix:`, `refactor:`, and `docs:`.
* Never commit secrets, `.env.local`, or build artifacts.

## 9. Completion Checklist

* [ ] Requirements implemented with minimal unrelated changes.
* [ ] Tailwind CSS restrictions followed.
* [ ] HeroUI and React Icons used consistently.
* [ ] Responsive and accessible UI verified.
* [ ] Relevant lint/build checks executed.
* [ ] Final response summarizes changes and remaining issues.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
