import * as React from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setIsAnimating(true);
      // Small delay to ensure smooth animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);
      // Wait for animation to complete before removing from DOM
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Match this with CSS transition duration
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!isAnimating && !open) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onOpenChange?.(false);
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-transparent flex items-center justify-center",
        "transition-all duration-500 ease-out"
      )}
      onClick={handleBackdropClick}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50",
          "transition-all duration-500 ease-out",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={handleBackdropClick}
      />

      {/* Modal Container */}
      <div
        className={cn(
          "relative z-50",
          "transition-all duration-500 ease-out transform",
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        )}
      >
        {children}
      </div>
    </div>
  );
};

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative mx-auto max-w-lg w-full bg-white shadow-lg",
          "transition-transform duration-700 ease-out",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DialogContent.displayName = "DialogContent";

export {
  Dialog,
  DialogContent
};