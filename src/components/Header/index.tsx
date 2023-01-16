import anime from 'animejs';
import cn from 'classnames';
import Button from 'components/Button';
import Portal from 'components/Portal';
import socials from 'data/socials';
import createSubSink from 'helpers/createSubSink';
import useBodyScrollLock from 'hooks/useBodyScrollLock';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { filter, fromEvent, debounceTime, exhaustMap, takeUntil, map, distinctUntilChanged } from 'rxjs';

const menuItems = [
  {
    title: 'Mystery Box',
    href: '/mysterybox',
  },
  {
    title: 'Gaming Warlords',
    href: '/aoki',
  },
  {
    title: 'Our Story',
    href: '/our-story',
  },
  {
    title: 'Go to shop',
    href: 'https://shop.franckmullerencrypto.com',
  },
];

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const [mobileMenuEl, setMobileMenuEl] = useState<HTMLDivElement | null>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    const headerEl = headerRef.current;

    if (!headerEl) return;

    const subSink = createSubSink();
    const bannerEl = document.querySelector<HTMLElement>('main > :first-child')!;

    const hideHeader = () => {
      anime.remove(headerEl);

      anime({
        targets: headerEl,
        translateY: '-100%',
        easing: 'easeOutCubic',
        duration: 500,
      });
    };

    const showHeader = () => {
      anime.remove(headerEl);

      anime({
        targets: headerEl,
        translateY: 0,
        easing: 'easeOutCubic',
        duration: 500,
      });
    };

    const toggleHeaderOverlay = (value: boolean) => {
      anime.remove(headerEl.firstElementChild);

      anime({
        targets: headerEl.firstElementChild,
        opacity: value ? 0 : 0.6,
        easing: 'easeInCubic',
        duration: 500,
      });
    };

    const scroll$ = fromEvent(window, 'scroll', () => window.scrollY);

    const scrollStop$ = scroll$.pipe(debounceTime(100));

    const scrollStatus$ = scroll$.pipe(
      exhaustMap(startPosition =>
        scroll$.pipe(
          map(position => {
            const diff = position - startPosition;

            if (window.scrollY < headerEl.clientHeight) return 'up';

            if (diff < -headerEl.clientHeight) return 'up';
            else if (diff > 0) return 'down';

            return 'idle';
          }),
          distinctUntilChanged(),
          filter(status => status !== 'idle'),
          takeUntil(scrollStop$)
        )
      )
    );

    const banner$ = scroll$.pipe(
      map(() => window.scrollY < bannerEl.clientHeight - headerEl.clientHeight),
      distinctUntilChanged()
    );

    const up$ = scrollStatus$.pipe(filter(status => status === 'up'));
    const down$ = scrollStatus$.pipe(filter(status => status === 'down'));

    subSink.sink = banner$.subscribe(toggleHeaderOverlay);
    subSink.sink = up$.subscribe(showHeader);
    subSink.sink = down$.subscribe(hideHeader);

    return () => subSink.unsubscribe();
  }, []);

  useEffect(() => {
    if (!mobileMenuEl) return;

    anime.remove(mobileMenuEl);

    anime({
      targets: mobileMenuEl,
      translateX: isOpen ? 0 : '100%',
      opacity: isOpen ? 1 : 0,
      easing: 'easeInCubic',
      duration: 500,
    });
  }, [mobileMenuEl, isOpen]);

  useEffect(() => {
    const subscription = fromEvent(window, 'resize').subscribe(() => setIsOpen(false));

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const mobileMenuButtonEl = mobileMenuButtonRef.current;

    if (!mobileMenuButtonEl) return;

    anime.remove(mobileMenuButtonEl);

    const timeline = anime.timeline({ easing: 'easeInCubic', duration: 300 });

    timeline.add({
      targets: mobileMenuButtonEl.firstChild!.childNodes,
      rotate: 0,
      translateY: 0,
      easing: 'easeInCubic',
      duration: 150,
    });

    if (isOpen) {
      timeline
        .add(
          {
            targets: mobileMenuButtonEl.firstChild!.firstChild,
            rotate: '45deg',
            easing: 'easeInCubic',
          },
          150
        )
        .add(
          {
            targets: mobileMenuButtonEl.firstChild!.lastChild,
            rotate: '-45deg',
            easing: 'easeInCubic',
          },
          150
        );
    } else {
      timeline
        .add(
          {
            targets: mobileMenuButtonEl.firstChild!.firstChild,
            translateY: '0.4em',
            easing: 'easeInCubic',
          },
          150
        )
        .add(
          {
            targets: mobileMenuButtonEl.firstChild!.lastChild,
            translateY: '-0.4em',
            easing: 'easeInCubic',
          },
          150
        );
    }
  }, [isOpen]);

  return (
    <header ref={headerRef} className="fixed z-[100] top-0 left-0 w-full pointer-events-none">
      <div role="presentation" className="absolute inset-0 bg-black opacity-0" />
      <div className="container pt-6 pb-4 relative">
        <div className="row justify-between items-center flex-nowrap">
          <div className="col col--auto">
            <Link href="/">
              <a className="pointer-events-auto">
                <img
                  src="/static/images/frankmuller-encrypto-logo.png"
                  width={(40 / 480) * 1660}
                  height={40}
                  alt="Mystery Box"
                />
              </a>
            </Link>
          </div>
          <div className="col col--auto hidden lg:flex">
            <div className="row -m-3 items-center">
              {menuItems.map((item, i) => (
                <div key={i} className="col col--auto p-3 flex">
                  <Link href={item.href}>
                    <a
                      className={cn(
                        'emphasised-link -text-2 text-white uppercase',
                        router.pathname === item.href ? 'active pointer-events-none' : 'pointer-events-auto'
                      )}
                    >
                      {item.title}
                    </a>
                  </Link>
                </div>
              ))}
              <div className="col col--auto p-3 flex">
                <Link href="https://discord.com/invite/franckmullerencrypto" passHref>
                  <Button as="a" kind="outline" size="sm" className="pointer-events-auto">
                    Join Discord
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--auto lg:hidden">
            <button
              ref={mobileMenuButtonRef}
              className="text-white flex py-4 px-2 pointer-events-auto"
              onClick={() => setIsOpen(prev => !prev)}
            >
              <span className="block h-[2px] w-6 relative">
                <span className="absolute block h-full w-full bg-white"></span>
                <span className="absolute block h-full w-full bg-white"></span>
              </span>
            </button>
          </div>
          <Portal>
            <div
              ref={setMobileMenuEl}
              className={cn(
                'fixed -inset-0 bg-black z-[99] text-white overflow-auto flex flex-col justify-between',
                !isOpen && 'pointer-events-none'
              )}
              style={{ transform: 'translateX(100%)' }}
            >
              <div className="container pb-16 pt-32">
                <div className="row -m-1">
                  {menuItems.map((item, i) => (
                    <div key={i} className="col col--12 p-1 flex">
                      <Link href={item.href}>
                        <a
                          className={cn(
                            'emphasised-link text-2 font-medium text-white uppercase',
                            router.pathname === item.href && 'active pointer-events-none'
                          )}
                        >
                          {item.title}
                        </a>
                      </Link>
                    </div>
                  ))}
                  <div className="col col--12 p-1 flex">
                    <Link href="https://discord.com/invite/franckmullerencrypto">
                      <a className="emphasised-link text-2 font-medium text-white uppercase">Join Discord</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="container pb-8">
                <div className="row -m-2">
                  {socials.map(({ icon: Icon, href }) => (
                    <div key={href} className="col col--auto p-2">
                      <a href={href} className="opacity-50 hover:opacity-100" target="_blank" rel="noreferrer">
                        <Icon className="fill-current" height={24} width={24} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Portal>
        </div>
      </div>
    </header>
  );
};

export default Header;
