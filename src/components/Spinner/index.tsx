import cn from 'classnames';

interface SpinnerProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Spinner: React.FC<SpinnerProps> = ({ size }) => {
  return (
    <span
      className={cn(
        'block',
        {
          xs: 'h-4 w-4',
          sm: 'h-6 w-6',
          md: 'h-8 w-8',
          lg: 'h-10 w-10',
          xl: 'h-12 w-12',
        }[size]
      )}
      aria-hidden
    >
      <span className="block w-full h-full animate-spin border-2 rounded-full border-t-transparent border-b-transparent" />
    </span>
  );
};

export default Spinner;
