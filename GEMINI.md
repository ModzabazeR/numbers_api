# GEMINI.md - Numbers API

## Project Overview

Numbers API is an open-source project that provides interesting and fun facts about numbers across four categories: **trivia**, **math**, **date**, and **year**. It offers both a RESTful API and a GraphQL API, backed by a large collection of facts stored in normalized text files.

### Key Technologies

- **Backend:** Node.js, Express (REST API), Apollo Server (@apollo/server) (GraphQL)
- **Templating:** Nunjucks (for the home page)
- **Styling:** SASS (compiled via `sass` - Dart Sass)
- **Utilities:** Underscore.js, Marked (for rendering README), DOMPurify (for sanitization)
- **Testing:** Jest, Supertest
- **Dev Tools:** Nodemon, Prettier, Husky, Lint-staged

## Architecture

- **`server.js` / `app.js`**: Main entry point for the REST API (Default Port: 8124).
- **`graphql/index.js`**: Main entry point for the GraphQL API (Default Port: 3001).
- **`routes/numbers.js`**: Defines REST API endpoints for single numbers, ranges, and random facts.
- **`models/fact.js`**: The core logic for retrieving and formatting facts based on requested type and options (fragment, notfound, etc.).
- **`models/data.js`**: Responsible for loading, parsing, and normalizing data from the `models/` directory.
- **`models/`**: Contains raw and normalized data files organized by category (`date`, `math`, `trivia`, `year`).

## Building and Running

### Prerequisites

- Node.js (v22 or later recommended)
- npm

### Setup

```bash
npm install
npm run scss  # Compile SASS styles
```

### Running Servers

- **REST API**: `npm start` (Runs on `http://localhost:8124`)
- **GraphQL API**: `npm run start-graphql` (Runs on `http://localhost:3001/graphql`)
- **Production**: `npm run start-prod` (Uses `forever`)

### Testing

```bash
npm test
```

### Other Scripts

- **Dump Facts**: `npm run dump-facts` - Exports all facts to the `facts-dump/` directory.
- **SASS Compilation**: `npm run scss` - Compiles SASS from `public/sass` to `public/css`.

## Development Conventions

### Data Structure

Facts are stored in `.txt` files within category-specific subdirectories under `models/`.

- `models/*/norm/`: Contains normalized JSON-formatted facts.
- `models/manual/`: Contains manually curated facts in a custom shorthand format.

### API Response Formats

- **Plain Text**: Default for REST API.
- **JSON**: Triggered via `json` query param, `Accept: application/json` header, or `.json` suffix.
- **JSONP**: Triggered via `callback` query param.

### Coding Style

- The project uses **Prettier** for formatting.
- **Husky** and **Lint-staged** are configured to run formatting and tests before commits/pushes.
- Hooks are managed in the `.husky/` directory.
- Adhere to the existing pattern of using **Underscore.js** for data manipulation where consistent with existing code.

### Testing Practices

- **Unit Tests**: Located in `__tests__/unit/`, focusing on `fact.js` logic, data normalization, and schema.
- **Integration Tests**: Located in `__tests__/integration/`, testing the Express app routes and GraphQL queries.
- New features or bug fixes should always include corresponding tests in the relevant directory.
