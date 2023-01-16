import Button from 'components/Button';
import Spinner from 'components/Spinner';
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect';
import useLoadedImages from 'hooks/useLoadedImages';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { distinctUntilChanged, fromEvent, map, merge, timer } from 'rxjs';
import { ReactComponent as Checkmark } from 'svgs/checkmark.svg';
import { ReactComponent as Notification } from 'svgs/notification--new.svg';

const TOTAL_FRAMES = 101;

export const getFrames = () =>
  Array.from(Array(TOTAL_FRAMES).keys()).map(i => `/static/images/mystery-box/${String(i).padStart(5, '0')}.png`);

const MysteryBox = () => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const frames = useLoadedImages(useMemo(getFrames, []));
  const [progress, setProgress] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const stickyEl = stickyRef.current;

    if (!stickyEl) return;

    const trigger$ = merge(timer(0), fromEvent(window, 'scroll'), fromEvent(window, 'resize'));

    const progress$ = trigger$.pipe(
      map(() => {
        const distance = Array.from(stickyEl.children)
          .slice(1)
          .reduce((count, el) => count + el.clientHeight, 0);

        return Math.min(Math.max(-stickyEl.getBoundingClientRect().top, 0), distance) / distance;
      }),
      distinctUntilChanged()
    );

    const subscription = progress$.subscribe(setProgress);

    return () => subscription.unsubscribe();
  }, []);

  const currentFrameIndex = frames
    ? frames[Math.floor(progress * frames.length) - 1]
      ? Math.floor(progress * frames.length) - 1
      : 0
    : 0;

  const list = [
    '15,000 Unique Mystery Boxes',
    '10 Physical Franck Muller Timepieces',
    '3 Private Events on unique locations',
    '1 Factory Tour in Genève',
    '10 different 3D Wearables in Decentraland',
    '5 different Franck Muller Apple Watch Faces',
  ].map(item => (
    <li key={item} className="before:!content-[''] !p-0">
      <div className="row -m-2 flex-nowrap">
        <div className="col col--auto p-2 flex">
          <Checkmark className="fill-current text-[#FCD435]" />
        </div>
        <div className="col col--row p-2">{item}</div>
      </div>
    </li>
  ));

  const heading = (
    <h2 className="fluid-text-4">
      <span className="mr-4">Mystery with</span>
      <img
        className="inline align-middle"
        src="/static/images/binance-nft-logo.png"
        alt="Binance NFT"
        height={32}
        width={(768 / 130) * 32}
      />
    </h2>
  );

  const content = 'Make sure to put on your notifications to increase your chance of winning a Mystery Box!';

  const moreInfoButton = (
    <div className="row -m-2">
      <div className="col col--auto p-2">
        <Link href="https://www.binance.com/en/nft/mystery-box/detail?number=1&productId=245614885500599296" passHref>
          <Button
            as="a"
            kind="binance"
            size="lg"
            endIcon={Notification}
            className="font-bold"
            target="_blank"
            rel="noreferrer"
          >
            Get Notified
          </Button>
        </Link>
      </div>
      <div className="col col--auto p-2">
        <Link href="/mysterybox" passHref>
          <Button as="a" kind="fill" size="lg">
            More Information
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <section className="relative bg-black text-white">
      <div className="container md:hidden prose pt-16 fluid-text-0">
        {heading}
        <ul>{list}</ul>
        <p>{content}</p>
        {moreInfoButton}
      </div>
      <div ref={stickyRef} className="relative">
        <div className="sticky min-h-screen top-0 left-0 w-full flex flex-col justify-center overflow-hidden">
          <div className="w-full overflow-hidden flex flex-col justify-center flex-auto">
            <div className="container flex-auto mb-16">
              <div className="row m-0 items-start">
                <div className="col col--12 md:col--5 p-0 hidden md:block prose -fluid-text-2 mt-24">
                  {heading}
                  <ul>{list}</ul>
                  <p>{content}</p>
                  {moreInfoButton}
                </div>
                <div className="col col--12 md:col--7 p-0">
                  <div className="relative w-full pb-full">
                    {!frames ? (
                      <div className="absolute inset-0 flex items-center justify-center text-white z-10">
                        <Spinner size="xl" />
                      </div>
                    ) : (
                      <div className="absolute inset-0">
                        {frames.map((src, i) => (
                          <div
                            key={src}
                            className="absolute -inset-6 top-0 lg:inset-0"
                            style={{ opacity: currentFrameIndex === i ? 1 : 0 }}
                          >
                            <img src={src} alt="Mystery Box" width={1000} height={1000} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 pb-16 flex justify-center overflow-hidden">
            <div className="w-[100px] relative">
              <div className="w-full pb-full">
                {Array.from({ length: 15 }).map((_, i, { length }) => (
                  <div
                    key={i}
                    className="block carousel absolute inset-0 rounded-xl border border-orange-40 hover:border-orange-60 p-2"
                    style={{
                      animationDuration: `${5000 * length}ms`,
                      animationDelay: `-${i * 5000}ms`,
                    }}
                  >
                    <img
                      className="w-full h-full object-contain object-center"
                      src={`/static/images/mystery-item-0${(i % 6) + 1}.png`}
                      alt="Watch"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-screen" role="presentation" />
        <div className="min-h-screen" role="presentation" />
      </div>
    </section>
  );
};

export default MysteryBox;
