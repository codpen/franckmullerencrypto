import cn from 'classnames';

interface TitleBannerProps {
  height?: 'sm' | 'md' | 'lg';
  backgroundImage?: string;
  title: string;
}

const TitleBanner: React.FC<TitleBannerProps> = ({ height = 'lg', title, backgroundImage }) => {
  return (
    <section
      className={cn('relative overflow-hidden flex items-center justify-center bg-black', {
        'h-[160px]': height === 'sm',
        'h-[240px]': height === 'md',
        'h-[320px]': height === 'lg',
      })}
    >
      {backgroundImage && (
        <img
          src={backgroundImage}
          className="absolute inset-0 object-cover object-center w-full h-full"
          role="presentation"
          alt={title}
        />
      )}
      <div role="presentation" className="absolute inset-0 bg-black opacity-25" />
      <div className="container relative text-center">
        <h1 className="fluid-text-6 font-bold uppercase text-white">{title}</h1>
      </div>
    </section>
  );
};

export default TitleBanner;
