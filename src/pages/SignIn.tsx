import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SignInForm } from '@/components/SignInForm';
import { GreyContainer } from '@/components/ui/greyContainer';
import { FadeIn } from '@/components/ui/fade-in';
import { Header } from '@/components/Header';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (error) {
      // Error is handled in context
    }
  };

  const handleToggleMode = () => {
    navigate('/signup');
  };

  return (
    <FadeIn className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center bg-[#F9FAFB]">
        <div className="w-[498px]">
          <GreyContainer className="bg-[rgba(235,235,235,1)] p-2">
            <div className="bg-white rounded-large px-14 mb-14 pb-14 pt-1 relative">
              <SignInForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                onSubmit={handleSubmit}
                onToggleMode={handleToggleMode}
                isSignUp={false}
              />
            </div>
          </GreyContainer>
        </div>
      </div>
    </FadeIn>
  );
};

export default SignIn;
