import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TextFormat } from '@/hooks/useEditor';

interface ToolbarButtonProps {
  icon: string;
  alt: string;
  onClick: () => void;
  format?: TextFormat;
  isActive?: boolean;
  className?: string;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  alt,
  onClick,
  format,
  isActive,
  className,
}) => {
  return (
    <Button
      variant="noBackground"
      size="tiny"
      onClick={onClick}
      className={cn(
        'hover:bg-white hover:shadow-small transition-all duration-200',
        isActive && 'bg-white shadow-small',
        className
      )}
      title={alt}
    >
      <img 
        src={icon} 
        alt={alt} 
        className={cn(
          "h-3 w-3",
          isActive && 'opacity-100',
          !isActive && 'opacity-70'
        )} 
      />
    </Button>
  );
};

interface ToolbarGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const ToolbarGroup: React.FC<ToolbarGroupProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {children}
    </div>
  );
};

export const ToolbarDivider: React.FC = () => (
  <div className='h-7 w-[1px] bg-secondaryGrey mx-1' />
);