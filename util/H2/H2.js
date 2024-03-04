import React from 'react';

// 'REGULAR': 'text-[30px] md:text-[48px]',

const SIZE_VS_CLASSES = {
  'REGULAR': 'text-[28px] md:text-[40px]',
};

function H2({ children, size, className, Element, ...rest }) {
  return (
    <Element {...rest} className={`dezy-title-font ${SIZE_VS_CLASSES[size]} ${className}`}>
      {children}
    </Element>
  );
}

H2.defaultProps = {
  size: 'REGULAR',
  Element: 'h2'
};

export default H2;
