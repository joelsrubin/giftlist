import { forwardRef } from 'react';
import { Button, ButtonProps } from '../ui/button';

export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function IconButton({ children, onClick }, ref) {
    return (
      <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        onClick={onClick}
        ref={ref}
      >
        {children}
      </Button>
    );
  }
);
