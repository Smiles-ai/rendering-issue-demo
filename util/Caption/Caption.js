import React from 'react';

function Caption({ children, size, className, Element, ...rest }) {
  return (
    <Element {...rest} className={`dezy-subtitle-font text-[3vw] sm:text-[14px] ${className}`}>
      {children}
    </Element>
  );
}

Caption.defaultProps = {
  size: 'REGULAR',
  Element: 'p'
};

export default Caption;
