import { useScreenWidth } from 'hooks/useScreenWidth';
import { Organizations } from 'pages/Main/blocks/Organizations';
import { BannersShowcase } from 'pages/Main/blocks/Banners';
import { DancesTypes } from 'pages/Main/blocks/DancesTypes';
import { Principles } from 'pages/Main/blocks/Principles';
import { LastNews } from 'pages/Main/blocks/LastNews';
import { Partners } from 'pages/Main/blocks/Partners';
import { Platform } from 'pages/Main/blocks/Platform';
import { Hero } from 'pages/Main/blocks/Hero';

export const Main = () => {
  const screenWidth = useScreenWidth();

  return (
    <>
      <Hero />
      TEST
      TEST2
      {screenWidth < 557 && <BannersShowcase />}
      <DancesTypes />
      <Organizations />
      <Platform />
      <Principles />
      <LastNews />
      <Partners />
    </>
  );
};
