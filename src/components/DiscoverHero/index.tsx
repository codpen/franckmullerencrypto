import Button from 'components/Button';
import createSubSink from 'helpers/createSubSink';
import { useEffect, useRef } from 'react';
import { distinctUntilChanged, fromEvent, merge, throttleTime } from 'rxjs';
import { ReactComponent as ChevronDown } from 'svgs/chevron--down.svg';

const DiscoverHero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;

    if (!sectionEl) return;

    const subSink = createSubSink();
    const images = Array.from(sectionEl.querySelectorAll('img')).slice(1);

    images.forEach(image => (image.style.transition = 'transform 300ms cubic-bezier(0.61, 1, 0.88, 1)'));

    const setTransform = ({ x, y }: { x: number; y: number }) =>
      images.forEach((image, index) => {
        const shift = (index - 3 - images.length) * -1;

        image.style.transform = `translate(${shift * -x}%, ${shift * -y}%)`;
      });

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
      .subscribe(setTransform);

    return () => subSink.unsubscribe();
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-32 pb-12 overflow-hidden">
      <img
        className="absolute inset-0 object-cover object-center w-full h-full pointer-events-none"
        src="/static/images/bg-pattern.jpg"
        alt="Background"
        role="presentation"
        aria-hidden
      />
      <div className="container flex flex-col justify-center">
        <div className="relative pb-1/2">
          {Array.from(Array(7).keys()).map(index => (
            <img
              key={index}
              className="absolute top-0 left-0 w-full h-auto"
              src={`/static/images/discover-banner/00${index + 1}.png`}
              alt="Watches"
            />
          ))}
          <div className="absolute w-full bottom-[10%] left-0">
            <img
              className="relative w-1/3 h-auto mx-auto"
              src="/static/images/mystery-by-franck-muller.png"
              alt="Watch Face"
            />
          </div>
        </div>
        <div className="mx-auto text-white mt-8 lg:-mt-8">
          <Button
            className="mb-2"
            onClick={() =>
              sectionRef.current &&
              window.scrollBy({
                top: sectionRef.current.getBoundingClientRect().bottom,
                behavior: 'smooth',
              })
            }
            kind="outline"
            size="lg"
          >
            Discover
          </Button>

          <ChevronDown className="fill-current mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default DiscoverHero;
