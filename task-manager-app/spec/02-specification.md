# SPECIFICATION

## USER STORIES
As a user, I want to:
1. Quickly add a new task with title, description, priority, and deadline
2. View all my tasks in a clean, organized list
3. Edit any task details when plans change
4. Delete tasks I no longer need
5. Mark tasks as complete when finished
6. Unmark completed tasks if needed
7. Filter my view to see all, active, or completed tasks only
8. Sort tasks by priority, deadline, or creation date
9. See clear visual indicators for task priority levels
10. Know which tasks are overdue or due soon
11. Have all my tasks automatically saved and loaded
12. Use the app seamlessly on my phone, tablet, or computer

## CORE FEATURES

### 1. TASK MANAGEMENT
- Create task with title (required), description (optional), priority, deadline (optional)
- Edit any task field
- Delete task with confirmation dialog
- Toggle task completion status
- Auto-generate unique ID and timestamps for each task

### 2. TASK DISPLAY
- List view showing all tasks
- Display: title, description (truncated if long), priority badge, deadline, completion status
- Color-coded priority badges (high=red, medium=yellow, low=green)
- Format deadline as "Today", "Tomorrow", "Jan 20", or "Overdue"
- Strikethrough completed tasks
- Show empty state when no tasks

### 3. FILTERING & SORTING
- Filter by status: All / Active / Completed
- Sort by: Priority / Deadline / Date Created
- Combine filters and sorts
- Persist filter/sort preferences in localStorage

### 4. DATA PERSISTENCE
- Store all tasks in browser localStorage
- Auto-save on every change
- Load tasks on app startup
- Handle localStorage errors gracefully

## DATA MODEL

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  deadline?: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type FilterStatus = 'all' | 'active' | 'completed';
type SortOption = 'priority' | 'deadline' | 'createdAt';

## VALIDATION RULES
- Title: Required, 1-100 characters, trim whitespace
- Description: Optional, max 500 characters
- Priority: Must be 'high', 'medium', or 'low'
- Deadline: Must be valid date (can be in past for overdue indication)
- ID: Must be unique UUID v4

## UI/UX REQUIREMENTS
- Modern, bold design with strong visual hierarchy
- Gradient accents and vibrant colors for priority badges
- Smooth animations: fade-in on add, slide-out on delete, bounce on checkbox, pulse on Add button
- Glassmorphism effects on cards (semi-transparent backgrounds, backdrop blur)
- Bold typography with clear hierarchy
- Shadows and depth for cards and buttons
- Hover states with elevation changes
- Color palette:
  - High priority: Bold red gradient (#EF4444 to #DC2626)
  - Medium priority: Amber gradient (#F59E0B to #D97706)
  - Low priority: Green gradient (#10B981 to #059669)
  - Background: Clean white or light gray
  - CTAs: Bold red (#EF4444) with hover darkening to #DC2626
- Mobile-first responsive design (320px to 2560px width)
- Accessible keyboard navigation