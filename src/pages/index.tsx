import cn from 'classnames';
import DiscoverHero from 'components/DiscoverHero';
import Footer from 'components/Footer';
import GamingWarlords from 'components/GamingWarlords';
import Header from 'components/Header';
import InstaShowcase from 'components/InstaShowcase';
import IntroHero from 'components/IntroHero';
import MysteryBox from 'components/MysteryBox';
import Portal from 'components/Portal';
import ThreeSixtyView from 'components/ThreeSixtyView';
import WatchCarousel from 'components/WatchCarousel';
import socials from 'data/socials';
import { useState } from 'react';

const HomePage = () => {
  const [isIntroHeroOpen, setIsIntroHeroOpen] = useState(true);

  return (
    <>
      <IntroHero isOpen={isIntroHeroOpen} onClose={() => setIsIntroHeroOpen(false)} />

      <Portal>
        <div className="fixed right-0 top-1/2 -translate-y-1/2 bg-white z-50 rounded-l-lg opacity-75 hover:opacity-100 transition-opacity">
          {socials.map(({ icon: Icon, href }) => (
            <div key={href} className="p-2">
              <a href={href} target="_blank" rel="noreferrer">
                <Icon className="fill-current" height={20} width={20} />
              </a>
            </div>
          ))}
        </div>
      </Portal>

      <div className={cn(isIntroHeroOpen && 'opacity-0 pointer-events-none fixed inset-0')}>
        <Header />

        <main role="main">
          <DiscoverHero />

          <MysteryBox />

          <ThreeSixtyView />

          <InstaShowcase />

          <GamingWarlords />

          <WatchCarousel />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
