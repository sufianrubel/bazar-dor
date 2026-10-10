Phase 1 — Project Setup
[x] Initialize Next.js App Router project
[x] Configure Tailwind CSS v4 and HeroUI
[x] Set up project structure and reusable components
[x] Configure environment variables for API base URL
[x] Install BetterAuth, react-hot-toast and required dependencies
[x] Create README.md with project overview and technologies

Phase 2 — API & Data Layer
[x] Create reusable API client and error handling
[x] Fetch all products from the API
[x] Fetch categories and category-specific products
[x] Fetch individual product details
[x] Handle loading, empty, invalid and API error states
[x] Create reusable Bengali price, unit and percentage formatters

Phase 3 — Shared UI
[x] Build shared Navbar with logo and Bengali date
[x] Add category navigation links with active states
[x] Implement Sign In / Sign Up or profile / Sign Out actions
[x] Build infinite scrolling price ticker
[x] Create reusable product card, price badge and skeleton components
[x] Build footer matching the Figma
[x] Ensure mobile, tablet and desktop responsiveness

Phase 4 — Home Page
[x] Build hero section with heading, subtitle and banner image
[x] Connect primary CTA to #সব-পণ্য anchor
[x] Build আজ দাম বেড়েছে section with top 6 risers
[x] Build আজ দাম কমেছে section with top 6 fallers
[x] Build সব পণ্য section with responsive product grid
[x] Link product cards to product detail routes
[x] Add loading skeletons and API error handling

Phase 5 — Category Pages
[x] Create dynamic category route
[x] Show category title, icon and products
[x] Implement default sorting
[x] Implement price low-to-high sorting
[x] Implement price high-to-low sorting
[x] Parse Bengali numerals for correct numeric sorting
[x] Add skeleton, empty state and invalid-category handling
[x] Add return-home CTA for invalid categories

Phase 6 — Authentication
[x] Configure BetterAuth server and client
[x] Set up database and authentication environment variables
[x] Implement email/password sign-up
[x] Implement email/password sign-in
[x] Configure Google and GitHub social providers
[x] Build sign-in and sign-up forms with validation
[x] Add success, error and logout toast notifications
[x] Persist sessions and update Navbar based on auth state
[x] Test successful and failed authentication flows

Phase 7 — Protected Product Details
[x] Implement protected product detail route
[x] Redirect unauthenticated users to sign-in
[x] Show toast notification for protected-route redirects
[x] Display product emoji, title, description, category and unit
[x] Calculate and display minimum, maximum and average prices
[x] Build বাজারভিত্তিক আজকের দাম section
[x] Handle unknown product slugs with a friendly 404 page
[x] Verify product detail data against the API response

Phase 8 — Profile & Challenge
[x] Create My Profile page
[x] Add Update Information action
[x] Create profile update route and Name input
[x] Update user name through BetterAuth updateUser API
[x] Show validation and success/error notifications
[x] Complete Bengali numeric price sorting tests

Phase 9 — QA & Accessibility
[ ] Create a custom 404 page for unknown routes
[ ] Verify page reloads on dynamic routes after deployment
[ ] Test navbar, ticker, forms and CTA on mobile
[ ] Check console errors and failed network requests
[ ] Test loading, empty, error and invalid-route states
[ ] Verify keyboard navigation, labels and focus states
[ ] Confirm all displayed prices and changes use Bengali numerals
[ ] Verify all authentication and protected-route flows

Phase 10 — Git, Deployment & Submission
[ ] Make at least 8 meaningful Git commits
[ ] Review code structure and remove unused code
[ ] Complete README with at least 5 key features
[ ] Configure production environment variables
[ ] Deploy to Vercel or another supported platform
[ ] Test live URLs, OAuth callbacks and page refreshes
[ ] Record live deployment URL
[ ] Record GitHub repository URL
[ ] Submit before the applicable deadline



## Bazar Dor API Endpoints

Base URL: `https://api.api-store.workers.dev/api/bazardor`

| Method | Endpoint                  | Description                     |
| ------ | ------------------------- | ------------------------------- |
| GET    | `/products`               | Fetch all products              |
| GET    | `/products?category=chal` | Fetch products by category      |
| GET    | `/products/1`             | Fetch a single product by ID    |
| GET    | `/categories`             | Fetch all categories            |
| GET    | `/categories/chal`        | Fetch a single category by slug |

Fallback Base URL: `https://api.abcz.workers.dev/api/bazardor`

### Full API URLs

```
GET https://api.api-store.workers.dev/api/bazardor/products

GET https://api.api-store.workers.dev/api/bazardor/products?category=chal

GET https://api.api-store.workers.dev/api/bazardor/products/1

GET https://api.api-store.workers.dev/api/bazardor/categories

GET https://api.api-store.workers.dev/api/bazardor/categories/chal
```