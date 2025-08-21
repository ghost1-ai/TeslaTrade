# Overview

This is a Tesla-themed trading platform application built with React and Express.js. The application provides a cryptocurrency/stock trading interface with user authentication, portfolio management, account verification features, and live trading charts. The platform includes a tiered membership system (Bronze, Silver, Gold, Platinum, Diamond) with different feature sets and benefits for each tier.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: React Context API for authentication and user data, TanStack Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom Tesla-themed design system
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

## Backend Architecture
- **Runtime**: Node.js with TypeScript using tsx for development
- **Framework**: Express.js with RESTful API design
- **Build System**: esbuild for production bundling
- **Development**: Vite middleware integration for hot module replacement
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage class)

## Authentication & User Management
- **Authentication Provider**: Firebase Authentication for user login/registration
- **User Data**: Firebase Realtime Database for user profiles, portfolios, transactions, and notifications
- **Session Management**: Firebase handles authentication state persistence
- **Authorization**: Client-side route protection based on authentication status

## Data Storage Solutions
- **Primary Database**: Firebase Realtime Database for real-time data synchronization
- **File Storage**: Firebase Storage for document uploads (ID verification, payment screenshots)
- **Database Schema**: Zod schemas for type safety and validation across shared types
- **Local Storage**: In-memory storage abstraction for potential future database migration

## Trading & Financial Features
- **Charts**: TradingView widgets for live market data and advanced charting
- **Portfolio Tracking**: Real-time portfolio updates with profit/loss calculations
- **Transaction System**: Deposit/withdrawal workflow with approval processes
- **Tier System**: Multi-tier membership with feature gating (Bronze to Diamond)
- **Verification System**: KYC document upload and verification workflow

## UI/UX Design System
- **Design Language**: Tesla-inspired dark theme with red accent colors
- **Component Library**: Comprehensive UI components with consistent styling
- **Responsive Design**: Mobile-first responsive layouts using Tailwind breakpoints
- **Accessibility**: ARIA-compliant components from Radix UI primitives
- **Toast Notifications**: User feedback system for actions and errors

# External Dependencies

## Core Infrastructure
- **Firebase Suite**: Authentication, Realtime Database, and Storage for complete backend services
- **Vite**: Development server and build tool with HMR and plugin ecosystem
- **Express.js**: HTTP server framework for API endpoints and static file serving

## Trading & Financial Data
- **TradingView**: Embedded widgets for live market charts and financial data
- **Chatway**: Customer support chat widget integration

## UI & Styling
- **Radix UI**: Unstyled, accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component library based on Radix UI

## Development Tools
- **TypeScript**: Static type checking across the entire codebase
- **Zod**: Runtime type validation and schema definitions
- **React Hook Form**: Form state management and validation
- **TanStack Query**: Server state management and data fetching

## Build & Deployment
- **esbuild**: Fast JavaScript/TypeScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration
- **Replit**: Development environment with specialized plugins and error handling