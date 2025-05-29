import React from 'react';
import { Button } from "@/components/ui/button"

type NavItem = {
  title: string;
  key: string;
};

const navItems: NavItem[] = [
  { title: 'Active Offers', key: 'activeOffers' },
  { title: 'History', key: 'history' },
  { title: 'Publish Offer', key: 'publishOffer' },
  { title: 'Profile', key: 'profile' },
];

interface SidebarProps {
  selected: string;
  onSelect: (key: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selected, onSelect }) => {
  return (
    <aside className="w-60 border-r border-gray-200 h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <div className="flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <Button
            key={item.key}
            variant={selected === item.key ? 'default' : 'ghost'}
            className="w-full mb-2 justify-start"
            onClick={() => onSelect(item.key)}
          >
            {item.title}
          </Button>
        ))}
      </div>
    </aside>
  );
};