# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Vue.js admin dashboard project built with Vue 3, TypeScript, and Vite. It's a monorepo using pnpm workspaces and Turbo for build orchestration. The project implements the yudao (芋道) admin system with comprehensive business modules.

## Technology Stack

- **Frontend**: Vue 3.5.17, TypeScript 5.8.3, Vite 6.3.5
- **UI Framework**: Ant Design Vue 4.2.6 (primary), Element Plus 2.9.7, Naive UI 2.42.0
- **State Management**: Pinia 3.0.3
- **Routing**: Vue Router 4.5.1
- **Styling**: Tailwind CSS 3.4.17, SCSS
- **Build Tools**: Turbo 2.5.4, pnpm 10.12.4
- **Testing**: Vitest, Playwright

## Project Structure

### Monorepo Layout

```
├── apps/                     # Main applications
│   └── web-antd/            # Ant Design Vue version (main app)
├── packages/                # Shared packages
│   ├── @core/              # Core framework packages
│   │   ├── base/          # Base utilities and design tokens
│   │   ├── composables/   # Vue composables
│   │   ├── ui-kit/        # UI components (form, layout, menu, etc.)
│   │   └── typings/       # TypeScript definitions
│   ├── effects/           # Feature packages (auth, layouts, request, etc.)
│   ├── icons/             # Icon components
│   ├── locales/           # Internationalization
│   └── styles/            # Global styles
├── internal/              # Internal tooling and configs
└── docs/                  # Documentation site
```

### Key Directories

- **apps/web-antd/src/**: Main application code
  - **api/**: API service modules organized by business domain
  - **views/**: Page components organized by business modules
  - **components/**: Reusable Vue components
  - **router/**: Vue Router configuration
  - **store/**: Pinia store modules

## Development Commands

### Installation & Setup

```bash
pnpm install          # Install dependencies (requires pnpm >= 9.12.0)
```

### Development

```bash
pnpm dev              # Start all development servers
pnpm dev:antd         # Start Ant Design Vue version only
pnpm dev:docs         # Start documentation site
```

### Building

```bash
pnpm build            # Build all packages and apps
pnpm build:antd       # Build Ant Design Vue version only
pnpm build:docs       # Build documentation
```

### Testing & Quality

```bash
pnpm test:unit        # Run unit tests with Vitest
pnpm test:e2e         # Run end-to-end tests with Playwright
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript type checking
pnpm check            # Run all checks (circular deps, deps, types, spell)
```

### Code Quality

```bash
pnpm format           # Format code with Prettier
pnpm clean            # Clean build artifacts and node_modules
pnpm reinstall        # Clean reinstall
```

## Business Modules

The system includes comprehensive business modules organized under:

- **System Management**: User, role, menu, dept, post, dict, config management
- **Infrastructure**: Code generation, file management, job scheduling, API logs
- **Workflow**: BPM process management with dual designers (BPMN + Simple)
- **CRM**: Customer relationship management
- **Mall**: E-commerce system
- **ERP**: Enterprise resource planning
- **AI**: AI chat, image generation, workflow automation
- **Pay**: Payment system integration
- **MP**: WeChat Mini Program management

## Configuration Files

- **vite.config.mts**: Vite configuration for web-antd
- **tsconfig.json**: TypeScript configuration
- **tailwind.config.mjs**: Tailwind CSS configuration
- **eslint.config.mjs**: ESLint configuration
- **lefthook.yml**: Git hooks configuration

## Architecture Patterns

- **Monorepo**: Uses pnpm workspaces with Turbo for efficient builds
- **Modular Design**: Business logic separated into domain-specific packages
- **API-First**: RESTful API integration with axios-based client
- **Permission-Based**: Role-based access control with dynamic routing
- **Multi-Theme**: Support for multiple UI frameworks (Ant Design Vue, Element Plus, Naive UI)
- **Internationalization**: Full i18n support with Chinese as primary language

## Environment Requirements

- Node.js >= 20.10.0
- pnpm >= 9.12.0 (enforced via packageManager field)
- Modern browser support (ES2020+)

## Development Workflow

1. Clone repository
2. Run `pnpm install` to install dependencies
3. Run `pnpm dev:antd` to start development server
4. Access at http://localhost:5555 (default port)
5. Use `pnpm check` before committing changes
