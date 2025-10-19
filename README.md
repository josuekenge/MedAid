# MedAid - Home Healthcare Coordination Platform

A production-ready web application for coordinating nurses who provide in-home patient care. Built with Next.js 15, TypeScript, and modern web technologies.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd medaid
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Setup

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or run in production mode
docker-compose --profile production up --build
```

## 🏗️ Tech Stack

- **Framework:** Next.js 15.5.4 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom design system
- **State Management:** Zustand for client state, TanStack Query for server state
- **UI Components:** Custom components with Radix UI primitives
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Forms:** React Hook Form with Zod validation
- **Testing:** Vitest with React Testing Library
- **Code Quality:** ESLint, Prettier, Husky, Commitlint
- **Analytics:** Google Analytics 4
- **Deployment:** Docker with multi-stage builds

## 📁 Project Structure

```
medaid/
├── src/                          # Source code (organized structure)
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/               # Authentication routes
│   │   │   ├── login/            # Login page
│   │   │   └── register/         # Registration page
│   │   ├── (dashboard)/          # Protected dashboard routes
│   │   │   ├── dashboard/        # Main dashboard
│   │   │   ├── patients/         # Patient management
│   │   │   ├── nurses/           # Nurse management
│   │   │   ├── visits/           # Visit scheduling & tracking
│   │   │   ├── billing/          # Billing & invoicing
│   │   │   ├── incidents/        # Incident reporting
│   │   │   ├── services/         # Service catalog
│   │   │   ├── schedule/         # Calendar scheduling
│   │   │   ├── certifications/   # Certification management
│   │   │   ├── settings/         # App settings
│   │   │   └── layout.tsx        # Dashboard layout
│   │   ├── (public)/             # Public routes
│   │   │   ├── landing/          # Marketing landing page
│   │   │   └── about/            # About page
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page (redirects to dashboard)
│   ├── components/               # Reusable components
│   │   ├── ui/                   # Base UI components (Button, Card, etc.)
│   │   ├── forms/                # Form components (PatientForm, etc.)
│   │   ├── layout/               # Layout components (Sidebar, Topbar)
│   │   ├── features/             # Feature-specific components
│   │   ├── common/               # Common shared components
│   │   └── providers/            # Context providers
│   ├── lib/                      # Utility libraries
│   │   └── utils.ts              # General utilities
│   ├── services/                 # API and data services
│   │   ├── api/                  # API client and endpoints
│   │   │   ├── client.ts         # Base API client
│   │   │   ├── patients.ts       # Patient API calls
│   │   │   ├── nurses.ts         # Nurse API calls
│   │   │   └── visits.ts         # Visit API calls
│   │   ├── mock/                 # Mock data services
│   │   ├── auth/                 # Authentication services
│   │   └── billing/              # Billing services
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts              # All type definitions
│   ├── constants/                # Application constants
│   │   └── index.ts              # Configuration and constants
│   ├── hooks/                    # Custom React hooks
│   ├── utils/                    # Utility functions
│   └── config/                   # Configuration files
├── components/                   # Legacy components (to be migrated)
├── lib/                          # Legacy utilities (to be migrated)
├── services/                     # Legacy services (to be migrated)
├── store/                        # Zustand stores
│   ├── theme-store.ts            # Theme management
│   ├── session-store.ts          # Authentication state
│   ├── layout-store.ts           # UI layout state
│   └── filters-store.ts          # Filter state
├── tests/                        # Test files
│   ├── setup.ts                  # Test setup
│   └── billing.test.ts           # Billing logic tests
├── public/                       # Static assets
├── Dockerfile                    # Docker configuration
├── docker-compose.yml            # Docker Compose setup
└── README.md                     # This file
```

### 🏗️ Architecture Overview

The project follows a **clean, organized structure** with clear separation of concerns:

- **`src/app/`** - Next.js 13+ App Router with route groups for organization
- **`src/components/`** - Reusable UI components organized by category
- **`src/services/`** - API clients and data services for backend integration
- **`src/types/`** - Comprehensive TypeScript type definitions
- **`src/constants/`** - Application configuration and constants
- **`src/lib/`** - Utility functions and helper libraries

### 📂 Key Directories

- **`(auth)/`** - Authentication pages (login, register)
- **`(dashboard)/`** - Protected dashboard pages with sidebar navigation
- **`(public)/`** - Public marketing pages
- **`ui/`** - Base UI components (Button, Card, Modal, etc.)
- **`forms/`** - Form components for data entry
- **`api/`** - API service layer ready for backend integration

## 🎯 Features

### Core Functionality
- **Patient Management:** Complete patient profiles with medical history, allergies, and emergency contacts
- **Nurse Coordination:** Nurse profiles, specialties, availability, and location tracking
- **Visit Scheduling:** Smart scheduling with time windows, nurse assignment, and conflict detection
- **Care Plans:** Structured care plans with tasks, medications, and goals
- **Real-time Tracking:** Visit status updates, check-in/check-out with GPS
- **Billing Management:** Automated billing with surcharges, deposits, and payment tracking

### Service Catalog
- **General Checkup:** $120 CAD (30-60 min)
- **Medication Management:** $70 CAD (20-40 min)
- **Physical Therapy:** $140 CAD (45-60 min)
- **Elder Care:** $110 CAD (60-90 min)
- **Blood Test:** $100 CAD (50-60 min)

### Billing Features
- Base pricing from service catalog
- Time tracking (rounded to nearest 5 minutes)
- Mileage calculation
- Surcharges: After hours (10%), Urgent (15%), Combined (26.5%)
- Deposit management (default 50%)
- Cancellation fees ($40 within 2 hours)

### User Roles
- **Admin:** Full system access and settings
- **Coordinator:** Patient/nurse management, scheduling, billing
- **Nurse:** Visit management, check-in/out, care tasks
- **Viewer:** Read-only access to patient information

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm run test billing.test.ts
```

## 📊 Demo Walkthrough Script

Here's a 2-minute walkthrough script for demonstrating the MedAid application:

### 1. Landing Page (30 seconds)
- "Welcome to MedAid, our home healthcare coordination platform"
- "Notice the clean, medical-themed design with our blue and white branding"
- "Here we showcase our five core services with transparent CAD pricing"
- "The landing page includes features, testimonials, and FAQ sections"
- "Let's sign in to see the application"

### 2. Authentication (15 seconds)
- "We have a simple sign-in form with demo login options"
- "I'll use the coordinator demo to show the full functionality"
- "Notice the role-based access - different users see different features"

### 3. Dashboard Overview (30 seconds)
- "This is the coordinator dashboard with key metrics"
- "We can see total patients, active nurses, visits today, and open incidents"
- "The dashboard shows today's visits in a clean card layout"
- "Recent incidents are displayed with severity indicators"
- "Active nurses are shown with their specialties and online status"

### 4. Services Page (20 seconds)
- "Here's our service catalog with all five services"
- "Each service shows the base price, duration, and description"
- "Notice the pricing is in CAD as specified"
- "Services include General Checkup, Medication Management, Physical Therapy, Elder Care, and Blood Testing"

### 5. Visits Kanban Board (25 seconds)
- "This is our visits management with a Kanban board layout"
- "Visits flow through: Requested → Scheduled → En Route → In Progress → Completed"
- "Each card shows patient name, time window, nurse assignment, and status"
- "We can filter by status and search for specific visits"
- "The system tracks urgent and after-hours visits with special badges"

### 6. Billing Management (20 seconds)
- "The billing page shows revenue summary and invoice management"
- "We can see total revenue, paid amounts, and pending payments"
- "Each billing item shows service details, visit information, and payment status"
- "The system automatically calculates surcharges and deposits"

### 7. Mobile Responsiveness (10 seconds)
- "The entire application is fully responsive"
- "Nurses can use it on mobile devices for check-in/check-out"
- "The interface adapts beautifully to different screen sizes"

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage

# Git Hooks
npm run commit       # Use commitizen for conventional commits
```

### Code Quality

The project uses several tools to maintain code quality:

- **ESLint:** Code linting with Next.js, React, and TypeScript rules
- **Prettier:** Code formatting with Tailwind CSS plugin
- **Husky:** Git hooks for pre-commit checks
- **Commitlint:** Conventional commit message validation
- **TypeScript:** Static type checking

### Environment Variables

```bash
# App Configuration
NEXT_PUBLIC_APP_NAME=MedAid
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Analytics
NEXT_PUBLIC_GA4_ID=your_ga4_id

# Database (for future use)
DATABASE_URL=your_database_url

# Security
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

## 🚀 Deployment

### Docker Deployment

```bash
# Build the Docker image
docker build -t medaid .

# Run the container
docker run -p 3000:3000 medaid

# Or use Docker Compose
docker-compose up --build
```

### Production Considerations

- Set up proper environment variables
- Configure a reverse proxy (nginx) for production
- Set up SSL certificates
- Configure monitoring and logging
- Set up database for production use
- Configure proper backup strategies

## 🔒 Security Features

- **Secure Headers:** X-Frame-Options, CSP, HSTS, and more
- **Input Validation:** Zod schemas for all data validation
- **Authentication:** Role-based access control
- **Data Protection:** No real PHI stored in demo version
- **Audit Logging:** Track all data changes
- **HTTPS Ready:** Production-ready security configuration

## 📈 Performance

- **Next.js 15:** Latest framework with App Router
- **Turbopack:** Fast development builds
- **Image Optimization:** Next.js Image component
- **Code Splitting:** Dynamic imports for heavy components
- **Caching:** TanStack Query for efficient data fetching
- **Bundle Analysis:** Optimized production builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`npm run commit`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- Real-time notifications with WebSockets
- Advanced reporting and analytics
- Mobile app for nurses
- Integration with EMR systems
- AI-powered scheduling optimization
- Video consultation features
- Multi-language support

---

**Note:** This is a demo application. In production, ensure proper security measures, database setup, and compliance with healthcare regulations (HIPAA, PIPEDA, etc.).





