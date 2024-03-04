import React from 'react';

// 'REGULAR': 'text-[24px] md:text-[40px]',

const SIZE_VS_CLASSES = {
  REGULAR: 'text-[24px] md:text-[36px]',
};

function H3({ children, size, className, Element, ...rest }) {
  return (
    <Element {...rest} className={`dezy-title-font ${SIZE_VS_CLASSES[size]} ${className}`}>
      {children}
    </Element>
  );
}

H3.defaultProps = {
  size: 'REGULAR',
  Element: 'h3',
};

export default H3;
