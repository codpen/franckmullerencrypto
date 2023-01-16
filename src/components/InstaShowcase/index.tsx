import cn from 'classnames';
import React from 'react';
import { ReactComponent as LogoInstagram } from 'svgs/logo--instagram.svg';

const posts = [
  {
    image: 'static/images/jordyn-woods-01.jpg',
    link: '/',
    content: 'Jordyn Woods',
  },
  {
    image: 'static/images/swae-lee.jpg',
    link: '/',
    content: 'Swae Lee',
  },
  {
    image: 'static/images/faze-banks.jpg',
    link: '/',
    content: 'Faze Banks',
  },
  {
    image: 'static/images/young-thug.jpg',
    link: '/',
    content: 'Young Thug',
  },
  {
    image: 'static/images/24kgoldn.jpg',
    link: '/',
    content: '24kGoldn',
  },
  {
    image: 'static/images/gunna.jpg',
    link: '/',
    content: 'Gunna',
  },
  {
    image: 'static/images/ty-dolla-sign.jpg',
    link: '/',
    content: 'Ty Dolla Sign',
  },
  {
    image: 'static/images/kaash-paige.jpg',
    link: '/',
    content: 'Kaash Paige',
  },
];

const InstaShowcase = () => {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="w-[240px] mx-auto">
        <div className="relative w-full pb-[calc(5/4*100%)]">
          {posts.map((post, i, { length }) => (
            <a
              key={i}
              href="https://www.instagram.com/stories/highlights/17878434202806504"
              className={cn('block carousel absolute left-0 w-full h-full group', i % 2 === 0 ? '-top-12' : 'top-12')}
              style={
                {
                  '--width': 2400,
                  animationDuration: `${10000 * length}ms`,
                  animationDelay: `-${i * 10000}ms`,
                } as React.CSSProperties
              }
            >
              <img
                className={cn(
                  'w-full h-full object-cover',
                  post.content === 'Gunna'
                    ? 'object-left'
                    : post.content === 'Ty Dolla Sign'
                    ? 'object-right'
                    : post.content === 'Swae Lee'
                    ? 'object-right-bottom'
                    : 'object-center'
                )}
                src={post.image}
                alt={post.content}
              />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black" />
              <div className="absolute inset-0 text-white flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="absolute inset-0 bg-black opacity-25" role="presentation" />
                <LogoInstagram className="relative fill-current" />
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="-text-2">{post.content}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstaShowcase;
