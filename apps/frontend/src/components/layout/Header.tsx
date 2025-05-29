import React from 'react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="border-b border-gray-200 p-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
    </header>
  );
};