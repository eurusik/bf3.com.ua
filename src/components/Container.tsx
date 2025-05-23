"use client";

import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`main-container w-full max-w-[990px] mx-auto ${className}`}>
      <div className="frame">
        {children}
      </div>
    </div>
  );
};

export default Container;
