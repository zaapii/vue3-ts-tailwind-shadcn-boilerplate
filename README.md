## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+
- pnpm

### Local Setup

```bash
# Clone and install
git clone https://github.com/zaapii/vue3-ts-tw-shadcn-boilerplate
cd vue3-ts-tw-shadcn-boilerplate
pnpm install

# Set up environment (create .env.local)
cp .env.example .env.local
# Edit .env.local and add your API base URL if needed

# Run dev server
pnpm dev
```

The app should be running at `http://localhost:5173` 🎉

## 🧪 Testing

I've set up a pretty comprehensive testing strategy here:

### Unit Tests (Vitest)

```bash
# Run all unit tests
pnpm test

# Run with UI (pretty nice for debugging)
pnpm test:ui

# Coverage report
pnpm test:coverage
```

### E2E Tests (Playwright)

```bash
# Run E2E tests
pnpm e2e

# Run with UI (super helpful for debugging)
pnpm e2e:ui
```

### All Tests

```bash
# Run everything (unit + e2e)
pnpm test-all
```

### Code Quality

```bash
# Lint and fix
pnpm lint

# Type checking
pnpm type-check

# Format code
pnpm format
```


### State Management & Data Fetching

I went with **Vue Query (TanStack Query) + KY** for data fetching. Here's why:

- **Vue Query**: Handles caching, background updates, error states, and loading states out of the box. No more manual loading flags everywhere, no more async-await try-catch endless blocks!
- **KY**: Lightweight HTTP client that's way more pleasant than axios. It's got retries, timeouts, and hooks built-in.
- **Integration**: Created a custom `useKyQueryFn` composable that wraps KY with Vue Query. This gives us a clean, typed API for all our data fetching needs.

The pattern looks like this:

```typescript
// Clean, typed, and handles all the edge cases
const { data, isLoading, error } = useSwApiQuery({
  queryKey: [queryKeys.people],
  queryFn: ky => ky.get(queryKeys.people).json(),
})
```

### UI Components & Styling

I chose **shadcn/ui** for the component library. Here's my reasoning:

- **Modularity**: You only bundle what you use. No massive component library weighing down your app
- **Customizable**: Built on top of Radix UI primitives, so you get accessibility for free but can style however you want
- **TypeScript-first**: Everything is properly typed
- **Tailwind CSS**: I'm using Tailwind v4 (alpha) with the new CSS-in-JS approach. It's faster and more maintainable than traditional CSS

### Project Structure

I organized this with scalability in mind:

```
src/
├── components/
│   ├── ui/          # Reusable UI components (shadcn)
│   ├── layout/      # Layout components
│   └── states/      # Empty/Error states
├── composables/     # Business logic & data fetching
├── services/        # API layer & type definitions
├── pages/          # Route components
└── lib/            # Utilities
```

### Why This Structure?

- **Composables**: All business logic is encapsulated in composables. Components stay dumb and focused on presentation
- **Services**: API layer is completely separated. Easy to swap APIs or add new endpoints
- **UI Components**: Reusable across the entire app. Each component exports its own index.ts for clean imports

### Performance Optimizations

- **Lazy Loading**: Routes are code-split automatically with Vue Router
- **Memoization**: Using `computed()` and `readonly()` where appropriate to prevent unnecessary re-renders
- **Bundle Splitting**: Vite handles this automatically, but the modular component structure helps
- **Image Optimization**: SVGs for icons (lucide-vue-next) - no external requests needed

### Testing Strategy

- **Unit Tests**: Vitest + Vue Test Utils for component testing
- **E2E Tests**: Playwright for critical user journeys (in this case I only did the happy path as requested, but left all the configuration to test all critical user interactions)
- **Coverage**: V8 coverage provider with HTML reports
- **Test Structure**: Tests live next to the code they're testing (co-located)

### 🏗️ Deployment Steps

```bash
# Build the production version
pnpm build

# Optional: Preview locally
pnpm preview
```

## 🛠️ CI/CD

This project uses **GitHub Actions** for CI/CD with three separate jobs:

- **Lint & Unit Tests**: Runs ESLint, TypeScript checks, and unit tests with coverage on every push and PR to `main` or `develop`
- **E2E Tests**: Executes Playwright tests in a real browser environment and uploads the test report
- **Production Build**: Runs only if tests pass, builds the app, and uploads the build artifacts (`dist/`)

All workflows use **Node.js 20**, **pnpm 8**, and leverage caching for faster installs.

> Deployments are handled via **Netlify**, which builds the production version using the `dist/` output.

## 🌍 Internationalization

I implemented **internationalization (i18n)** using [`vue-i18n`](https://vue-i18n.intlify.dev/) for the following reasons:

- **Great TypeScript support**: Strong typings for translation keys and auto-completion in IDEs
- **Performance**: Lightweight and optimized for Vue 3, with lazy loading support
- **Flexibility**: Easy to switch languages at runtime, manage fallback strategies, and support formatting

This project includes translations for **two languages** out of the box:

- 🇺🇸 English (`en`)
- 🇪🇸 Spanish (`es`)

Each translation is organized under the `locales/` directory, and you can switch languages via the UI. The selected language is persisted locally so it stays consistent between sessions.

Here’s an example usage inside components:

```ts
const { t } = useI18n()
t('common.hello') // → "Hello" / "Hola" / depending on locale
```

## 🤔 Why These Choices?

### Vue 3 + Composition API

- Better TypeScript support
- More flexible than Options API
- Better tree-shaking
- Future-proof

### TypeScript

- Personally, I think it's a must on modern Front-end development
- Catches bugs at compile time
- Better IDE support
- Self-documenting code
- Essential for large teams
- Autocompletion

### Vite

- Super fast dev server
- Excellent HMR
- Built-in optimizations
- Great DX

### pnpm

- Faster than npm/yarn
- Better disk space usage
- Stricter dependency resolution
- Works great with monorepos

## 🐛 Common Issues

- **Port conflicts**: If 5173 is taken, Vite will automatically use the next available port
- **Type errors**: Run `pnpm type-check` to see all TypeScript issues
- **Test failures**: Make sure you're running the latest Node.js version

---