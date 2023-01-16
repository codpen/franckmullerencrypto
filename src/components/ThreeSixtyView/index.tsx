import anime from 'animejs';
import cn from 'classnames';
import Spinner from 'components/Spinner';
import createSubSink from 'helpers/createSubSink';
import tween from 'helpers/tween';
import useIsInViewOnce from 'hooks/useIsInViewOnce';
import useLoadedImages from 'hooks/useLoadedImages';
import useSubSink from 'hooks/useSubSink';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  exhaustMap,
  filter,
  finalize,
  fromEvent,
  map,
  pairwise,
  takeUntil,
  merge,
  distinctUntilChanged,
  timer,
} from 'rxjs';

const TOTAL_FRAMES = 71;

export const getFrames = () =>
  Array.from(Array(TOTAL_FRAMES).keys()).map(i => `/static/images/free-money-watch/A${String(i).padStart(4, '0')}.png`);

const CircleDots: React.FC<{ progress: number; radius?: number; stroke?: number }> = ({
  radius = 200,
  stroke = 4,
  progress,
}) => {
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="absolute top-0 left-0 w-full h-full touch-none select-none pointer-events-none"
      preserveAspectRatio="none"
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
    >
      <circle
        strokeDasharray="0 15"
        strokeLinecap="round"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        stroke="#000"
      />
      <circle
        className="-rotate-90 origin-center"
        fill="transparent"
        stroke="rgba(250,250,249,0.90)"
        strokeWidth={stroke}
        strokeDashoffset={-strokeDashoffset}
        strokeDasharray={circumference + ' ' + circumference}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

const ThreeSixtyView = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const isInView = useIsInViewOnce(frameRef);
  const frames = useLoadedImages(useMemo(() => (isInView ? getFrames() : null), [isInView]));
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  useEffect(() => {
    const frameEl = frameRef.current;

    if (!frameEl) return;

    const subSink = createSubSink();

    const swipeDirection: { value?: 'h' | 'v' } = {};

    const start$ = merge(
      fromEvent<TouchEvent>(frameEl, 'touchstart', { passive: false }),
      fromEvent<MouseEvent>(frameEl, 'mousedown', { passive: false })
    );

    const move$ = merge(
      fromEvent<TouchEvent>(window, 'touchmove', { passive: false }),
      fromEvent<MouseEvent>(window, 'mousemove', { passive: false })
    );

    const end$ = merge(
      fromEvent<TouchEvent>(window, 'touchend'), //
      fromEvent<MouseEvent>(window, 'mouseup')
    );

    subSink.sink = start$
      .pipe(
        exhaustMap(() =>
          move$.pipe(
            takeUntil(end$),
            finalize(() => delete swipeDirection.value),
            pairwise(),
            map(([prev, next]) => {
              const prevX = 'touches' in prev ? prev.touches[0].clientX : prev.clientX;
              const nextX = 'touches' in next ? next.touches[0].clientX : next.clientX;
              const prevY = 'touches' in prev ? prev.touches[0].clientY : prev.clientY;
              const nextY = 'touches' in next ? next.touches[0].clientY : next.clientY;
              const xDiff = nextX - prevX;
              const yDiff = nextY - prevY;

              if (!swipeDirection.value)
                if (Math.abs(xDiff) >= Math.abs(yDiff)) swipeDirection.value = 'h';
                else swipeDirection.value = 'v';

              if (swipeDirection.value === 'h') next.preventDefault();
              else return 'idle';

              if (xDiff == 0) return 'idle';

              if (xDiff < 0) return 'left';
              else return 'right';
            }),
            filter(x => x !== 'idle')
          )
        )
      )
      .subscribe(direction =>
        setCurrentFrameIndex(prev =>
          direction === 'left' ? (prev + TOTAL_FRAMES - 1) % TOTAL_FRAMES : (prev + 1) % TOTAL_FRAMES
        )
      );

    const watchGrabber = frameEl.querySelector<HTMLElement>('[alt=Grabber]')!;

    subSink.sink = timer(0)
      .pipe(takeUntil(merge(fromEvent(frameEl, 'mousemove'), fromEvent(frameEl, 'touchmove', { passive: false }))))
      .subscribe(() => {
        anime.remove(watchGrabber);
        anime({
          targets: watchGrabber,
          opacity: [1, 1],
          duration: 1000,
          easing: 'easeInOutSine',
          translateX: ['-50%', '50%'],
          loop: true,
          direction: 'alternate',
        });
      });

    return () => subSink.unsubscribe();
  }, []);

  useEffect(() => {
    const sectionEl = sectionRef.current;

    if (!sectionEl) return;

    const leftTitleEl = sectionEl.querySelector<HTMLElement>('[data-title=left]')!;
    const rightTitleEl = sectionEl.querySelector<HTMLElement>('[data-title=right]')!;
    const topTitleEl = sectionEl.querySelector<HTMLElement>('[data-title=top]')!;
    const bottomTitleEl = sectionEl.querySelector<HTMLElement>('[data-title=bottom]')!;
    const scroll$ = fromEvent(window, 'scroll');
    const resize$ = fromEvent(window, 'resize');
    const load$ = timer(0);
    const subSink = createSubSink();

    const progress$ = merge(load$, scroll$, resize$).pipe(
      map(() =>
        [leftTitleEl, rightTitleEl, topTitleEl, bottomTitleEl].map(el => {
          const rect = el.getBoundingClientRect();
          const middle =
            (Math.min(window.innerHeight, Math.max(0, rect.top + rect.height / 2)) - window.innerHeight) * -1;
          const progress = Math.min(1, Math.max(0, middle / window.innerHeight));

          return isNaN(progress) ? 0 : progress;
        })
      )
    );

    subSink.sink = progress$
      .pipe(
        map(x => x[0]),
        distinctUntilChanged(),
        map(progress => [leftTitleEl, progress * 50 - 25] as const)
      )
      .subscribe(([el, rotate]) => (el.style.transform = `perspective(480px) rotateX(${rotate}deg) rotateY(20deg)`));

    subSink.sink = progress$
      .pipe(
        map(x => x[1]),
        distinctUntilChanged(),
        map(progress => [rightTitleEl, progress * 50 - 25] as const)
      )
      .subscribe(([el, rotate]) => (el.style.transform = `perspective(480px) rotateX(${rotate}deg) rotateY(-20deg)`));

    subSink.sink = progress$
      .pipe(
        map(x => x[2]),
        distinctUntilChanged(),
        map(progress => [topTitleEl, (progress * 80 - 40) * -1] as const)
      )
      .subscribe(([el, rotate]) => (el.style.transform = `perspective(480px) rotateX(${rotate}deg)`));

    subSink.sink = progress$
      .pipe(
        map(x => x[3]),
        distinctUntilChanged(),
        map(progress => [bottomTitleEl, (progress * 80 - 40) * -1] as const)
      )
      .subscribe(([el, rotate]) => (el.style.transform = `perspective(480px) rotateX(${rotate}deg)`));
    return () => subSink.unsubscribe();
  }, []);

  const rotationSubSink = useSubSink();

  const handleOnRotate = (side: 'top' | 'right' | 'back' | 'left') => {
    if (!frames || frames.length === 0) return;

    const start = currentFrameIndex;
    const end = {
      top: 0,
      right: Math.round(TOTAL_FRAMES * 0.75),
      back: Math.round(TOTAL_FRAMES * 0.5),
      left: Math.round(TOTAL_FRAMES * 0.25),
    }[side];

    if (start === end) return;

    const distance = { forward: 0, backward: 0 };

    if (start < end) {
      distance.forward = end - start;
      distance.backward = TOTAL_FRAMES - end + start;
    } else {
      distance.forward = TOTAL_FRAMES - start + end;
      distance.backward = start - end;
    }

    rotationSubSink.unsubscribe();

    rotationSubSink.sink = tween({
      start,
      end: distance.forward < distance.backward ? start + distance.forward : start - distance.backward,
      duration: 300,
      easing: x => 1 - Math.cos((x * Math.PI) / 2),
    })
      .pipe(map(Math.round), distinctUntilChanged())
      .subscribe(val => setCurrentFrameIndex((frames.length + val) % frames.length));
  };

  return (
    <section ref={sectionRef} className="relative py-12 md:py-16 bg-gray-10 overflow-hidden">
      <div className="container flex flex-col items-center justify-center">
        <div className="md:hidden text-white -mb-4 w-full text-center relative z-10 pointer-events-none">
          <h2
            data-title="top"
            className="uppercase font-bold fluid-text-4 bg-gray-90 text-white px-6 py-4 shadow-50 inline-block"
          >
            Free the money
          </h2>
        </div>

        <div className="relative w-full flex justify-center">
          <div className="w-[400px] max-w-full absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none">
            <div className="pb-full relative">
              <CircleDots progress={((currentFrameIndex + 1) / TOTAL_FRAMES) * 100} />
            </div>
          </div>

          <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-full pointer-events-none">
            <div className="row relative justify-around">
              <div className="col col--auto">
                <h2
                  data-title="left"
                  className="uppercase font-bold fluid-text-4 text-right bg-gray-90 text-white px-6 py-4 shadow-50 three-d-button"
                >
                  Free the <br className="xl:hidden" /> money
                </h2>
              </div>
              <div className="col col--auto offset--4">
                <h2
                  data-title="right"
                  className="uppercase font-bold fluid-text-4 bg-gray-90 text-white px-6 py-4 shadow-50"
                >
                  Free the <br className="xl:hidden" /> world
                </h2>
              </div>
            </div>
          </div>

          <div
            ref={frameRef}
            className="relative w-[400px] max-w-full cursor-[url(/static/images/pan--horizontal.svg)_32_32,auto] group"
          >
            <div className="pb-full relative">
              {!frames ? (
                <div className="absolute inset-0 flex items-center justify-center text-black z-10">
                  <Spinner size="xl" />
                </div>
              ) : (
                frames.map((frame, i) => (
                  <img
                    key={frame}
                    src={frame}
                    className={cn(
                      'absolute w-full h-full p-8 pointer-events-none',
                      currentFrameIndex === i ? 'opacity-100' : 'opacity-0'
                    )}
                    alt={`Watch frame #${i + 1}`}
                  />
                ))
              )}
            </div>
            <div className="absolute top-0 left-0 w-full h-full z-1 pointer-events-none flex md:justify-center items-center md:items-end">
              <img
                className="w-8 h-8 opacity-0 group-hover:!opacity-0 transition-opacity"
                width={172}
                height={172}
                src="/static/images/hand-drag.svg"
                alt="Grabber"
              />
            </div>
          </div>
        </div>
        <div className="md:hidden text-white -mt-4 w-full text-center relative z-10 pointer-events-none">
          <h2
            data-title="bottom"
            className="uppercase font-bold fluid-text-4 bg-gray-90 text-white px-6 py-4 shadow-50 inline-block"
          >
            Free the world
          </h2>
        </div>

        <div className="text-black mt-12 w-full max-w-[400px]">
          <div className="row -m-2">
            <div className="col col--3 p-2 flex justify-center">
              <button
                className={cn(
                  '-text-4 uppercase emphasised-link font-semibold',
                  currentFrameIndex > 0.875 * TOTAL_FRAMES || currentFrameIndex <= 0.125 * TOTAL_FRAMES
                    ? 'active'
                    : 'opacity-50 hover:opacity-100'
                )}
                onClick={() => handleOnRotate('top')}
              >
                Top <br className="xs:hidden" /> view
              </button>
            </div>
            <div className="col col--3 p-2 flex justify-center">
              <button
                className={cn(
                  '-text-4 uppercase emphasised-link font-semibold',
                  currentFrameIndex > 0.625 * TOTAL_FRAMES && currentFrameIndex <= 0.875 * TOTAL_FRAMES
                    ? 'active'
                    : 'opacity-50 hover:opacity-100'
                )}
                onClick={() => handleOnRotate('right')}
              >
                Right <br className="xs:hidden" /> view
              </button>
            </div>
            <div className="col col--3 p-2 flex justify-center">
              <button
                className={cn(
                  '-text-4 uppercase emphasised-link font-semibold',
                  currentFrameIndex > 0.375 * TOTAL_FRAMES && currentFrameIndex <= 0.625 * TOTAL_FRAMES
                    ? 'active'
                    : 'opacity-50 hover:opacity-100'
                )}
                onClick={() => handleOnRotate('back')}
              >
                Back <br className="xs:hidden" /> view
              </button>
            </div>
            <div className="col col--3 p-2 flex justify-center">
              <button
                className={cn(
                  '-text-4 uppercase emphasised-link font-semibold',
                  currentFrameIndex > 0.125 * TOTAL_FRAMES && currentFrameIndex <= 0.375 * TOTAL_FRAMES
                    ? 'active'
                    : 'opacity-50 hover:opacity-100'
                )}
                onClick={() => handleOnRotate('left')}
              >
                Left <br className="xs:hidden" /> view
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeSixtyView;
