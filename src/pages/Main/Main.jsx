import { Organizations } from 'pages/Main/blocks/Organizations';
import { DancesTypes } from 'pages/Main/blocks/DancesTypes';
import { Principles } from 'pages/Main/blocks/Principles';
import { ContactUs } from 'pages/Main/blocks/ContactUs';
import { LastNews } from 'pages/Main/blocks/LastNews';
import { Partners } from 'pages/Main/blocks/Partners';
import { Platform } from 'pages/Main/blocks/Platform';
import { Career } from 'pages/Main/blocks/Career';
import { Hero } from 'pages/Main/blocks/Hero';

export const Main = () => (
  <div>
    <Hero />
    <DancesTypes />
    <Organizations />
    <Career />
    <Platform />
    <Principles />
    <LastNews />
    <Partners />
    <ContactUs />
  </div>
);
