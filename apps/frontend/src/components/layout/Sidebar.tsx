import React from 'react';
import { Button } from "@/components/ui/button";
import ERCO from '@/assets/ERCO.png';

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
      <img src={ERCO} alt="Dashboard Logo" className="mb-6 w-full object-contain" />
      <div className="flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const isSelected = selected === item.key;
          return (
            <Button
              key={item.key}
              variant="ghost"
              className={`w-full mb-2 justify-start ${
                isSelected
                  ? "bg-[#05b305] text-white hover:bg-[#05b305] hover:text-white"
                  : "hover:bg-[#e4fa9e] hover:text-black"
              }`}
              onClick={() => onSelect(item.key)}
            >
              {item.title}
            </Button>
          );
        })}
      </div>
    </aside>
  );
};