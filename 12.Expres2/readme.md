# Challenge Express Products

## Creación de la estructura del proyecto

### Creación de los ficheros de configuración

- .editorconfig
- .env
- .gitignore
- eslint.config.js
- package.json
- tsconfig.json
- vitest.config.ts

### Creación de la estructura de carpetas

- dist
- public (incluyendo favicons)
- src (incluyendo index.ts)

### Dependencias

- Desarrollo
  - typescript / @types/node
  - prettier
  - eslint / @eslint/js / globals / typescript-eslint
  - vitest:
- Finales
  - cross-env
  - debug / @types/debug
  - express / @types/express
  - cors / @types/cors
  - morgan / @types/morgan

### Scripts

- "start": "node dist/index.js",
- "start:dev": "cross-env NODE_ENV=dev DEBUG=demo\* node --watch --env-file=.env ./dist/index.js",
- "build": "tsc -w",
- "test": "vitest run",
- "test:c": "vitest run --coverage",
- "lint": "eslint . --ext .ts"
