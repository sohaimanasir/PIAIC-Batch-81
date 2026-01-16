# TASKS

## SPRINT 1: PROJECT FOUNDATION

### Task 1.1: Initialize Next.js Project
- Run: npx create-next-app@latest . --typescript --tailwind --eslint --app --use-npm
- Start dev server and verify it runs
- Test: localhost:3000 shows default Next.js page

### Task 1.2: Install Dependencies
- Run: npm install lucide-react date-fns uuid
- Run: npm install -D @types/uuid
- Verify all packages in package.json
- Test: npm list shows all packages

### Task 1.3: Create Folder Structure
- Create /components folder
- Create /lib folder
- Create /context folder
- Delete default page.module.css
- Test: Folder structure matches plan

### Task 1.4: Configure Tailwind
- Edit tailwind.config.ts
- Add custom colors for priorities and CTAs
- Add custom animations (fadeIn, slideIn, bounce, pulse)
- Test: Config file has no syntax errors

### Task 1.5: Clean Up Boilerplate
- Clear /app/page.tsx content
- Update /app/layout.tsx metadata (title, description)
- Clear /app/globals.css (keep Tailwind directives)
- Test: Blank page loads without errors

**CHECKPOINT:** Project runs, clean slate ready

## SPRINT 2: DATA LAYER

### Task 2.1: Create Type Definitions
- Create /lib/types.ts
- Define Task interface with all properties
- Define FilterStatus type
- Define SortOption type
- Export all types
- Test: File compiles without TypeScript errors

### Task 2.2: Create Utility Functions
- Create /lib/utils.ts
- Write generateId() using uuid v4
- Write formatDate() using date-fns
- Write isOverdue() date checker
- Write cn() for className merging (optional)
- Test: Import and call functions in console

### Task 2.3: Build localStorage Utilities
- Create /lib/taskStorage.ts
- Write getTasks() - load from localStorage
- Write saveTasks() - save to localStorage
- Write getFilters() and saveFilters()
- Add try-catch error handling
- Test: Save/load data in browser console

### Task 2.4: Create Task Context Structure
- Create /context/TaskContext.tsx
- Add 'use client' directive
- Create TaskContext with createContext
- Create TaskProvider component
- Initialize state: tasks, filter, sort
- Test: No errors, context created

### Task 2.5: Implement addTask Action
- In TaskContext, create addTask function
- Generate new task with ID and timestamps
- Add to tasks array
- Auto-save to localStorage
- Test: Call addTask, verify task added

### Task 2.6: Implement updateTask Action
- Create updateTask function
- Find task by ID and update fields
- Update updatedAt timestamp
- Save to localStorage
- Test: Update task, verify changes persist

### Task 2.7: Implement deleteTask Action
- Create deleteTask function
- Filter out task by ID
- Save to localStorage
- Test: Delete task, verify removed

### Task 2.8: Implement toggleComplete Action
- Create toggleComplete function
- Find task and flip completed boolean
- Update timestamp
- Save to localStorage
- Test: Toggle task status

### Task 2.9: Implement Filter/Sort Logic
- Create computed displayedTasks value
- Apply filter based on completed status
- Apply sort (priority/deadline/createdAt)
- Test: Change filter/sort, verify list updates

### Task 2.10: Create useTask Hook
- Create useTask custom hook
- Call useContext(TaskContext)
- Throw error if used outside Provider
- Export hook
- Test: Use hook in component, access tasks

**CHECKPOINT:** State management works, data persists

## SPRINT 3: CORE UI COMPONENTS

### Task 3.1: Wrap App with TaskProvider
- Edit /app/layout.tsx
- Import TaskProvider
- Wrap children with provider
- Test: No errors, context available

### Task 3.2: Build EmptyState Component
- Create /components/EmptyState.tsx
- Add 'use client' directive
- Accept props: filter, onAddTask
- Display message based on filter
- Add icon from lucide-react
- Add "Add Task" button (red CTA)
- Style with Tailwind
- Test: Render with different filters

### Task 3.3: Build TaskItem Component
- Create /components/TaskItem.tsx
- Add 'use client' directive
- Accept props: task, onEdit, onDelete, onToggle
- Display title (bold, large)
- Display description (truncate if long)
- Add gradient priority badge
- Display formatted deadline with color
- Add completion checkbox
- Add edit button (Pencil icon)
- Add delete button (Trash2 icon)
- Apply glassmorphism card style
- Add hover effects (scale, shadow)
- Strikethrough if completed
- Test: Render with mock task

### Task 3.4: Build TaskList Component
- Create /components/TaskList.tsx
- Add 'use client' directive
- Accept props: tasks, callbacks, filter
- If empty, render EmptyState
- Map through tasks, render TaskItem
- Use responsive grid layout
- Add fade-in animation
- Test: Render with empty and filled arrays

### Task 3.5: Integrate into Main Page
- Edit /app/page.tsx
- Add 'use client' directive
- Import useTask hook
- Get tasks and actions from context
- Render header with app title
- Render TaskList
- Pass all necessary props
- Test: Tasks display in browser

**CHECKPOINT:** Tasks display with modern design

## SPRINT 4: FORMS & CRUD

### Task 4.1: Build ConfirmDialog Component
- Create /components/ConfirmDialog.tsx
- Add 'use client' directive
- Accept props: open, title, message, onConfirm, onCancel
- Create modal overlay with backdrop blur
- Add slide-in animation
- Display title and message
- Add Confirm button (red)
- Add Cancel button (gray)
- Handle Esc key to cancel
- Test: Open/close dialog

### Task 4.2: Build TaskForm Structure
- Create /components/TaskForm.tsx
- Add 'use client' directive
- Accept props: open, mode, task, onSubmit, onCancel
- Create form state (title, description, priority, deadline)
- Create error state
- Pre-populate if editing
- Test: Form renders

### Task 4.3: Add Form Validation
- Validate title (required, 1-100 chars)
- Validate description (max 500 chars)
- Validate deadline (valid date)
- Show inline error messages
- Disable submit if errors
- Test: Trigger validation errors

### Task 4.4: Implement Form Submission
- Handle form submit
- Run validation
- Call onSubmit with data
- Clear form after success
- Close form
- Test: Submit form, data received

### Task 4.5: Style TaskForm
- Modal overlay with blur
- Slide-in animation
- Bold labels and inputs
- Priority selector
- Date picker for deadline
- Red submit button with hover effect
- Responsive layout
- Test: Form looks modern

### Task 4.6: Add "New Task" Button
- Edit /app/page.tsx
- Add "Add Task" button in header
- Style as red CTA with pulse animation
- Open TaskForm on click
- Test: Click opens form

### Task 4.7: Integrate Add Task Flow
- Handle TaskForm submit
- Call addTask from context
- Show success feedback
- Close form
- Test: Add task via form

### Task 4.8: Integrate Edit Task Flow
- Pass onEdit to TaskItem
- Open form in edit mode with task data
- Handle submit, call updateTask
- Test: Edit task via form

### Task 4.9: Integrate Delete Task Flow
- Pass onDelete to TaskItem
- Open ConfirmDialog
- On confirm, call deleteTask
- Add slide-out animation
- Test: Delete with confirmation

**CHECKPOINT:** Full CRUD working with animations

## SPRINT 5: FILTERING & SORTING

### Task 5.1: Build FilterBar Structure
- Create /components/FilterBar.tsx
- Add 'use client' directive
- Accept props: filter, sort, onFilterChange, onSortChange
- Create button group for filters
- Create dropdown for sort
- Test: Component renders

### Task 5.2: Style FilterBar
- All/Active/Completed buttons
- Active state with gradient
- Hover effects
- Sort dropdown with icon
- Responsive layout
- Test: Buttons look modern

### Task 5.3: Implement Filter Logic
- Wire buttons to onFilterChange
- Highlight active filter
- Test: Click filters, callback fires

### Task 5.4: Implement Sort Logic
- Wire dropdown to onSortChange
- Show current sort option
- Test: Change sort, callback fires

### Task 5.5: Integrate FilterBar into Page
- Add FilterBar to /app/page.tsx
- Get filter/sort from context
- Pass change handlers
- Position between header and list
- Test: FilterBar functional

### Task 5.6: Persist Filter/Sort Preferences
- In TaskContext, save filter/sort to localStorage
- Load on init
- Test: Refresh page, preferences persist

**CHECKPOINT:** Filters and sorts working

## SPRINT 6: POLISH & TESTING

### Task 6.1: Add All Animations
- Fade-in for tasks
- Slide-out for delete
- Bounce for checkbox
- Pulse for Add button
- Smooth transitions everywhere
- Test: All animations smooth

### Task 6.2: Implement Glassmorphism
- Semi-transparent backgrounds
- Backdrop blur on cards
- Layered depth
- Test: Cards have glass effect

### Task 6.3: Perfect Typography
- Bold headings
- Clear hierarchy
- Readable body text
- Consistent sizing
- Test: Text looks professional

### Task 6.4: Add Shadows and Depth
- Cards have elevation
- Buttons have depth
- Hover increases shadow
- Test: UI has 3D feel

### Task 6.5: Mobile Responsiveness
- Test 320px width
- Test 640px width
- Stack elements properly
- Touch-friendly buttons
- Test: Works on phone

### Task 6.6: Tablet Responsiveness
- Test 768px width
- Test 1024px width
- Adjust grid columns
- Test: Works on tablet

### Task 6.7: Desktop Responsiveness
- Test 1920px width
- Multi-column layout
- Proper spacing
- Test: Works on desktop

### Task 6.8: Keyboard Navigation
- Tab through all elements
- Enter to submit
- Esc to cancel
- Space for checkbox
- Test: Full keyboard control

### Task 6.9: Add ARIA Labels
- Icon buttons have labels
- Form inputs labeled
- Modals have roles
- Test: Accessibility improved

### Task 6.10: Test All CRUD Operations
- Add task with all fields
- Add task with only title
- Edit task
- Delete task
- Toggle completion
- Test: Everything works

### Task 6.11: Test Filters
- Filter by All
- Filter by Active
- Filter by Completed
- Test: Correct tasks show

### Task 6.12: Test Sorting
- Sort by Priority
- Sort by Deadline
- Sort by Created Date
- Test: Order correct

### Task 6.13: Test Persistence
- Add tasks
- Refresh page
- Change filter
- Refresh page
- Test: Data persists

### Task 6.14: Test Edge Cases
- Empty title
- Very long title
- Very long description
- Past deadline
- 50+ tasks
- Test: No crashes

### Task 6.15: Performance Check
- Check animation FPS
- Run Lighthouse audit
- Optimize if needed