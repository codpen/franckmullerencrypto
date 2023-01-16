import { useEffect, useRef } from 'react';
import type Swiper from 'swiper';

const GamingWarlordsWatch = () => {
  const swiperEl = useRef<HTMLDivElement>(null);
  const swiper = useRef<Swiper | null>(null);

  useEffect(() => {
    import('swiper').then(({ default: Swiper }) => {
      if (!swiperEl.current) return;

      swiper.current = new Swiper(swiperEl.current, {
        loop: true,
        centeredSlides: true,
        spaceBetween: 0,
        keyboard: true,
        grabCursor: true,
      });

      swiper.current.on('slideChange', val => (swiper.current = val));
    });

    return () => swiper.current?.destroy();
  }, []);

  return (
    <section className="relative flex items-end overflow-hidden text-white py-16">
      <img
        className="absolute inset-0 object-cover object-center w-full h-full pointer-events-none"
        src="/static/images/bg-gaming-warlords-watch.jpg"
        alt="Background"
        role="presentation"
        aria-hidden
      />
      <div className="container">
        <div className="row">
          <div className="col col--12 lg:col--8 lg:offset--2">
            <div className="prose pb-8">
              <h2 className="text-2 uppercase">THE TIMEPIECE</h2>
              <p className="text-0">
                A one of one, unique high complication tourbillon has been created for Aoki, it is a beguiling piece of
                watchmaking art, laden with intent. Here, the ultra-modern, sophisticated saphire crystal case gives
                away to the intricate inner workings, skeletonised movement with massive mechanisms, where the bridges
                and pillars of a traditional tourbillon have been turned into an elliptical circle with diameters of
                21.2mm. An eccentric balance of 14mm further characterises this radical tourbillon. Powered by a
                24-jewel manual winding CS-03.SQT movement, beating at 18,800 vibrations an hour.
              </p>
            </div>
          </div>
          <div className="col col--12">
            <div ref={swiperEl} className="relative swiper-container overflow-hidden max-w-[768px] mx-auto bg-black">
              <div className="swiper-wrapper">
                {Array.from(Array(4).keys()).map(i => (
                  <div key={i} className="swiper-slide">
                    <div className="w-full relative" style={{ paddingBottom: `${(563 / 1000) * 100}%` }}>
                      <a className="">
                        <img
                          className="absolute w-full h-full top-0 left-0 fade-in"
                          src={`/static/images/gw-0${i + 1}.jpg`}
                          alt="Gaming Warlords Watch"
                          width={1000 * 2}
                          height={563 * 2}
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <button className="swiper-button-next !text-purple-60" onClick={() => swiper.current?.slideNext()} />
              <button className="swiper-button-prev !text-purple-60" onClick={() => swiper.current?.slidePrev()} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamingWarlordsWatch;
