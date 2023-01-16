import { animationFrames, defer, endWith, identity, map, startWith, takeWhile } from 'rxjs';

const durationFn = (ms: number) =>
  defer(() =>
    animationFrames().pipe(
      map(({ elapsed }) => elapsed / ms),
      takeWhile(t => t < 1),
      endWith(1)
    )
  );

interface TweensArgs {
  start: number;
  end: number;
  duration: number;
  easing?: (t: number) => number;
}

const tween = ({ start, end, duration, easing = identity }: TweensArgs) =>
  durationFn(duration).pipe(
    startWith(0),
    map(d => easing(d) * (end - start) + start)
  );

export default tween;
