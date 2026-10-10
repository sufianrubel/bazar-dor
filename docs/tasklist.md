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
[ ] Build shared Navbar with logo and Bengali date
[ ] Add category navigation links with active states
[ ] Implement Sign In / Sign Up or profile / Sign Out actions
[ ] Build infinite scrolling price ticker
[ ] Create reusable product card, price badge and skeleton components
[ ] Build footer matching the Figma
[ ] Ensure mobile, tablet and desktop responsiveness

Phase 4 — Home Page
[ ] Build hero section with heading, subtitle and banner image
[ ] Connect primary CTA to #সব-পণ্য anchor
[ ] Build আজ দাম বেড়েছে section with top 6 risers
[ ] Build আজ দাম কমেছে section with top 6 fallers
[ ] Build সব পণ্য section with responsive product grid
[ ] Link product cards to product detail routes
[ ] Add loading skeletons and API error handling

Phase 5 — Category Pages
[ ] Create dynamic category route
[ ] Show category title, icon and products
[ ] Implement default sorting
[ ] Implement price low-to-high sorting
[ ] Implement price high-to-low sorting
[ ] Parse Bengali numerals for correct numeric sorting
[ ] Add skeleton, empty state and invalid-category handling
[ ] Add return-home CTA for invalid categories

Phase 6 — Authentication
[ ] Configure BetterAuth server and client
[ ] Set up database and authentication environment variables
[ ] Implement email/password sign-up
[ ] Implement email/password sign-in
[ ] Configure Google and GitHub social providers
[ ] Build sign-in and sign-up forms with validation
[ ] Add success, error and logout toast notifications
[ ] Persist sessions and update Navbar based on auth state
[ ] Test successful and failed authentication flows

Phase 7 — Protected Product Details
[ ] Implement protected product detail route
[ ] Redirect unauthenticated users to sign-in
[ ] Show toast notification for protected-route redirects
[ ] Display product emoji, title, description, category and unit
[ ] Calculate and display minimum, maximum and average prices
[ ] Build বাজারভিত্তিক আজকের দাম section
[ ] Handle unknown product slugs with a friendly 404 page
[ ] Verify product detail data against the API response

Phase 8 — Profile & Challenge
[ ] Create My Profile page
[ ] Add Update Information action
[ ] Create profile update route and Name input
[ ] Update user name through BetterAuth updateUser API
[ ] Show validation and success/error notifications
[ ] Complete Bengali numeric price sorting tests

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