# AngularJS React-Like Demo

This project explores how to bring a modern, component-driven development
experience to an AngularJS 1.x codebase. It uses Vite to bundle an app that
lives entirely under `public/src`, where a small utilities layer exposes
`defineComponent` and `registerPage` helpers that feel similar to React hooks
while still running on top of AngularJS.

## Project structure

```
public/
  index.html          # Bootstraps the AngularJS application
  src/
    app/              # Root module definition and routing config
    components/       # Reusable UI components implemented with defineComponent()
    filters/          # AngularJS filters (e.g., fullnameFormat)
    pages/            # Route-level pages registered through registerPage()
    services/         # Thin service layer + Axios-based HTTP client
    styles/           # Global SCSS styles
    ui/               # React-like helpers (defineComponent, definePage)
```

Key entry points include:

- `public/src/app/app.module.js` defines the root `app` module and its runtime
  setup, enabling route logging in `app.run.js` and HTML5 mode navigation in
  `app.config.js`.
- `public/src/ui/defineComponent.js` and `public/src/ui/definePage.js` provide
  lightweight `state()` and `effect()` hooks that persist across renders.
- `public/src/main.js` registers all modules, components, filters, services, and
  styles with AngularJS when the bundle loads.

## Implemented pages and features

- **Home** (`pages/Home/Home.page.js`) showcases reusable `<ui-page-header>`,
  `<ui-card>`, and `<ui-counter>` components, plus a manual counter built with
  the hook helpers.
- **Forms** (`pages/Forms/Forms.page.js`) demonstrates form validation,
  masking, and async submission using the custom `httpClient` service.
- **Lists & Details** (`pages/List/List.page.js`, `pages/Details/Details.page.js`)
  render paginated data, use custom filters, and show detail views backed by
  mocked API adapters.
- **URL Params** (`pages/Url/Url.page.js`) reacts to `$route` parameter changes
  via the `effect()` hook, syncing the view with the current path.
- **HTTP** (`pages/Http/Http.page.js`) loads remote users, handling loading and
  error states powered by `ApiService`.

Supporting services include `services/httpClient.js`, which wraps Axios and
injects bearer tokens, `services/Api.service.js` for JSONPlaceholder requests,
and mock-backed services like `CountriesService` and `PeopleServices` for local
prototyping.

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the dev server**

   ```bash
   npm run dev
   ```

   Vite serves the site at the URL shown in the terminal (usually
   `http://localhost:5173`).

3. **Run the test suite**

   ```bash
   npm test
   ```

   Unit tests are written with Jest. Sample specs live alongside components and
   pages (for example `components/Navbar/Navbar.component.test.js` and
   `pages/Home/Home.page.test.js`).

4. **Create a production build**

   ```bash
   npm run build
   ```

   The built assets output to `dist/`, ready to be served by any static host.

## Tooling notes

- **Bundler:** Vite 5 handles modern module syntax while compiling the legacy
  AngularJS code.
- **Styling:** Global styles live in `public/src/styles`, and Bootstrap classes
  are used throughout the markup snippets returned by `defineComponent()` and
  `registerPage()`.
- **Testing:** Jest is configured in `jest.config.cjs`, and Babel transforms ES
  modules for the test environment.

## Further exploration ideas

- Expand the custom hook utilities with memoization or context sharing.
- Replace the mocked adapters in `services/mocks` with live endpoints or a
  local JSON server.
- Add end-to-end tests to cover the full navigation flow across pages.

