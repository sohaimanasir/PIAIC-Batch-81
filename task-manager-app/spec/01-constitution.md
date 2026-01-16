# CONSTITUTION

## PROJECT OVERVIEW
We're building a simple, efficient task manager app that helps users organize their tasks with a clean, intuitive interface.

## CORE FEATURES
1. Create, read, update, and delete tasks
2. Task properties: title, description, priority (high/medium/low), deadline, status (active/completed)
3. Filter tasks by status (all/active/completed)
4. Sort tasks by priority, deadline, or creation date
5. Visual priority indicators with color coding
6. Data persistence between sessions

## TECH STACK
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- State Management: React Context API
- Data Storage: Browser localStorage (no backend)
- Icons: Lucide React
- Utilities: date-fns (date formatting), uuid (unique IDs)

## GUIDING PRINCIPLES
1. Simplicity First - Clean, uncluttered UI, intuitive UX
2. Privacy-First - All data stored locally in browser
3. Performance - Fast page loads, smooth animations
4. Code Quality - Modular, reusable components, type-safe with TypeScript, clear separation of concerns
5. Accessibility - Keyboard navigation, ARIA labels
6. Mobile-First Design - Responsive on all devices

## CODE STANDARDS
- Use functional components with React hooks
- Use TypeScript strict mode (no 'any' types)
- Follow ESLint rules
- Implement proper error handling with try-catch
- Use Tailwind utility classes (avoid custom CSS)
- Keep components under 200 lines

## PROJECT STRUCTURE
/app - Main application pages
/components - Reusable UI components
/lib - TypeScript types, localStorage utilities, helper functions
/context - Global state management

## OUT OF SCOPE FOR V1
- User authentication/login
- Backend API or database
- AI-powered features
- Task categories or tags
- Recurring tasks
- Dark mode