import cn from 'classnames';
import Spinner from 'components/Spinner';
import createSubSink from 'helpers/createSubSink';
import useIsInViewOnce from 'hooks/useIsInViewOnce';
import { useEffect, useState } from 'react';
import { delay, filter, first, fromEvent, merge } from 'rxjs';
import { ReactComponent as Play } from 'svgs/play--filled--alt.svg';

const videoIsPlaying = (video: HTMLVideoElement) => !video.paused && !video.ended && video.readyState > 2;

interface VideoBackgroundProps extends React.ComponentProps<'video'> {
  src: string;
  captions: string;
  playbackRate?: number;
  bgImage?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  captions,
  playbackRate = 1,
  autoPlay,
  bgImage,
  ...props
}) => {
  const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [isPlaying, setPlaying] = useState(autoPlay);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const isInView = useIsInViewOnce(containerEl);
  const [preloadedSrc, setPreloadedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!isInView) return;

    fetch(src)
      .then(res => res.blob())
      .then(URL.createObjectURL)
      .then(setPreloadedSrc);
  }, [isInView, src]);

  useEffect(() => {
    if (!videoEl) return;

    videoEl.playbackRate = playbackRate;

    let isMounted = true;
    const subSink = createSubSink();

    subSink.sink = fromEvent(videoEl, 'play')
      .pipe(delay(300))
      .subscribe(() => isMounted && setPlaying(true));

    if (typeof autoPlay === 'undefined' || autoPlay)
      // play video on click or touch
      subSink.sink = merge(
        fromEvent(window, 'scroll').pipe(first()),
        fromEvent(window, 'click'),
        fromEvent(window, 'touchstart')
      )
        .pipe(filter(() => !videoIsPlaying(videoEl)))
        .subscribe(videoEl.play.bind(videoEl));

    return () => {
      subSink.unsubscribe();
      isMounted = false;
    };
  }, [videoEl, preloadedSrc, playbackRate, autoPlay]);

  return (
    <div className="absolute inset-0 w-full h-full" ref={setContainerEl}>
      {preloadedSrc && (
        <video
          ref={setVideoEl}
          loop
          playsInline
          muted
          autoPlay={autoPlay === false ? false : true}
          {...props}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: isPlaying || (preloadedSrc && autoPlay === false) ? 1 : 0 }}
        >
          <source src={preloadedSrc} type="video/mp4" />
          <track kind="captions" label={captions} />
          Your browser does not support the video tag.
        </video>
      )}

      <div
        className={cn(
          'absolute inset-0 w-full h-full flex items-center justify-center text-white',
          (isPlaying || (preloadedSrc && autoPlay === false)) && 'pointer-events-none'
        )}
        style={{ opacity: isPlaying || (preloadedSrc && autoPlay === false) ? 0 : 1 }}
      >
        <Spinner size="xl" />
      </div>

      {!hasPlayedOnce && bgImage && (
        <div
          className={cn(
            'absolute inset-0 w-full h-full text-white flex items-center justify-center',
            !(isPlaying || (preloadedSrc && autoPlay === false)) && 'pointer-events-none'
          )}
          style={{ opacity: !(isPlaying || (preloadedSrc && autoPlay === false)) ? 0 : 1 }}
        >
          <img className="absolute inset-0 w-full h-full object-cover object-center" src={bgImage} alt={captions} />
          <button
            className="relative fill-current flex p-2 bg-white rounded-full bg-opacity-10 hover:bg-opacity-25 border-2 border-white"
            onClick={() => (videoEl?.play(), setHasPlayedOnce(true))}
          >
            <Play />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoBackground;
