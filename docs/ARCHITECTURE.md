# System Architecture

## Overview
BlueSpring is an Inventory & Order Management System with three main components:
1. Public-facing website
2. Admin inventory dashboard
3. Mobile app for customers

All three components share a common backend API that connects to a Supabase database.

## System Components

### Website (Public-Facing)
- **Purpose**: Marketing, product catalog, and customer information
- **Responsibilities**: Display products, company information, and allow customers to browse
- **Dependencies**: Backend API, Supabase
- **Technologies**: Next.js, Tailwind CSS, ShadCN UI

### Dashboard (Admin Panel)
- **Purpose**: Inventory and order management for administrators
- **Responsibilities**: Manage products, orders, customers, and business operations
- **Dependencies**: Backend API, Supabase
- **Technologies**: Next.js, Tailwind CSS, ShadCN UI, TanStack Table

### Mobile App
- **Purpose**: Customer-facing app for ordering and delivery tracking
- **Responsibilities**: Allow customers to browse products, place orders, and track deliveries
- **Dependencies**: Backend API, Supabase
- **Technologies**: React Native (Expo), Redux

### Backend API
- **Purpose**: Central data management and business logic
- **Responsibilities**: Handle data operations, authentication, and business rules
- **Dependencies**: Supabase
- **Technologies**: Express.js, Node.js

## File Structure
```
BlueSpring/
├── docs/                           # Project documentation
│   ├── PRD.md
│   ├── ROADMAP.md
│   ├── ARCHITECTURE.md
│   └── ...
│
├── website/                        # Public-facing website (Next.js)
│   ├── public/                     # Static assets
│   │   ├── images/
│   │   │   └── favicon.ico
│   │   ├── src/
│   │   │   ├── app/                    # Next.js App Router
│   │   │   │   ├── about/              # About page
│   │   │   │   ├── contact/            # Contact page
│   │   │   │   ├── products/           # Product catalog
│   │   │   │   ├── services/           # Services offered
│   │   │   │   ├── blog/               # Blog/news section
│   │   │   │   ├── layout.tsx          # Root layout
│   │   │   │   └── page.tsx            # Home page
│   │   │   ├── components/             # Reusable components
│   │   │   │   ├── ui/                 # UI components
│   │   │   │   ├── layout/             # Layout components
│   │   │   │   │   ├── Navbar.tsx
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   └── Hero.tsx
│   │   │   │   └── sections/           # Page sections
│   │   │   ├── lib/                    # Utility functions
│   │   │   └── styles/                 # Global styles
│   │   ├── .env.local                  # Environment variables
│   │   ├── next.config.js              # Next.js configuration
│   │   ├── tailwind.config.js          # Tailwind CSS configuration
│   │   └── package.json                # Dependencies
│   ├── .env.local                  # Environment variables
│   ├── next.config.js              # Next.js configuration
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   └── package.json                # Dependencies
│
├── dashboard/                      # Admin inventory dashboard (Next.js)
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── app/                    # Next.js App Router
│   │   │   ├── (auth)/             # Authentication routes
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── (dashboard)/        # Protected dashboard routes
│   │   │   │   ├── orders/
│   │   │   │   ├── inventory/
│   │   │   │   ├── customers/
│   │   │   │   ├── reports/
│   │   │   │   ├── delivery/
│   │   │   │   ├── users/
│   │   │   │   ├── invoices/
│   │   │   │   ├── expenses/
│   │   │   │   └── settings/
│   │   │   ├── layout.tsx          # Root layout
│   │   │   └── page.tsx            # Dashboard home
│   │   ├── components/             # Reusable components
│   │   │   ├── ui/                 # UI components
│   │   │   ├── layout/             # Layout components
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── orders/             # Order-specific components
│   │   │   ├── inventory/          # Inventory-specific components
│   │   │   └── ...                 # Other feature-specific components
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lib/                    # Utility functions
│   │   │   ├── api.ts              # API client
│   │   │   ├── auth.ts             # Authentication utilities
│   │   │   └── utils.ts            # General utilities
│   │   ├── types/                  # TypeScript type definitions
│   │   └── styles/                 # Global styles
│   ├── .env.local                  # Environment variables
│   ├── next.config.js              # Next.js configuration
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   └── package.json                # Dependencies
│
├── backend/                        # Express.js API (serves both website & dashboard)
│   ├── src/
│   │   ├── controllers/            # Request handlers
│   │   │   ├── orderController.js
│   │   │   ├── inventoryController.js
│   │   │   └── ...
│   │   ├── routes/                 # API routes
│   │   │   ├── orderRoutes.js
│   │   │   ├── inventoryRoutes.js
│   │   │   └── ...
│   │   ├── middleware/             # Custom middleware
│   │   │   ├── auth.js
│   │   │   ├── error.js
│   │   │   └── ...
│   │   ├── models/                 # Data models
│   │   ├── services/               # Business logic
│   │   ├── utils/                  # Utility functions
│   │   ├── config/                 # Configuration files
│   │   └── index.js                # Entry point
│   ├── .env                        # Environment variables
│   └── package.json                # Dependencies
│
├── mobile-app/                     # React Native (Expo) mobile app
│   ├── src/
│   │   ├── screens/                # App screens
│   │   │   ├── auth/               # Authentication screens
│   │   │   ├── home/               # Home screen
│   │   │   ├── orders/             # Order-related screens
│   │   │   ├── products/           # Product catalog screens
│   │   │   └── profile/            # User profile screens
│   │   ├── components/             # Reusable components
│   │   ├── navigation/             # Navigation configuration
│   │   │   ├── AppNavigator.js
│   │   │   ├── AuthNavigator.js
│   │   │   └── index.js
│   │   ├── services/               # API services
│   │   ├── store/                  # State management (Redux)
│   │   ├── hooks/                  # Custom hooks
│   │   ├── utils/                  # Utility functions
│   │   └── theme/                  # Styling and theming
│   ├── assets/                     # Static assets
│   ├── App.js                      # Entry point
│   ├── app.json                    # Expo configuration
│   └── package.json                # Dependencies
```

## Data Flow
The system uses a centralized data architecture with Supabase as the primary database. All components (website, dashboard, and mobile app) communicate with the backend API, which interacts with Supabase.

### Real-Time Data Sharing
For real-time updates (e.g., inventory changes when products are purchased):

1. **Supabase Realtime** is used for subscribing to database changes
2. All clients (dashboard, website, mobile) can subscribe to relevant tables
3. When data changes (e.g., new order), all subscribed clients receive updates
4. UIs update automatically to reflect the latest data

This ensures that inventory levels, order statuses, and other critical data stay synchronized across all platforms in real-time.

## Technology Stack
### Frontend (Website & Dashboard)
- Next.js (React framework)
- Tailwind CSS (styling)
- ShadCN UI (component library)
- TanStack Table (for data tables)
- Zustand/React Query (state management)

### Backend
- Express.js (API framework)
- Node.js (runtime)
- Supabase (PostgreSQL database)
- Supabase Auth (authentication)
- Supabase Storage (file storage)

### Mobile App
- React Native (Expo)
- React Navigation
- Redux Toolkit
- React Query

## Security Architecture
- JWT-based authentication via Supabase Auth
- Role-based access control
- API route protection with middleware
- HTTPS for all communications
- Secure environment variables

## Deployment Architecture
- Website & Dashboard: Vercel
- Backend API: AWS/Digital Ocean
- Mobile App: App Store & Google Play
- Database: Supabase Cloud

## Performance Considerations
- Server-side rendering for SEO (website)
- Static generation for marketing pages
- Client-side rendering for dynamic dashboard
- Optimistic UI updates for better UX
- Efficient data fetching with React Query
- Pagination for large data sets

## Monitoring and Logging
- Error tracking with Sentry
- Performance monitoring with Vercel Analytics
- API logging with Winston
- Database query performance monitoring 