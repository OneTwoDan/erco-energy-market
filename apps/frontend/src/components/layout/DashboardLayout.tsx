import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import ActiveOffers from '@/pages/Dashboard/ActiveOffers';
import History from '@/pages/Dashboard/History';
import PublishOffer from '@/pages/Dashboard/PublishOffer';
import Profile from '@/pages/Dashboard/Profile';

const sectionTitles: Record<string, string> = {
  activeOffers: 'Active Offers',
  history: 'History',
  publishOffer: 'Publish Offer',
  profile: 'Profile',
};

export const DashboardLayout: React.FC = () => {
  const [selected, setSelected] = useState('activeOffers');

  const renderContent = () => {
    switch (selected) {
      case 'activeOffers':
        return <ActiveOffers />;
      case 'history':
        return <History />;
      case 'publishOffer':
        return <PublishOffer />;
      case 'profile':
        return <Profile />;
      default:
        return <ActiveOffers />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar selected={selected} onSelect={setSelected} />
      <div className="flex-1 flex flex-col">
        <Header title={sectionTitles[selected]} />
        <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};