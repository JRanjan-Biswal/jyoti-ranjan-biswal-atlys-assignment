# foo-rum - A Simple Forum Application

A modern, lightweight forum application built with React, TypeScript, and Tailwind CSS. Features local storage-based authentication and post management.

## Technologies Used

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Router** - Navigation

## Project Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Authentication

The application uses a **localStorage-based authentication system** - no backend required!

### Demo Accounts (Login Only)

Two pre-configured accounts are available for testing:

| Email | Password | Username |
|-------|----------|----------|
| `demo@example.com` | `password123` | demo |
| `test@user.com` | `testpass` | testuser |

**Note:** These accounts are for login only and cannot be used to sign up.

### Create Your Own Account

You can sign up with any email address (except the demo accounts above):
1. Click "Sign Up" 
2. Enter your desired username
3. Enter any email (must not be demo@example.com or test@user.com)
4. Choose a password
5. Your account will be saved in browser's localStorage

## Application Workflow

### 1. Authentication Flow

**Sign In:**
- Navigate to `/signin` or click "Login" in the header
- Enter email and password
- On successful login, you'll be redirected to the home page
- Session persists across page refreshes

**Sign Up:**
- Navigate to `/signup` or click "Sign Up" from the sign-in page
- Enter username, email, and password
- Email validation ensures no duplicates
- Auto-login after successful registration

**Sign Out:**
- Click "Sign Out" button in the header
- Session is cleared from localStorage
- Redirected to home page in logged-out state

### 2. Posts Management

**Viewing Posts:**
- All posts are displayed on the home page
- Posts show username, content, and timestamp
- Posts are ordered by newest first
- No authentication required to view posts

**Creating Posts:**
- Must be logged in to create posts
- Click in the post editor area
- Type your content
- Click the send button (paper plane icon)
- Post appears immediately in the feed

**Data Persistence:**
- All posts stored in localStorage
- Demo posts automatically loaded on first visit
- Posts persist across browser sessions until localStorage is cleared

### 3. Page Structure

- **`/`** - Home page (post feed and editor)
- **`/signin`** - Sign in page
- **`/signup`** - Sign up page
- **`*`** - 404 Not Found page

## Data Storage

All application data is stored in browser's localStorage:

| Key | Description |
|-----|-------------|
| `auth_users` | Array of all registered users (static + custom) |
| `auth_session` | Current user session data |
| `forum_posts` | Array of all forum posts |

**Important:** Clearing browser data will reset the application to initial state.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── AuthModal.tsx   # Authentication modal
│   ├── PostCard.tsx    # Post display card
│   └── PostEditor.tsx  # Post creation editor
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── SignIn.tsx      # Sign in page
│   ├── SignUp.tsx      # Sign up page
│   └── NotFound.tsx    # 404 page
├── utils/              # Utility functions
│   └── initializeDemoPosts.ts  # Demo posts initialization
├── App.tsx             # Main app component
└── main.tsx           # Application entry point
```

## Features

- ✅ Local storage-based authentication
- ✅ User registration and login
- ✅ Session persistence
- ✅ Post creation and viewing
- ✅ Real-time updates (localStorage events)
- ✅ Responsive design
- ✅ Modern UI with shadcn/ui components
- ✅ Protected routes
- ✅ Demo data for testing

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Deployment

This is a static site and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Simply run `npm run build` and deploy the `dist/` folder.

## License

This project is open source and available under the MIT License.
