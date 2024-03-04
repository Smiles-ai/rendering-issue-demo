import React from 'react';

const SIZE_VS_CLASSES = {
  'REGULAR': 'text-[16px] md:text-[18px]',
  'SMALL': 'text-[16px]'
};

function H6({ children, size, className, Element, ...rest }) {
  return (
    <Element {...rest} className={`dezy-subtitle-font ${SIZE_VS_CLASSES[size]} ${className}`}>
      {children}
    </Element>
  );
}

H6.defaultProps = {
  size: 'REGULAR',
  Element: 'h6'
};

export default H6;
