import useEvent from 'hooks/useEvent';
import { useEffect, useState } from 'react';
import { animationFrames, distinctUntilChanged, filter, map } from 'rxjs';

interface CountdownProps {
  endDate: Date;
}

const Countdown: React.FC<CountdownProps> = props => {
  const [counter, setCounter] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const endDate = useEvent(props.endDate);

  useEffect(() => {
    const subscription = animationFrames()
      .pipe(
        map(({ elapsed }) => Math.round(elapsed / 1000)),
        distinctUntilChanged(),
        map(() => Math.max(0, Math.round(endDate().getTime() - Date.now()) / 1000)),
        filter(time => time >= 0),
        distinctUntilChanged()
      )
      .subscribe(x =>
        setCounter({
          days: Math.floor(x / (60 * 60 * 24)),
          hours: Math.floor((x / (60 * 60)) % 24),
          minutes: Math.floor((x / 60) % 60),
          seconds: Math.floor(x % 60),
        })
      );

    return () => subscription.unsubscribe();
  }, [endDate]);

  return (
    <div className="row -m-1 justify-center mt-8">
      {Object.entries(counter).map(([key, value]) => (
        <div key={key} className="col auto p-1 text-center">
          <p className="uppercase -text-6 xs:-text-4 mb-2">{key}</p>
          <div className="relative w-14 h-14 xs:w-20 xs:h-20 flex items-center justify-center text-2 xs:text-4">
            <span role="presentation" className="block absolute inset-0 bg-white opacity-5" />
            <span className="relative font-bold">{String(value).padStart(2, '0')}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
