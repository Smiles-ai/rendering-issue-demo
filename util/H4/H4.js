import React from 'react';

const SIZE_VS_CLASSES = {
  REGULAR: 'text-[20px] md:text-[28px]',
};

function H4({ children, size, className, Element, ...rest }) {
  return (
    <Element {...rest} className={`dezy-title-font ${SIZE_VS_CLASSES[size]} ${className}`}>
      {children}
    </Element>
  );
}

H4.defaultProps = {
  size: 'REGULAR',
  Element: 'h4',
};

export default H4;
