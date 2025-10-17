import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { GreyContainer } from './ui/greyContainer';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  isInitialSignUp?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, isInitialSignUp = false }) => {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(isInitialSignUp);
  const { signIn, signUp } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(signInEmail, signInPassword);
      onClose();
    } catch (error) {
      // Error is handled in context
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(signUpEmail, signUpPassword, signUpUsername);
      onClose();
    } catch (error) {
      // Error is handled in context
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="overflow-hidden rounded-xLarge">
        <div className="relative w-full h-full">
          <GreyContainer className={`bg-[rgba(235,235,235,1)] transition-all duration-500 ease-in-out ${isSignUp ? 'h-[660px]' : 'h-[560px]'}`}>
            <div
              className="flex transition-all duration-500 ease-in-out"
              style={{
                transform: isSignUp ? 'translateX(-50%)' : 'translateX(0px)',
                width: '998px'
              }}
            >
              {/* Sign In Form */}
              <div
                className="w-[498px] h-max flex-shrink-0 transition-opacity duration-500 ease-in-out bg-white rounded-large px-14 mb-14 pb-14 relative"
                style={{
                  opacity: isSignUp ? 0 : 1,
                  visibility: isSignUp ? 'hidden' : 'visible',
                  transition: 'opacity 500ms ease-in-out, visibility 500ms ease-in-out'
                }}
              >
                <SignInForm
                  email={signInEmail}
                  setEmail={setSignInEmail}
                  password={signInPassword}
                  setPassword={setSignInPassword}
                  onSubmit={handleSignIn}
                  onToggleMode={toggleMode}
                  isSignUp={isSignUp}
                />
              </div>

              {/* Sign Up Form */}
              <div
                className="w-[498px] h-max flex-shrink-0 transition-opacity duration-500 ease-in-out bg-white rounded-large px-14 mb-14 pb-14 relative"
                style={{
                  opacity: isSignUp ? 1 : 0,
                  visibility: isSignUp ? 'visible' : 'hidden',
                  transition: 'opacity 500ms ease-in-out, visibility 500ms ease-in-out'
                }}
              >
                <SignUpForm
                  email={signUpEmail}
                  setEmail={setSignUpEmail}
                  password={signUpPassword}
                  setPassword={setSignUpPassword}
                  username={signUpUsername}
                  setUsername={setSignUpUsername}
                  onSubmit={handleSignUp}
                  onToggleMode={toggleMode}
                  isSignUp={isSignUp}
                />
              </div>
            </div>
          </GreyContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};
