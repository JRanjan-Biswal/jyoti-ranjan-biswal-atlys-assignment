import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/toaster';

// Define custom User and Session interfaces
interface User {
  id: string;
  email: string;
  username: string;
  user_metadata?: {
    username?: string;
  };
}

interface Session {
  user: User;
  access_token: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface StoredUser {
  id: string;
  email: string;
  password: string;
  username: string;
}

// Static users that can only login
const STATIC_USERS: StoredUser[] = [
  {
    id: 'static-1',
    email: 'demo@example.com',
    password: 'password123',
    username: 'demo',
  },
  {
    id: 'static-2',
    email: 'test@user.com',
    password: 'testpass',
    username: 'testuser',
  },
];

const STORAGE_KEY = 'auth_users';
const SESSION_KEY = 'auth_session';

const AuthContext = createContext<AuthContextType | null>(null);

// Separate hook into a named function for better Fast Refresh support
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { useAuth };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize stored users
  useEffect(() => {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    if (!storedUsers) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(STATIC_USERS));
    }
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    const storedSession = localStorage.getItem(SESSION_KEY);
    if (storedSession) {
      try {
        const parsedSession = JSON.parse(storedSession);
        setSession(parsedSession);
        setUser(parsedSession.user);
      } catch (error) {
        console.error('Error parsing session:', error);
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const getAllUsers = (): StoredUser[] => {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : STATIC_USERS;
  };

  const signIn = async (email: string, password: string) => {
    const users = getAllUsers();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      toast('Invalid email or password', 'error');
      throw new Error('Invalid credentials');
    }

    const user: User = {
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
      user_metadata: {
        username: foundUser.username,
      },
    };

    const newSession: Session = {
      user,
      access_token: `token-${Date.now()}`,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    setSession(newSession);
    setUser(user);

    toast('Welcome back!', 'success');
    navigate('/');
  };

  const signUp = async (email: string, password: string, username: string) => {
    const users = getAllUsers();
    
    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      toast('Email already exists', 'error');
      throw new Error('Email already exists');
    }

    // Check if it's a static user trying to sign up
    const isStaticEmail = STATIC_USERS.some((u) => u.email === email);
    if (isStaticEmail) {
      toast('This email is reserved. Please use a different email.', 'error');
      throw new Error('Reserved email');
    }

    // Create new user
    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      username,
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

    const user: User = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      user_metadata: {
        username: newUser.username,
      },
    };

    const newSession: Session = {
      user,
      access_token: `token-${Date.now()}`,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    setSession(newSession);
    setUser(user);

    toast('Account created successfully!', 'success');
    navigate('/');
  };

  const signOut = async () => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
    setUser(null);

    toast('Signed out successfully', 'info');
    navigate('/');
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};