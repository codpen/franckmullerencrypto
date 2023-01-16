import anime from 'animejs';
import Button from 'components/Button';
import Portal from 'components/Portal';
import VideoBackground from 'components/VideoBackground';
import { useEffect, useState } from 'react';

interface IntroHeroProps {
  isOpen: boolean;
  onClose: () => void;
}

const IntroHero: React.FC<IntroHeroProps> = ({ onClose, isOpen }) => {
  const [introEl, setIntroEl] = useState<HTMLElement | null>(null);
  const [watchEl, setWatchEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!introEl || isOpen) return;

    anime.remove(introEl);
    anime({
      targets: introEl,
      easing: 'easeInQuad',
      duration: 400,
      translateY: '-110%',
    });
  }, [introEl, isOpen]);

  useEffect(() => {
    if (!watchEl) return;

    anime.remove(watchEl);
    anime({
      targets: watchEl,
      scale: [0.95, 1],
      translateY: [20, 0],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 1500,
    });
  }, [watchEl]);

  return (
    <Portal>
      <div
        ref={setIntroEl}
        className="absolute top-0 left-0 min-h-full w-full z-[1000] bg-black fade-in flex flex-col justify-center"
      >
        <VideoBackground src="/static/videos/motherboard.mp4" playbackRate={0.6} captions="Motherboard" />
        <div className="container min-h-full flex flex-col justify-center items-center">
          <div className="row">
            <div className="col col--12 flex justify-center py-8">
              <img
                src="/static/images/frankmuller-encrypto-logo.png"
                width={(64 / 480) * 1660}
                height={64}
                alt="Mystery Box"
              />
            </div>
            <div className="col col--12 flex justify-center py-8">
              <img
                className="max-w-full px-3 pl-6"
                ref={setWatchEl}
                src="/static/images/intro-centurion-limited-edition.png"
                alt="Watch"
                style={{ transform: 'translateY(-20px) scale(0.95)' }}
                width={250}
                height={250 * (507 / 374)}
              />
            </div>
            <div className="col col--12 flex justify-center py-8">
              <Button onClick={onClose} kind="outline" size="lg">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default IntroHero;
