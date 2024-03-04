import React from 'react';

const SIZE_VS_CLASSES = {
  REGULAR: 'text-[34px] md:text-[48px]',
};

function H1({
  children, size, className, Element, ...rest
}) {
  return (
    <Element {...rest} className={`dezy-title-font ${SIZE_VS_CLASSES[size]} ${className}`}>
      {children}
    </Element>
  );
}

H1.defaultProps = {
  size: 'REGULAR',
  Element: 'h1',
};

export default H1;
