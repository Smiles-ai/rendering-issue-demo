import React from 'react';

const SIZE_VS_CLASSES = {
  REGULAR: 'text-[16px] md:text-[18px]',
  SMALL: 'text-[16px]',
};

function Body1({
  children, size, className, Element, ...rest
}) {
  return (
    <Element {...rest} className={`dezy-body-font ${SIZE_VS_CLASSES[size]} ${className}`}>
      {children}
    </Element>
  );
}

Body1.defaultProps = {
  size: 'REGULAR',
  Element: 'p',
};

export default Body1;
