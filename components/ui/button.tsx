import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link' | 'primary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    // Generate complete className string deterministically
    let buttonClassName = 'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    // Add variant classes
    switch (variant) {
      case 'default':
        buttonClassName += ' bg-primary-600 text-white hover:bg-primary-700 hover:shadow-md active:bg-primary-800 active:scale-95';
        break;
      case 'secondary':
        buttonClassName += ' bg-primary-100 text-primary-900 hover:bg-primary-200 hover:shadow-sm active:bg-primary-300';
        break;
      case 'outline':
        buttonClassName += ' border border-primary-600 bg-primary-50 text-primary-700 hover:bg-primary-100 hover:border-primary-700 active:bg-primary-200';
        break;
      case 'ghost':
        buttonClassName += ' !text-primary-700 hover:!bg-primary-100 hover:!text-primary-900';
        break;
      case 'destructive':
        buttonClassName += ' bg-red-600 text-white hover:bg-red-700 hover:shadow-md active:bg-red-800 active:scale-95';
        break;
      case 'link':
        buttonClassName += ' text-primary-600 underline-offset-4 hover:underline dark:text-primary-400';
        break;
      case 'primary':
        buttonClassName += ' !bg-gradient-to-r !from-primary-600 !to-primary-700 !text-white hover:!from-primary-700 hover:!to-primary-800 hover:!shadow-lg active:!scale-95';
        break;
    }
    
    // Add size classes
    switch (size) {
      case 'sm':
        buttonClassName += ' h-8 rounded-lg px-3 text-xs';
        break;
      case 'lg':
        buttonClassName += ' h-12 rounded-xl px-8 text-base';
        break;
      case 'icon':
        buttonClassName += ' h-10 w-10';
        break;
      default:
        buttonClassName += ' h-10 px-4 py-2';
        break;
    }
    
    // Add custom className if provided
    if (className) {
      buttonClassName += ' ' + className;
    }
    
    // Add inline styles for primary variant to ensure they override any CSS
    const inlineStyles = variant === 'primary' ? {
      background: 'linear-gradient(to right, #0284c7, #0369a1)',
      color: 'white'
    } : variant === 'ghost' ? {
      color: '#0369a1'
    } : {};

    return (
      <button
        className={buttonClassName}
        style={inlineStyles}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
