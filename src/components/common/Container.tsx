import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'nav';
  id?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

const sizeClasses = {
  narrow: 'max-w-4xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  full: 'max-w-full',
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
  id,
  size = 'default',
}) => {
  return (
    <Component
      id={id}
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </Component>
  );
};

export default Container;
