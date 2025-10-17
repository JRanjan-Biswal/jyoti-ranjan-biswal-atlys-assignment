import React from 'react';
import { cn } from '@/lib/utils';

interface ProfilePlaceholderProps {
  className?: string;
}

export const ProfilePlaceholder: React.FC<ProfilePlaceholderProps> = ({ className }) => {
  return (
    <div 
      className={cn(
        "w-[37px] h-[37px] rounded-tiny bg-customGrey flex items-center justify-center",
        className
      )}
    >
      <span className="text-sm text-pentagonalGrey">?</span>
    </div>
  );
};
