import { useScreenWidth } from 'hooks/useScreenWidth';
import { BannersShowcase } from 'pages/Ballroom/Main/blocks/Banners';
import { Dashboard } from 'pages/Ballroom/Main/blocks/Dashboard';
import { Career } from 'pages/Ballroom/Main/blocks/Career';
import { Hero } from 'pages/Ballroom/Main/blocks/Hero';

export const Ballroom = () => {
  const screenWidth = useScreenWidth();

  return (
    <>
      <Hero />
      {screenWidth < 557 && <BannersShowcase />}
      <Dashboard />
      <Career />
    </>
  );
};
