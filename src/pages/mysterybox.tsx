import 'swiper/css/bundle';
import cn from 'classnames';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { getFrames } from 'components/MysteryBox';
import TitleBanner from 'components/TitleBanner';
import { useEffect, useMemo, useRef, useState } from 'react';
import { animationFrames, distinctUntilChanged, map } from 'rxjs';
import type Swiper from 'swiper';

const useSwiper = (el: React.RefObject<HTMLElement>) => {
  const swiper = useRef<Swiper | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    import('swiper').then(({ default: Swiper }) => {
      if (!el.current) return;

      swiper.current = new Swiper(el.current, {
        loop: true,
        centeredSlides: true,
        spaceBetween: 0,
        keyboard: true,
        grabCursor: true,
      });

      swiper.current.on('slideChange', val => (swiper.current = val));
      swiper.current.on('realIndexChange', val => setCurrentIndex(val.realIndex));
    });

    return () => swiper.current?.destroy();
  }, [el]);

  return [swiper, currentIndex] as const;
};

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const frames = useMemo(getFrames, []);
  const framesLength = frames.length;

  useEffect(() => {
    let direction: 'forward' | 'backward' = 'forward';

    const subscription = animationFrames()
      .pipe(
        map(({ elapsed }) => Math.round(elapsed / (1000 / 60))),
        distinctUntilChanged()
      )
      .subscribe(() =>
        setCurrentIndex(currentIndex =>
          direction === 'forward'
            ? currentIndex === framesLength - 1
              ? ((direction = 'backward'), currentIndex - 1)
              : currentIndex + 1
            : currentIndex === 0
            ? ((direction = 'forward'), currentIndex + 1)
            : currentIndex - 1
        )
      );

    return () => subscription.unsubscribe();
  }, [framesLength]);

  return (
    <section className="text-white mb-24">
      <div className="container">
        <div className="row items-center">
          <div className="col col--12 md:col--7">
            <div className="w-full pb-full relative">
              {frames.map((frame, index) => (
                <img
                  key={index}
                  className={cn(
                    'absolute top-0 left-0 w-full h-full',
                    currentIndex === index ? 'opacity-100' : 'opacity-0'
                  )}
                  src={frame}
                  alt="Mystery Box"
                />
              ))}
            </div>
          </div>
          <div className="col col--12 md:col--5 prose fluid-text-0">
            <h2 className="fluid-text-4 text-yellow-40">Mystery with Franck Muller</h2>
            <p>
              In partnership with Binance, Franck Muller Mystery unveils incredible rewards, from unique NFTs,
              Wearables, Physical Franck Muller timepieces, Multiple Watch Faces, a factory tour in Geneva, and access
              to Private Events.
            </p>
            <p>
              There will be a limited supply of 15,000 Mystery Boxes. All Mystery Box holders will be eligible to win
              Physical Watches, Wearables, Watch Faces, Collectibles and Private Events.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const PhysicalWatches = () => {
  const swiperEl = useRef<HTMLDivElement>(null);
  const [swiper] = useSwiper(swiperEl);

  return (
    <section className="text-white mb-24">
      <div className="container prose mb-16">
        <h2 className="fluid-text-6 text-center">Franck Muller Physical Watches</h2>
      </div>
      <div className="container">
        <div className="row items-center">
          <div className="col col--12 md:col--6 prose fluid-text-0 order-2 md:order-1">
            <h2 className="fluid-text-4 text-yellow-40">Free the Money. Free the World</h2>
            <p>
              Free The Money, Free The World is one of the exclusive watches in our Mystery Box collection. The
              timepiece unfurls the modern and futuristic features of our current generation. <br /> Only 500 of the
              &apos;Free the money, Free the world&apos; timepieces were ever produced. In addition, the watch is
              beloved by many celebrities all over the world!
            </p>
          </div>
          <div className="col col--12 md:col--5 md:offset--1 order-1 md:order-2">
            <div ref={swiperEl} className="swiper-container overflow-hidden relative">
              <div className="swiper-wrapper">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="swiper-slide">
                    <div className="w-full relative" style={{ paddingBottom: `${(380 / 350) * 100}%` }}>
                      <img
                        className="absolute w-full h-full top-0 left-0 fade-in object-contain object-center"
                        src={`/static/images/free-the-money-free-the-world-watch-face-0${i + 1}.png`}
                        alt="Free the Money. Free the World"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="swiper-button-next !text-white opacity-50 hover:opacity-100"
                onClick={() => swiper.current?.slideNext()}
              />
              <button
                className="swiper-button-prev !text-white opacity-50 hover:opacity-100"
                onClick={() => swiper.current?.slidePrev()}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ThreeDWearables = () => {
  const swiperEl = useRef<HTMLDivElement>(null);
  const [swiper, currentIndex] = useSwiper(swiperEl);

  const items = useMemo(
    () => [
      {
        title: 'Diamond Steampunk',
        content:
          'The precious Diamond Steampunk wearable is the diamond-encrusted variation of the Franck Muller Steampunk wearable',
        image: '/static/images/3d-wearable-09.png',
      },
      {
        title: 'Diamond Nakamoto',
        content:
          'The precious Nakamoto wearable is the diamond-encrusted variation of the Franck Muller Nakamoto wearable. The VIP version can be recognised by the exclusive red detail on the wrist.',
        image: '/static/images/3d-wearable-08.png',
      },
      {
        title: 'Steampunk',
        content:
          'The precious Steampunk wearable may not have diamonds but its design is a combination of science fiction that incorporates retrofuturistic technology.',
        image: '/static/images/3d-wearable-11.png',
      },
      {
        title: 'Steampunk Snow VIP',
        content:
          'The precious Steampunk Snow VIP is based on snow and this can be found in its unique design. Snow stands for purity and clarity just like our timepiece.',
        image: '/static/images/3d-wearable-01.png',
      },
      {
        title: 'Steampunk VIP',
        content:
          'The precious Steampunk VIP wearable may not have diamonds but its design is a combination of science fiction that incorporates retrofuturistic technology. The VIP version can be recognised by the exclusive red detail on the wrist.',
        image: '/static/images/3d-wearable-03.png',
      },
      {
        title: 'Metaverse VIP',
        content:
          'The precious Metaverse VIP wearable stands for the future and a new virtual world. With virtual reality, we are entering a new era where everything is going to be digitalised. The VIP version can be recognised by the exclusive red detail on the strap of the watch.',
        image: '/static/images/3d-wearable-06.png',
      },
      {
        title: 'Nakamoto VIP',
        content:
          'The precious Nakamoto wearable is the diamond encrusted variation of the Franck Muller Nakamoto wearable. The VIP version can be recognised by the exclusive red detail on the wrist',
        image: '/static/images/3d-wearable-04.png',
      },
      {
        title: 'Metaverse',
        content:
          'The precious Metaverse wearable stands for the future and a new virtual world. With virtual reality, we are entering a new era where everything is going to digitalise.',
        image: '/static/images/3d-wearable-10.png',
      },
      {
        title: 'Crypto Special Edition',
        content:
          'The precious Crypto Special Edition wearable is made in the style of Binance with all the appropriate details on it. The wearable is designed in a cryptocurrency theme.',
        image: '/static/images/3d-wearable-05.png',
      },
      {
        title: 'Metaverse Reality-Edition',
        content:
          'The precious Metaverse Reality-Edition is a wearable that stands out when worn in Decentraland. It is focused on connecting reality and the metaverse, making it a unique wearable in our collection. ',
        image: '/static/images/3d-wearable-02.png',
      },
    ],
    []
  );

  const currentItem = items[currentIndex] ?? items[0];

  return (
    <section className="text-white mb-24">
      <div className="container prose mb-16">
        <h2 className="fluid-text-6 text-center">Franck Muller 3D wearables</h2>
      </div>
      <div className="container">
        <div className="row items-center">
          <div className="col col--12 md:col--5">
            <div ref={swiperEl} className="swiper-container overflow-hidden relative">
              <div className="swiper-wrapper">
                {items.map(item => (
                  <div key={item.image} className="swiper-slide">
                    <div className="w-full pb-full relative">
                      <img
                        className="absolute w-full h-full top-0 left-0 fade-in object-contain object-center"
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="swiper-button-next !text-white opacity-50 hover:opacity-100"
                onClick={() => swiper.current?.slideNext()}
              />
              <button
                className="swiper-button-prev !text-white opacity-50 hover:opacity-100"
                onClick={() => swiper.current?.slidePrev()}
              />
            </div>
          </div>

          <div className="col col--12 md:col--6 md:offset--1 prose fluid-text-0">
            <h2 className="fluid-text-4 text-yellow-40">{currentItem.title}</h2>
            <p>{currentItem.content}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Watchfaces = () => {
  const swiperEl = useRef<HTMLDivElement>(null);
  const [swiper, currentIndex] = useSwiper(swiperEl);

  const items = useMemo(
    () => [
      {
        title: 'Color Dreams',
        image: '/static/images/watch-face-02.png',
        content:
          'The Franck Muller Color Dreams interactive Apple watch face brings luxury to your technology. Indulge in the elegance of all the various colors within the face of the watch.',
      },
      {
        title: 'Virtual Freedom',
        image: '/static/images/watch-face-01.png',
        content:
          'The Franck Muller Virtual Freedom interactive Apple watch face brings luxury to your technology. The Virtual Freedom is a special version in our collection of watch faces, as is named after and recreated from the physical Free The Money, Free The World timepiece.',
      },
      {
        title: 'Silver Steampunk',
        image: '/static/images/watch-face-03.png',
        content:
          'The Franck Muller Silver Steampunk interactive Apple watch face brings luxury to your technology in this modern-day timepiece. The Silver colors on this watch face bring out luxury like never before, the difference between the silver and the black creates a perfect contrast.',
      },
      {
        title: 'Golden Steampunk',
        image: '/static/images/watch-face-04.png',
        content:
          'The Franck Muller Golden Steampunk interactive Apple watch face brings luxury to your technology. The golden colors on this watch face bring out the luxury like never before.',
      },
      {
        title: 'Nakamoto',
        image: '/static/images/watch-face-05.png',
        content:
          'The Franck Muller Nakamoto interactive Apple watch face brings luxury to your technology. The Nakamoto is a special version in our collection of watch faces, and is named after and recreated from the physical Nakamoto timepiece.',
      },
    ],
    []
  );

  const currentItem = items[currentIndex] ?? items[0];

  return (
    <section className="text-white mb-24">
      <div className="container prose mb-16">
        <h2 className="fluid-text-6 text-center">Franck Muller Watch Faces</h2>
      </div>
      <div className="container">
        <div className="row items-center">
          <div className="col col--12 md:col--5 prose fluid-text-0 order-2 md:order-1">
            <h2 className="fluid-text-4 text-yellow-40">{currentItem.title}</h2>
            <p>{currentItem.content}</p>
          </div>
          <div className="col col--12 md:col--7 order-1 md:order-2">
            <div ref={swiperEl} className="swiper-container overflow-hidden relative">
              <div className="swiper-wrapper">
                {items.map((item, i) => (
                  <div key={i} className="swiper-slide">
                    <div className="w-full relative">
                      <img className="w-full h-auto fade-in" src={item.image} alt={item.title} />
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="swiper-button-next !text-white opacity-50 hover:opacity-100"
                onClick={() => swiper.current?.slideNext()}
              />
              <button
                className="swiper-button-prev !text-white opacity-50 hover:opacity-100"
                onClick={() => swiper.current?.slidePrev()}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PrivateEvents = () => {
  const swiperEl = useRef<HTMLDivElement>(null);
  const [swiper, currentIndex] = useSwiper(swiperEl);

  const items = useMemo(
    () => [
      {
        title: 'Dubai Private Event',
        image: '/static/images/private-event-01.png',
        content:
          'The Dubai Event is a private event that only an exclusive number of people can attend, here you will learn more about Franck Muller, connect with other watch lovers and attend exclusive presentations with well-known speakers. Different themes will be highlighted so you know all the ins and outs of Franck Muller.',
      },
      {
        title: 'Miami Private Event',
        image: '/static/images/private-event-02.png',
        content:
          'The Miami Event is a private event that only an exclusive number of people can attend, here you will learn more about Franck Muller, connect with other watch lovers and attend exclusive presentations with well-known speakers. Different themes will be highlighted so you know all the ins and outs of Franck Muller.',
      },
      {
        title: 'Singapore Private Event',
        image: '/static/images/private-event-03.png',
        content:
          'The Singapore Event is a private event that only an exclusive number of people can attend, here you will learn more about Franck Muller, connect with other watch lovers and attend exclusive presentations with well-known speakers. Different themes will be highlighted so you know all the ins and outs of Franck Muller.',
      },
    ],
    []
  );

  const currentItem = items[currentIndex] ?? items[0];

  return (
    <section className="text-white mb-24 overflow-hidden">
      <div className="container prose mb-16">
        <h2 className="fluid-text-6 text-center">Franck Muller Private Events</h2>
      </div>
      <div className="container mb-16">
        <div className="row items-center">
          <div className="col col--12 md:col--6 prose fluid-text-0 order-2 md:order-1">
            <h2 className="fluid-text-4 text-yellow-40">{currentItem.title}</h2>
            <p>{currentItem.content}</p>
          </div>
          <div className="col col--12 md:col--5 md:offset--1 order-1 md:order-2">
            <div ref={swiperEl} className="swiper-container overflow-hidden relative">
              <div className="swiper-wrapper">
                {items.map((item, i) => (
                  <div key={i} className="swiper-slide">
                    <div className="w-full relative" style={{ paddingBottom: `${(380 / 350) * 100}%` }}>
                      <img
                        className="absolute w-full h-full top-0 left-0 fade-in object-contain object-center"
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="swiper-button-next !text-white opacity-50 hover:opacity-100"
                onClick={() => swiper.current?.slideNext()}
              />
              <button
                className="swiper-button-prev !text-white opacity-50 hover:opacity-100"
                onClick={() => swiper.current?.slidePrev()}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container relative">
        <div className="row items-center">
          <div className="col col--12 md:col--5">
            <img className="w-full h-aut rounded-2xl" src="/static/images/watchland-tour.jpg" alt="Watchland Tour" />
          </div>
          <div className="col col--12 md:col--6 md:offset--1 prose fluid-text-0">
            <h2 className="fluid-text-4 text-yellow-40">Watchland Private Event</h2>
            <p>
              Watchland is established in Genthod, in the neighboring countryside of Geneva. The extreme peacefulness of
              these surroundings reflects the quest for harmony and perfection to which the creators aspires.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const AokiSloaneCollectibles = () => {
  const swiperEl = useRef<HTMLDivElement>(null);
  const [swiper, currentIndex] = useSwiper(swiperEl);

  const items = useMemo(
    () => [
      {
        title: "Aoki's Helmet",
        content:
          "Aoki's helmet is a K9-3 riot gear helmet, which must be equipped when going into battle. Aoki Slaons will be wearing the helmet at all times when battling inside the metaverse.",
        image: '/static/images/aokis-armor-09.png',
      },
      {
        title: "Aoki's EMP Grenade",
        content:
          'The EMP grenade that Aoki Sloane carries is essential for blinding his or her opponents, a must-have essential.',
        image: '/static/images/aokis-armor-03.png',
      },
      {
        title: "Aoki's Armor",
        content:
          "Aoki's Armor consists of custom Kevlar plates and is famous for its indestructible characteristics. Nonetheless, it is light and ideal for quick movements and executions.",
        image: '/static/images/aokis-armor-04.png',
      },
      {
        title: "Aoki's Breastplate",
        content:
          "Aoki's breastplate is made of gold components, this gold ensures that she is protected from all kinds of weapons that may come her way.",
        image: '/static/images/aokis-armor-07.png',
      },
      {
        title: "Aoki's Boots",
        content:
          "Aoki's boots are tailor-made to ward off bullets and other dangerous obstacles. With this, Aoki makes sure that she is always one step ahead of the competition.",
        image: '/static/images/aokis-armor-06.png',
      },
      {
        title: "Aoki's Jetpack",
        content:
          "Aoki's jetpack is an important part of her outfit. With it, she is always more agile than her enemy. She moves faster in the field with the jetpack.",
        image: '/static/images/aokis-armor-05.png',
      },

      {
        title: "Aoki's Rapid Fire Handgun",
        content:
          "Aoki's rapid-fire gun, Sig-Sauer SP2022 Customised especially for Aoki. This specially made gun will never leave her side and serves as a safety if the situation gets out of hand.",
        image: '/static/images/aokis-armor-01.png',
      },
      {
        title: "Aoki's Necklace",
        content:
          'The necklace of Aoki is a sign of knowledge and experience within the crypto market. It never leaves her neck, as it is a sign of conquest.',
        image: '/static/images/aokis-armor-02.png',
      },
    ],
    []
  );

  const currentItem = items[currentIndex] ?? items[0];

  return (
    <section className="text-white mb-24">
      <div className="container prose mb-16">
        <h2 className="fluid-text-6 text-center">Aoki Sloane Collectibles</h2>
      </div>
      <div className="container">
        <div className="row items-center">
          <div className="col col--12 md:col--5">
            <div ref={swiperEl} className="swiper-container overflow-hidden relative rounded-2xl">
              <div className="swiper-wrapper">
                {items.map((item, i) => (
                  <div key={i} className="swiper-slide">
                    <div className="w-full relative">
                      <img className="w-full h-auto fade-in" src={item.image} alt={item.title} />
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="swiper-button-next !text-white opacity-50 hover:opacity-100"
                onClick={() => swiper.current?.slideNext()}
              />
              <button
                className="swiper-button-prev !text-white opacity-50 hover:opacity-100"
                onClick={() => swiper.current?.slidePrev()}
              />
            </div>
          </div>
          <div className="col col--12 md:col--6 md:offset--1 prose fluid-text-0">
            <h2 className="fluid-text-4 text-yellow-40">{currentItem.title}</h2>
            <p>{currentItem.content}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CollectAndWin = () => {
  return (
    <section className="text-white">
      <div className="container prose mb-16">
        <h2 className="fluid-text-6 text-center">Collect & Win</h2>
      </div>
      <div className="container">
        <div className="row items-center">
          <div className="col col--12 md:col--6 prose fluid-text-0 order-2 md:order-1">
            <p>
              One month after the mystery box launch, 1 of the 25 Aoki Sloane Franck Muller Timepieces will be raffled
              out to all people holding one or more, Aoki Sloane collectibles.
            </p>
            <p>
              The holding of multiple different collectibles increases the chance of winning the unique Timepiece.
              Holding all 8 assets will give you the highest chance possible. This watch will be different from the 1/1
              timepiece that will be sold during the auction.
            </p>
            <p>
              The Gaming Warlords carbon fibre time piece is a stunning piece of watchmaking ultra-modern, sophisticated
              with white gold infused within the carbon fibre, and a skeletonized dial gives way to the intricate inner
              workings. This will be a limited collection with only 25 watches ever to be produced.
            </p>
          </div>
          <div className="col col--12 md:col--5 md:offset--1 order-1 md:order-2">
            <img
              className="w-full h-auto fade-in max-w-[400px] mx-auto"
              src="/static/images/gaming-warlords-watch-face.png"
              alt="Free the Money. Free the World"
            />
          </div>
        </div>
        <hr className="m-0 h-0 border border-solid border-white opacity-10 mt-24" />
      </div>
    </section>
  );
};

const MysteryBoxPage = () => {
  return (
    <>
      <Header />
      <main>
        <TitleBanner title="Mystery Box" height="md" />
        <Banner />
        <PhysicalWatches />
        <ThreeDWearables />
        <Watchfaces />
        <PrivateEvents />
        <AokiSloaneCollectibles />
        <CollectAndWin />
      </main>
      <Footer />
    </>
  );
};

export default MysteryBoxPage;
