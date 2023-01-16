import 'swiper/css/bundle';

import cn from 'classnames';
import Spinner from 'components/Spinner';
import useIsInViewOnce from 'hooks/useIsInViewOnce';
import useLoadedImages from 'hooks/useLoadedImages';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ReactComponent as ChevronLeft } from 'svgs/chevron--left.svg';
import { ReactComponent as ChevronRight } from 'svgs/chevron--right.svg';
import { ReactComponent as WatchFrameOutline } from 'svgs/watch-frame--outline.svg';
import type Swiper from 'swiper';

const watches = [
  {
    id: 1,
    title: 'FREE THE MONEY. FREE THE WORLD.',
    thumbnail: '/static/images/watches/free-the-money-free-the-world.png',
    color: '#4CB286',
    link: 'https://shop.franckmullerencrypto.com/product/franck-muller-41mm-free-the-money-free-the-world',
  },
  {
    id: 2,
    title: 'NAKAMOTO CARBON FIBER',
    thumbnail: '/static/images/watches/carbon-fiber-nakamoto.png',
    color: '#F7C901',
    link: 'https://shop.franckmullerencrypto.com/product/franck-muller-mens-45mm-carbon-fiber-nakamoto',
  },
  {
    id: 3,
    title: 'STEAMPUNK LIMITED EDITION',
    thumbnail: '/static/images/watches/steampunk-limited-edition.png',
    color: '#E27C1D',
    link: 'https://shop.franckmullerencrypto.com/product/franck-muller-encrypto-45mm-speed',
  },
  {
    id: 4,
    title: 'GOLD ELEMENTO CARBON FIBER',
    thumbnail: '/static/images/watches/carbon-fiber-case-gold-elemento.png',
    color: '#49484A',
    link: 'https://shop.franckmullerencrypto.com/product/franck-muller-mens-45mm-carbon-fiber-case-gold-elemento/',
  },
  {
    id: 5,
    title: 'GOLD ELEMENTO TITANIUM',
    thumbnail: '/static/images/watches/gold-elemento-titanium.png',
    color: '#C3C4C5',
    link: 'https://shop.franckmullerencrypto.com/product/45mm-titanium/',
  },
  {
    id: 6,
    title: 'CENTURION LIMITED EDITION',
    thumbnail: '/static/images/watches/centurion-limited-edition.png',
    color: '#B48477',
    link: 'https://shop.franckmullerencrypto.com/product/45mm-gold/',
  },
  {
    id: 7,
    title: 'DIAMOND SPEED LIMITED EDITION',
    thumbnail: '/static/images/watches/diamond-speed-limited-edition.png',
    color: '#F49D50',
    link: 'https://shop.franckmullerencrypto.com/product/franck-muller-mens-45mm-diamond-case-speed-limited-edition/',
  },
];

const WatchCarousel = () => {
  const [sectionEl, setSectionEl] = useState<HTMLElement | null>(null);
  const swiper = useRef<Swiper | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isInView = useIsInViewOnce(sectionEl);

  const frames = useLoadedImages(
    useMemo(() => (isInView ? watches.map(({ thumbnail }) => thumbnail) : null), [isInView])
  );

  useEffect(() => {
    if (!frames) return;

    import('swiper').then(({ default: Swiper }) => {
      swiper.current = new Swiper('.swiper-container', {
        centeredSlides: true,
        loop: true,
        loopAdditionalSlides: 2,
        spaceBetween: 0,
        keyboard: true,
        grabCursor: true,
      });

      swiper.current.on('realIndexChange', val => {
        setCurrentIndex(val.realIndex);
        swiper.current = val;
      });

      swiper.current.on('click', val => val.slideTo(val.clickedIndex));
    });

    return () => swiper.current?.destroy();
  }, [frames]);

  const currentWatch = watches[currentIndex] ?? watches[0];

  return (
    <section ref={setSectionEl} className="collection relative bg-gray-10 pt-16 pb-32 md:pb-24 overflow-hidden">
      <div className="container max-w-[400px] py-16 relative" style={{ color: currentWatch.color }}>
        <div className="absolute inset-8">
          <img
            className="absolute inset-0 w-full h-full object-fill"
            src="/static/images/watch-frame.svg"
            alt="Watch Frame"
          />
        </div>
        <div className="absolute inset-0">
          <WatchFrameOutline className="absolute inset-0 w-full h-full" />
        </div>
        <div className="absolute -inset-12">
          <WatchFrameOutline className="absolute inset-0 w-full h-full" />
        </div>
        <div className="absolute -inset-24">
          <WatchFrameOutline className="absolute inset-0 w-full h-full" />
        </div>
        <div className="absolute -inset-40">
          <WatchFrameOutline className="absolute inset-0 w-full h-full" />
        </div>
        <div className="absolute -inset-64">
          <WatchFrameOutline className="absolute inset-0 w-full h-full" />
        </div>

        <div className="absolute -inset-96">
          <WatchFrameOutline className="absolute inset-0 w-full h-full" />
        </div>

        {!frames && (
          <div className="absolute inset-0 flex items-center justify-center text-black z-10">
            <Spinner size="xl" />
          </div>
        )}

        <div className={cn('swiper-container px-10', !frames && 'pointer-events-none')}>
          <div className="swiper-wrapper">
            {watches.map((watch, index) => (
              <div key={watch.id} className="swiper-slide">
                <div className="w-full relative" style={{ paddingBottom: `${(380 / 350) * 100}%` }}>
                  {frames && (
                    <a href={watch.link} className={cn(currentIndex !== index && 'pointer-events-none')}>
                      <img
                        className="absolute w-full h-full top-0 left-0 fade-in"
                        src={watch.thumbnail}
                        alt={watch.title}
                      />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex justify-center">
        <div className="bg-white w-[480px] max-w-full text-center px-6 py-4 rounded-t-3xl shadow-30">
          <div className="row -m-2 items-center">
            <div className="col col--auto p-2 flex">
              <button onClick={() => swiper.current?.slidePrev()}>
                <ChevronLeft />
              </button>
            </div>
            <div className="col col--grow p-2">
              <h4 className="uppercase font-semibold -text-6 mb-1.5">Franck Muller Encrypto</h4>
              <p className="uppercase font-semibold -text-2">{currentWatch.title}</p>
            </div>
            <div className="col col--auto p-2 flex">
              <button onClick={() => swiper.current?.slideNext()}>
                <ChevronRight />
              </button>
            </div>
            <div role="presentation" className="col col--12 p-2 watch-carousel-pagination">
              <div className="flex justify-center pagination-list">
                {watches.slice(Math.floor(currentIndex / 7) * 7, Math.floor(currentIndex / 7) * 7 + 7).map(watch => (
                  <div key={watch.id} className={cn('col col--auto p-0 relative', watch === currentWatch && 'active')}>
                    <span className="-text-6 font-bold">{watches.indexOf(watch) + 1}</span>
                    <div
                      className={cn(
                        'block h-[4px] w-6 max-w-full bg-black',
                        watch === currentWatch ? 'opacity-75' : 'opacity-20'
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchCarousel;
