import React from 'react';

function H5({ children, size, className, Element, ...rest }) {
  return (
    <Element {...rest} className={`dezy-title-font text-[18px] md:text-[20px] ${className}`}>
      {children}
    </Element>
  );
}

H5.defaultProps = {
  size: 'REGULAR',
  Element: 'h5'
};

export default H5;
