# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**DevElevate** is a full-stack AI-powered smart education and career advancement platform built with React TypeScript frontend and Node.js Express backend. The platform provides learning resources, AI chatbot assistance, resume building, placement preparation, and community features for students and developers.

**Key Features:**
- Role-based authentication (User/Admin)  
- AI-powered Study Buddy chatbot (GPT-4 integration)
- Learning Hub with courses, quizzes, and progress tracking
- Resume builder with ATS scanning
- Community forum and hackathon management
- Placement preparation tools
- Admin dashboard for content management

## Development Commands

### Frontend (Client) - React + TypeScript + Vite
**Location:** `DevElevate/Client/`

```bash
# Development server
cd DevElevate/Client
npm run dev          # Starts dev server on http://localhost:5173

# Build and deployment
npm run build        # Production build
npm run preview      # Preview production build locally

# Code quality
npm run lint         # ESLint check
```

### Backend (Server) - Node.js + Express
**Location:** `DevElevate/Server/`

```bash
# Development server
cd DevElevate/Server
npm run dev          # Start with nodemon (auto-restart)
npm start            # Start production server
node index.js        # Direct start

# Testing utilities (custom scripts)
node test-admin.js       # Test admin functionalities
node test-hackathon.js   # Test hackathon features
node validate-hackathon.js # Validate hackathon data
```

### Running Full Application
You need TWO terminals running simultaneously:

**Terminal 1 (Backend):**
```bash
cd DevElevate/Server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd DevElevate/Client
npm run dev
```

## High-Level Architecture

### Project Structure
```
DevElevate/
├── Client/          # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # UI components organized by feature
│   │   ├── contexts/        # React Context providers (Auth, Global, Admin)
│   │   ├── api/            # API client and axios instances
│   │   ├── pages/          # Page-level components
│   │   └── app/            # Redux store and routing
│   └── package.json
└── Server/          # Node.js Express backend
    ├── routes/              # API route definitions
    ├── controller/          # Business logic controllers
    ├── model/              # Mongoose schemas/models
    ├── middleware/         # Authentication & authorization
    ├── config/             # Database connection
    └── package.json
```

### Authentication & Authorization Architecture

**Role-Based Access Control:**
- **Users:** Access learning platform, dashboard, community features
- **Admins:** Full platform management through dedicated admin dashboard

**Authentication Flow:**
1. JWT tokens stored in cookies and localStorage
2. `authenticateToken` middleware validates JWT on protected routes
3. `authorize()` middleware checks role-based permissions
4. `ProtectedRoute` component handles frontend route protection
5. Automatic role-based redirects (admins → `/admin`, users → `/dashboard`)

**Key Files:**
- `Server/middleware/authMiddleware.js` - JWT validation
- `Server/middleware/authorize.js` - Role-based authorization
- `Client/components/Auth/ProtectedRoute.tsx` - Frontend route guards

### Database Architecture

**Database:** MongoDB Atlas with Mongoose ODM

**Key Models:**
- `UserModel.js` - User accounts with role field ("user"/"admin")
- `Course.js` - Learning content and courses
- `Quiz.js` + `QuizAttempt.js` - Assessment system
- `Question.js` + `Answer.js` - Community forum
- `Hackathon.js` + `HackathonSubmission.js` - Competition platform
- `Progress.js` - Learning progress tracking
- `Notification.js` - System notifications

### API Architecture

**RESTful API Structure:** `/api/v1/{resource}`

**Main Route Groups:**
- `/api/v1/` - User authentication & profile
- `/api/v1/admin/` - Admin dashboard and management
- `/api/v1/admin/courses/` - Course management
- `/api/v1/admin/quiz/` - Quiz management
- `/api/v1/quiz/` - User quiz interactions
- `/api/v1/community/` - Forum questions/answers
- `/api/v1/hackathons/` - Hackathon platform
- `/api/v1/ats/` - Resume ATS scanning
- `/api/v1/learning/java/` - Learning content
- `/api/v1/placements/` - Placement resources
- `/api/v1/notifications/` - System notifications

### Frontend Architecture

**State Management:**
- React Context API for global state (AuthContext, GlobalContext, AdminContext)
- Redux Toolkit for complex state management (`app/store.ts`)
- Custom hooks for API interactions

**Component Organization:**
- Feature-based folder structure (Admin/, Auth/, Dashboard/, etc.)
- Reusable UI components with TypeScript interfaces
- Protected routing with role-based access control

**Key Technologies:**
- **UI Framework:** React with TypeScript
- **Styling:** Tailwind CSS + Shadcn UI components
- **Build Tool:** Vite
- **Routing:** React Router v7
- **HTTP Client:** Axios with custom instance
- **Charts:** Recharts for analytics
- **Code Editor:** Monaco Editor integration
- **Animations:** Framer Motion

## Development Practices

### Environment Setup
- Node.js ≥ 16 required
- MongoDB Atlas connection via `MONGO_URI` environment variable
- Frontend URL configured via `FRONTEND_URL` for CORS
- JWT secret in `JWT_SECRET` environment variable

### Code Organization Patterns
- **Controllers:** Business logic separated from routes
- **Middleware:** Reusable authentication, authorization, and rate limiting
- **Models:** Mongoose schemas with proper validation and relationships
- **API Clients:** Centralized axios instances with interceptors
- **Context Providers:** Global state management for auth and app state

### Security Features
- JWT authentication with role-based access control
- Rate limiting middleware on all API routes
- CORS configuration for frontend/backend communication
- Password hashing with bcryptjs
- Protected routes on both frontend and backend
- Input validation with Zod schemas

### Key Development Notes
- **Strict Contribution Rules:** Do not modify existing authentication/core logic without permission
- **Role Separation:** Admins and users have completely separate UIs and workflows
- **Database Connection:** Server works without MongoDB for PDF-only features
- **CORS Configuration:** Frontend must match `FRONTEND_URL` environment variable
- **Development Mode:** Both client and server must run simultaneously for full functionality

## Testing Hackathons and Features

The project includes several test utilities:
- `Server/test-admin.js` - Test admin dashboard features
- `Server/test-hackathon.js` - Test hackathon creation and management
- `Server/validate-hackathon.js` - Validate hackathon data integrity
- `Server/create-test-logs.js` - Generate test data for development

## Common Development Tasks

### Adding New Features
1. Create appropriate model in `Server/model/` if database storage needed
2. Implement controller logic in `Server/controller/`
3. Define routes in `Server/routes/`
4. Add frontend components in `Client/src/components/`
5. Update routing in `Client/src/App.tsx`
6. Add proper authentication/authorization middleware

### Working with Authentication
- All protected routes require `authenticateToken` middleware
- Use `authorize("admin")` for admin-only routes
- Frontend components should check `useAuth()` hook for user state
- Admin features are completely separated from user features

### Database Operations
- Use existing Mongoose models in `Server/model/`
- All models include timestamps and proper validation
- User model includes role field for access control
- Progress tracking built into user learning journey

This architecture supports the project's vision as an AI-powered education platform while maintaining clear separation between user and admin functionalities.
