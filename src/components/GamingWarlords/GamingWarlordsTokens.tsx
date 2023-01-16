import { useEffect, useRef, useState } from 'react';
import type Swiper from 'swiper';

const slides = [
  {
    image: '/static/images/tokens/0001.png',
    content:
      "Aoki's helmet is a K9-3 riot gear helmet, which must be equipped when going into battle. Aoki Slaons will be wearing the helmet at all times when battling inside the metaverse.",
  },
  {
    image: '/static/images/tokens/0002.png',
    content:
      "Aoki's rifle, a custom modified H&K 9mm MP5 with unmatched precision and power, to end any conflict before it even starts.",
  },
  {
    image: '/static/images/tokens/0003.png',
    content: "The EMP grenade, an essential in Aoki's arsenal.",
  },
  {
    image: '/static/images/tokens/0004.png',
    content:
      "Aoki's Armor consists of custom Kevlar plates and is famous for its indestructible characteristics. Nonetheless, it is light and ideal for quick movements and executions.",
  },
  {
    image: '/static/images/tokens/0005.png',
    content:
      "Aoki's boots are tailor-made to ward off bullets and other dangerous obstacles. With this, Aoki makes sure that she is always one step ahead of the competition.",
  },
  {
    image: '/static/images/tokens/0006.png',
    content:
      "Aoki's jetpack is an important part of her outfit. With it, she is always more agile than her enemy. She moves faster in the field with the jetpack.",
  },
  {
    image: '/static/images/tokens/0007.png',
    content: "Aoki's breastplate, stamped with gold components, protects her from all types of weapons.",
  },
  {
    image: '/static/images/tokens/0008.png',
    content:
      "Aoki's breastplate is made of gold components, this gold ensures that she is protected from all kinds of weapons that may come her way.",
  },
  {
    image: '/static/images/tokens/0009.png',
    content:
      "Aoki's rapid-fire gun, Sig-Sauer SP2022 Customised especially for Aoki. This specially made gun will never leave her side and serves as a safety if the situation gets out of hand.",
  },
  {
    image: '/static/images/tokens/0010.png',
    content:
      'The Decentralized Country is a labyrinthine place, filled with euphoria, screams and excitement, but also with hatred, crime and despair. No one of sufficiently high rank would dare to step into this space without protection. And an effective one.',
  },
  {
    image: '/static/images/tokens/0011.png',
    content:
      'Decentralized Land, a place marked by the essence of cryptocurrencies, the realm of and for gamers. A meeting place for all types of individuals of the sphere, but also full of dangers. A typical saying of Decentralized Land is "Trust no one"',
  },
  {
    image: '/static/images/tokens/0012.png',
    content: 'Aoki Sloane, the Gaming Warlords Girl, also referred to as the Gaming Warlord.',
  },
  {
    image: '/static/images/aokis-armor-02.png',
    content:
      'The necklace of Aoki is a sign of knowledge and experience within the crypto market. It never leaves her neck, as it is a sign of conquest.',
  },
  {
    image: '/static/images/tokens/0014.png',
    content:
      "Don't be fooled by her appearance. Aoki Sloane is a fearless and lethal warrior who most of his opponents fear. Her top-of-the-line equipment is part of the reason for this, as it wanders with her on all of her adventures.",
  },
];

const GamingWarlordsTokens = () => {
  const swiperEl = useRef<HTMLDivElement>(null);
  const swiper = useRef<Swiper | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    import('swiper').then(({ default: Swiper }) => {
      if (!swiperEl.current) return;

      swiper.current = new Swiper(swiperEl.current, {
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
  }, []);

  const currentSlide = slides[currentIndex] ?? slides[0];

  return (
    <>
      <section className="relative text-white py-16">
        <img
          className="absolute inset-0 object-cover object-center w-full h-full pointer-events-none"
          src="/static/images/bg-pattern.jpg"
          alt="Background"
          role="presentation"
          aria-hidden
        />
        <div className="container">
          <div className="row items-center">
            <div className="col col--12 md:col--6 prose fluid-text-0 order-2 md:order-1">
              <p>{currentSlide.content}</p>
            </div>
            <div className="col col--12 md:col--5 md:offset--1 order-1 md:order-2">
              <div ref={swiperEl} className="swiper-container overflow-hidden relative">
                <div className="swiper-wrapper">
                  {slides.map((slide, i) => (
                    <div key={i} className="swiper-slide">
                      <div className="w-full relative" style={{ paddingBottom: `${(3 / 4) * 100}%` }}>
                        <img
                          className="absolute w-full h-full top-0 left-0 fade-in object-contain object-center"
                          src={slide.image}
                          alt="Aoki's Armors"
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
    </>
  );
};

export default GamingWarlordsTokens;
