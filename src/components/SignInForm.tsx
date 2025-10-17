import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SignInFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleMode: () => void;
  isSignUp: boolean;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  onToggleMode,
  isSignUp
}) => {
  return (
    <>
      <div className="mt-7 mb-5">
        <div className="mx-auto bg-primaryGrey rounded-full p-4 flex items-center justify-center w-max">
          <img src="login.svg" alt="login" className="w-5 h-5 -translate-x-0.5" />
        </div>
      </div>

      <div
        className="mb-6 text-center transition-transform duration-500 ease-out"
        style={{
          transform: isSignUp ? 'translateX(-20px)' : 'translateX(0)'
        }}
      >
        <h2 className="text-[20px] font-bold mb-1">Sign in to continue</h2>
        <p className="text-[13px] text-[#667085]">Sign in to access all the features on this app</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5 mt-14">
        <div className="space-y-1.5">
          <Label htmlFor="signin-email" className="text-sm font-semibold text-[#344054]">Email or username</Label>
          <Input
            id="signin-email"
            type="email"
            placeholder="Enter your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-small bg-[#F9FAFB] border-[#F2F4F7] placeholder:text-[#667085] text-[15px]"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="signin-password" className="text-sm font-semibold text-[#344054]">Password</Label>
          <Input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 rounded-small bg-[#F9FAFB] border-[#F2F4F7] placeholder:text-[#667085] text-[15px]"
            required
          />
        </div>
        <Button type="submit" variant="default" size="lg" className="w-full rounded-small">
          Sign In
        </Button>
        <div className="text-[13px] text-center mt-4 absolute -bottom-10 left-0 right-0">
          <span className="text-[#667085]">Do not have an account? </span>
          <button
            type="button"
            onClick={onToggleMode}
            className="text-[#444CE7] hover:text-[#3538CD] font-semibold focus:outline-none"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};
