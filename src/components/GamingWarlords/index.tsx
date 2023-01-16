import Button from 'components/Button';
import VideoBackground from 'components/VideoBackground';
import createSubSink from 'helpers/createSubSink';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { distinctUntilChanged, fromEvent, map, merge, throttleTime, timer } from 'rxjs';

const GamingWarlords = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const sectionEl = sectionRef.current;

    if (!sectionEl) return;

    const subSink = createSubSink();

    subSink.sink = merge(
      fromEvent(sectionEl, 'mouseleave', () => ({ x: 0, y: 0 })),
      fromEvent(sectionEl, 'mousemove', (e: MouseEvent) => {
        const rect = sectionEl.getBoundingClientRect();
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
  }, []);

  useEffect(() => {
    const sectionEl = sectionRef.current;

    if (!sectionEl) return;

    const girlInRainEl = sectionEl.querySelector<HTMLElement>('.girl-in-rain')!;
    const scroll$ = fromEvent(window, 'scroll');
    const resize$ = fromEvent(window, 'resize');
    const load$ = timer(0);
    const subSink = createSubSink();

    const progress$ = merge(load$, scroll$, resize$).pipe(
      map(() => {
        const rect = girlInRainEl.getBoundingClientRect();
        const middle =
          (Math.min(window.innerHeight, Math.max(0, rect.top + rect.height / 2)) - window.innerHeight) * -1;
        const progress = Math.min(1, Math.max(0, middle / window.innerHeight));

        return isNaN(progress) ? 0 : progress;
      })
    );

    subSink.sink = progress$
      .pipe(
        distinctUntilChanged(),
        map(progress => (progress * 40 - 20) * -1)
      )
      .subscribe(rotate => (girlInRainEl.style.transform = `perspective(480px) rotateX(${rotate}deg)`));
    return () => subSink.unsubscribe();
  }, []);

  return (
    <section ref={sectionRef} className="relative text-white overflow-hidden">
      <div className="xl:absolute inset-0 flex items-center py-16 text-center">
        <img
          className="absolute inset-0 object-cover object-center w-full h-full pointer-events-none"
          src="/static/images/bg-pattern.jpg"
          alt="Background"
          role="presentation"
          aria-hidden
        />
        <div className="container">
          <div className="row">
            <div className="col col--12 sm:col--10 sm:offset--1 md:col--8 md:offset--2 lg:col--6 lg:offset--3 xl:col--5 xl:offset--0 prose">
              <div className="relative inline-block w-auto mx-auto mb-4">
                <img src="/static/images/pink-watch.png" alt="Gaming Warlords" width={300} height={300} />
                <div className="absolute top-0 left-0 w-full h-full flex items-center">
                  <div className="relative px-8 py-6">
                    <div role="presentation" className="absolute w-full h-full top-0 left-0 bg-black opacity-50" />
                    <img className="relative w-1/2 mx-auto mb-4" src="/static/images/2023.png" alt="Gaming Warlords" />
                    <h5 className="relative !m-0 uppercase !font-normal text-0">
                      Gaming Warlords
                      <br />
                      Collection
                    </h5>
                  </div>
                </div>
              </div>
              <p className="fluid-text-0">
                Join Franck Muller’s one-of-a-kind auction and bid for Aoki Sloane, the soldier of peace fighting the
                Harakuma warlords that threaten the growing Metaverse. She is an early adopter of Bitcoin, an active
                cryptocurrency trader, and avid gamer
              </p>
              <div className="row -m-2 mt-8 justify-center">
                <div className="col col--auto p-2">
                  <Link href="/aoki" passHref>
                    <Button as="a" kind="outline" size="md">
                      Explore
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-0">
        <div className="col col--12 xl:col--6 xl:offset--6 p-0">
          <div className="w-full relative" style={{ paddingBottom: (4 / 3) * 100 + '%' }}>
            <img
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              src="/static/images/gaming-warlords-background.png"
              alt="Gaming Warlords Background"
            />
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
            <div className="absolute top-[10%] left-0 w-full pointer-events-none shadow-50 girl-in-rain">
              <div className="w-3/4 bg-black mx-auto">
                <div className="w-full relative" style={{ paddingBottom: (844 / 1500) * 100 + '%' }}>
                  <VideoBackground src="/static/videos/girl-in-rain.mp4" captions="Girl In Rain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamingWarlords;
