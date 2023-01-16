import cn from 'classnames';
import { forwardRef } from 'react';

export type ButtonProps<T extends 'a' | 'button' = 'button'> = JSX.IntrinsicElements[T] & {
  as?: T;
  kind?: 'outline' | 'fill' | 'primary' | 'secondary' | 'success' | 'danger' | 'binance';
  isOutlined?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isBlock?: boolean;
  endIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  startIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    as: Component = 'button',
    size = 'md',
    kind = 'primary',
    isBlock = false,
    className,
    children,
    isLoading = false,
    endIcon: EndIcon,
    startIcon: StartIcon,
    isOutlined = false,
    type,
    ...props
  },
  ref
) => {
  return (
    <Component
      className={cn(
        'inline-block relative leading-6 rounded-2xl focus:ring-2 border-2 text-left px-4 uppercase',

        {
          sm: 'py-1 -text-3',
          md: 'py-2 -text-2',
          lg: 'py-4 -text-2',
        }[size],

        {
          outline: 'text-white border-white hover:bg-white hover:text-black',
          fill: 'bg-white text-black border-transparent',
          primary: isOutlined
            ? ' border-blue-60 text-blue-60 hover:bg-blue-60 hover:text-white'
            : 'bg-blue-60 text-white border-transparent',
          secondary: 'bg-gray-30 border-transparent',
          success: isOutlined
            ? ' border-green-60 text-green-60 hover:bg-green-60 hover:text-white'
            : 'bg-green-60 text-white border-transparent',
          danger: isOutlined
            ? ' border-red-60 text-red-60 hover:bg-red-60 hover:text-white'
            : 'bg-red-60 text-white border-transparent',
          binance: 'text-black bg-[#FCD435] border-transparent',
        }[kind],

        isBlock && 'block w-full',

        props.disabled && 'opacity-50 cursor-not-allowed',

        StartIcon && 'pl-9',

        (isLoading || EndIcon) && 'pr-12',

        className
      )}
      type={type ?? 'button'}
      {...props}
      ref={ref}
      {...((Component as unknown) === 'a' && { type })}
    >
      {StartIcon && (
        <StartIcon className="block h-6 w-6 absolute top-1/2 left-4 -translate-y-1/2 fill-current" aria-hidden />
      )}

      {children}

      {isLoading ? (
        <span className="block h-6 w-6 absolute top-1/2 right-4 -translate-y-1/2" aria-hidden>
          <span className="block w-full h-full animate-spin border rounded-full border-t-transparent border-b-transparent" />
        </span>
      ) : (
        EndIcon && (
          <EndIcon className="block h-6 w-6 absolute top-1/2 right-4 -translate-y-1/2 fill-current" aria-hidden />
        )
      )}
    </Component>
  );
};

export default forwardRef(Button) as {
  <T extends 'a' | 'button' = 'button'>(props: ButtonProps<T>): JSX.Element;
};
