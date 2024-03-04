import { useState, useEffect, forwardRef } from 'react';
import { useRouter } from 'next/router';

const CtaButton = forwardRef(
  (
    {
      id,
      disabled,
      children,
      noShadow = false,
      className,
      size,
      onClick,
      isLoading,
      roundedness,
      color,
      onClickRoute,
      dataTest = '',
      ...rest
    },
    ref,
  ) => {
    const router = useRouter();
    const [shouldShowSpinner, setShouldShowSpinner] = useState(!!isLoading);

    useEffect(() => {
      setShouldShowSpinner(isLoading);
      return () => setShouldShowSpinner(null);
    }, [isLoading]);

    const handleClick = async (...args) => {
      if (shouldShowSpinner || disabled) return;
      setShouldShowSpinner(true);

      try {
        if (onClickRoute) {
          await router.push(onClickRoute);
        } else {
          await onClick(...args);
        }
      } catch (error) {
        setShouldShowSpinner(false);
        throw error;
      }

      setShouldShowSpinner(false);
    };

    return (
      <button
        id={id}
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={handleClick}
        className="hover:shadow-lg active:shadow-inner flex text-[16px] items-center justify-center dezy-title-font cursor-pointer disabled:cursor-not-allowed disabled:shadow-none"
        data-test={dataTest}
        {...rest}
      >
        <span className={`relative ${shouldShowSpinner && 'mr-2'}`}>
          <span>{children}</span>
          {shouldShowSpinner && (
            <span className="absolute top-[50%] translate-y-[-50%] left-[50%] flex">
              loading...
            </span>
          )}
        </span>
      </button>
    );
  },
);

CtaButton.defaultProps = {
  size: 'MEDIUM',
  onClick: () => {},
  color: 'BLUE',
  roundedness: 'rounded-full',
};

export default CtaButton;
