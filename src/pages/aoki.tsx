import 'swiper/css/bundle';

import Button from 'components/Button';
import Footer from 'components/Footer';
import GamingWarlordsTokens from 'components/GamingWarlords/GamingWarlordsTokens';
import GamingWarlordsWatch from 'components/GamingWarlords/GamingWarlordsWatch';
import Header from 'components/Header';
import Modal from 'components/Modal';
import VideoBackground from 'components/VideoBackground';
import createSubSink from 'helpers/createSubSink';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { distinctUntilChanged, fromEvent, merge, throttleTime } from 'rxjs';
import { ReactComponent as Close } from 'svgs/close.svg';

const Banner = () => {
  const [bannerSectionEl, setBannerSectionEl] = useState<HTMLElement | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!bannerSectionEl) return;

    const subSink = createSubSink();

    subSink.sink = merge(
      fromEvent(bannerSectionEl, 'mouseleave', () => ({ x: 0, y: 0 })),
      fromEvent(bannerSectionEl, 'mousemove', (e: MouseEvent) => {
        const rect = bannerSectionEl.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        return {
          x: Math.round((x / rect.width) * 1000) / 1000,
          y: Math.round((y / rect.height) * 1000) / 1000,
        };
      }).pipe(throttleTime(50))
    )
      .pipe(distinctUntilChanged((a, b) => a.x === b.x && a.y === b.y))
      .subscribe(setCursorPosition);

    return () => subSink.unsubscribe();
  }, [bannerSectionEl]);

  return (
    <section
      ref={setBannerSectionEl}
      className="relative h-[360px] xs:h-[400px] sm:h-[480px] overflow-hidden flex items-center justify-center"
    >
      <img
        className="absolute inset-0 object-cover object-right-bottom w-full h-full"
        src="/static/images/gaming-warlords-background.png"
        alt="Gaming Warlords Background"
        role="presentation"
      />
      <div className="absolute bottom-0 w-full -m-4">
        <div className="relative w-[768px] max-w-full mx-auto">
          <div className="w-full relative" style={{ paddingBottom: (4 / 3) * 100 + '%' }}>
            <div className="absolute left-[17%] bottom-[26%] w-1/4">
              <img
                className="relative w-full object-left pointer-events-none transition-transform"
                src="/static/images/wl-gaming.png"
                alt="Gaming"
                style={{
                  transform: `translate(${25 * -cursorPosition.x}px, ${10 * -cursorPosition.y}px)`,
                  transition: 'transform 300ms cubic-bezier(0.61, 1, 0.88, 1)',
                }}
              />
            </div>
            <div className="absolute left-[18%] bottom-[23%] w-1/6">
              <img
                className="relative w-full object-left pointer-events-none"
                src="/static/images/wl-limited.png"
                alt="Limited"
                style={{
                  transform: `translate(${15 * -cursorPosition.x}px, ${5 * -cursorPosition.y}px)`,
                  transition: 'transform 300ms cubic-bezier(0.61, 1, 0.88, 1)',
                }}
              />
            </div>
            <div className="absolute left-0 bottom-0 w-full">
              <img
                className="relative w-5/6 object-left pointer-events-none mx-auto"
                src="/static/images/gaming-warlords.png"
                alt="Gaming Warlords"
                style={{
                  transform: `translate(${15 * -cursorPosition.x}px, ${15 * -cursorPosition.y}px)`,
                  transition: 'transform 300ms cubic-bezier(0.61, 1, 0.88, 1)',
                }}
              />
            </div>
            <div className="absolute left-[55.5%] bottom-[18.5%]">
              <img
                className="relative w-full object-left pointer-events-none"
                src="/static/images/wl-warlords.png"
                alt="Warlords"
                style={{
                  transform: `translate(${25 * -cursorPosition.x}px, ${10 * -cursorPosition.y}px)`,
                  transition: 'transform 300ms cubic-bezier(0.61, 1, 0.88, 1)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AokiPage = () => {
  const [isExploring, setIsExploring] = useState(false);

  return (
    <>
      <Header />
      <main>
        <Banner />

        <section className="relative">
          <img
            className="absolute inset-0 object-cover object-center w-full h-full pointer-events-none"
            src="/static/images/bg-pattern.jpg"
            alt="Background"
            role="presentation"
            aria-hidden
          />
          <div className="container py-16">
            <div className="row items-center">
              <div className="col col--12 lg:col--5 prose text-white">
                <h2 className="text-2 uppercase">THE CONCEPT</h2>
                <p className="text-0">
                  Aoki is a soldier of peace fighting the Harakuma warlords which threatens the growing Metaverse. She
                  is an early adopter of bitcoin, an active cryptocurrency trader and an avid gamer. She is all in all
                  the time, the best equipment and best brands, her skins? Crazy Hours by Franck Muller.
                </p>
              </div>
              <div className="col col--12 lg:col--6 lg:offset--1">
                <div className="w-full pb-[56.25%] relative bg-black">
                  <VideoBackground
                    src="/static/videos/gaming-warlords-01.mp4"
                    bgImage="/static/images/gaming-warlords-background.png"
                    captions="Gaming Warlords Video"
                    loop={false}
                    muted={false}
                    controls
                    autoPlay={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative min-h-screen flex items-end overflow-hidden text-white">
          <VideoBackground src="/static/videos/girl-in-rain.mp4" captions="Gaming Warlords Video" />
          <div className="container relative mb-8 sm:mb-24 mt-24">
            <div className="row">
              <div className="col col--12 sm:col--auto">
                <div className="absolute -top-4 -right-8 -bottom-4 w-[200vw] bg-black opacity-50" role="presentation" />
                <div className="relative">
                  <h3 className="uppercase leading-tight text-0">
                    Auction <br /> <span className="text-8">AOKI SLOANE</span>
                  </h3>
                  <p className="text-0 mb-6 uppercase">NFT Art & One-of-One Physical Watch</p>
                  <Link href="https://www.binance.com/en/nft/product/76968229" passHref>
                    <Button as="a" kind="fill" target="_blank" rel="noreferrer">
                      Go to auction
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GamingWarlordsWatch />

        <section className="relative text-white">
          <img
            className="absolute inset-0 object-cover object-left w-full h-full pointer-events-none"
            src="/static/images/bg-bitcoin-watches.jpeg"
            alt="Background"
            role="presentation"
            aria-hidden
          />
          <div className="container py-24">
            <img
              className="relative w-[200px] max-w-full mx-auto mb-4"
              src="/static/images/2023.png"
              alt="Gaming Warlords"
            />
            <h2 className="text-8 text-center leading-tight mb-6">
              GAMING WARLORDS <br /> COLLECTION
            </h2>
            <div className="row -m-2 justify-center">
              <div className="col col--auto p-2">
                <Button kind="fill" onClick={() => setIsExploring(true)}>
                  Explore
                </Button>
                {isExploring && (
                  <Modal onClose={() => setIsExploring(false)}>
                    <Modal.Body>
                      <button
                        className="absolute top-0 right-0 cursor-pointer z-10 p-2"
                        onClick={() => setIsExploring(false)}
                      >
                        <Close />
                      </button>
                      <div className="max-w-full w-screen py-8">
                        <div className="row -m-6">
                          <div className="col col--12 md:col--6 p-6 border-b md:border-b-0 md:border-r border-[#ddd]">
                            <div className="row">
                              <div className="col col--12 xs:col--4 md:col--12 lg:col--4 flex justify-center items-start">
                                <img
                                  className="max-w-[200px] w-full"
                                  src="/static/images/gaming-warlords-carbon-fibre.png"
                                  alt="GAMING WARLORDS CARBON FIBRE"
                                />
                              </div>
                              <div className="col col--12 xs:col--8 md:col--12 lg:col--8 prose text-0">
                                <h5>GAMING WARLORDS CARBON FIBRE</h5>
                                <p>
                                  The Gaming Warlords carbon fibre time piece is a stunning piece of watchmaking
                                  ultra-modern, sophisticated with white gold infused within the carbon fibre, and a
                                  skeletonized dial gives way to the intricate inner workings.
                                </p>
                                <p>
                                  <strong>Limited Edition</strong> <br /> 25 Pieces
                                </p>
                                <p>
                                  <strong>Dial</strong> <br /> Skeletonized
                                </p>
                                <p>
                                  <strong>Band</strong> <br /> Alligator Black with Blue/Purple Stitches and Black
                                  Rubber
                                </p>
                                <p>
                                  <strong>Case Material</strong> <br /> White Gold Infused within the Carbon Fibre
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col col--12 md:col--6 p-6">
                            <div className="row">
                              <div className="col col--12 xs:col--4 md:col--12 lg:col--4 flex justify-center items-start">
                                <img
                                  className="max-w-[200px] w-full"
                                  src="/static/images/gaming-warlords-saphire-crystal.png"
                                  alt="GAMING WARLORDS CARBON FIBRE"
                                />
                              </div>
                              <div className="col col--12 xs:col--8 md:col--12 lg:col--8 prose text-0">
                                <h5>GAMING WARLORDS SAPHIRE CRYSTAL</h5>
                                <p>
                                  The Gaming Warlords Saphire crystal time piece is a stunning piece of watchmaking art,
                                  ultra-modern, ultra rare and a skeletonized dial gives way to the intricate inner
                                  workings.
                                </p>
                                <p>
                                  <strong>Limited Edition</strong> <br /> 10 Pieces
                                </p>
                                <p>
                                  <strong>Dial</strong> <br /> Skeletonized
                                </p>
                                <p>
                                  <strong>Band</strong> <br /> Alligator Black with Blue/Purple Stitches and Black
                                  Rubber
                                </p>
                                <p>
                                  <strong>Case Material</strong> <br /> White Gold Infused within the Carbon Fibre
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                )}
              </div>
              {/* <div className="col col--auto p-2">
                <Link href="/" passHref>
                  <Button as="a" kind="fill">
                    Waiting list
                  </Button>
                </Link>
              </div> */}
            </div>
          </div>
        </section>

        <section className="relative text-white">
          <img
            className="absolute inset-0 object-cover object-center w-full h-full pointer-events-none"
            src="/static/images/bg-pattern.jpg"
            alt="Background"
            role="presentation"
            aria-hidden
          />
          <div className="container py-16 prose">
            <h2 className="text-2 uppercase mb-4">THE MAKING OF GAMING WARLORDS</h2>
            <div className="prose md:columns-2 md:gap-16 mb-8">
              <p className="text-0">
                During the past two million years humans evolved on earth to dominate the planet as the apex predator by
                cooperation. Our closest relative primates such as monkeys or apes rarely form groups larger than 100
                before they breakdown.
                <br />
                <br />
                Throughout our evolution, people created stories that turned into belief systems and today&apos;s
                nation-states with populations of hundreds of millions even billions of citizens are glued together
                under each of their particular belief system.
                <br />
                <br />
                Language played a key role within each of these nation-states shaping their own belief system and during
                the past one thousand years a new global language was created by the different nation-states on Earth
                called; money.
                <br />
                <br />
                Money is the common language every country and individual understands. But this is only the beginning,
                we have an opportunity to improve this new common language for the sake of humanity.
                <br />
                <br />
                The future will be defined by money that is not controlled by any one nation state, where decentralized
                money can be freely exchanged in a metaverse by any human being.
                <br />
                <br />
                This is the inspiration behind the illustration of Encrypto Girl.
                <br />
                <br />
                She works as a personal bodyguard and just landed in Decentralized Land ( 分散的⼟地 ) to protect a
                certain high net worth individuals who will be shortly withdrawing money from the Binance exchange
                before entering the gaming centre to party with his friends.
                <br />
                <br />
                Prepared for any situation, she is packing the latest technology in firepower including EMP grenades,
                jetpack, sniper rifles, sonic body armour and a rapid-fire sidearm.
                <br />
                <br />
                She is a martial arts and military hardened hand to hand combat specialist and is dressed in shorts and
                crop top for freedom of movement and speed which are her best qualities. Her boots and armour plates are
                manufactured from off-world rare metals which are virtually indestructible with flecks of anti-gravity
                matter creating weightless material ideal for rapid kill strikes.
                <br />
                <br />
                There are two photographs taken from her ship as she was coming into Decentralized Land and for those
                who requested to see her tattoo complete without the sidearm strapped to her thigh, you won’t be
                disappointed.
              </p>
            </div>
            <div>
              <div className="row">
                <div className="col col--auto">
                  <img src="/static/images/gaming-warlords-granate.png" alt="Granate" />
                </div>
                <div className="col col--auto">
                  <p className="text-0 font-bold">
                    Creative Director
                    <br />
                    Franck Muller Special Projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GamingWarlordsTokens />
      </main>
      <Footer />
    </>
  );
};

export default AokiPage;
