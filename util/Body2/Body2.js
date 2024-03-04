import React from 'react';

function Body2({
  children, size, className, Element, ...rest
}) {
  return (
    <Element {...rest} className={`dezy-body-font text-[14px] ${className}`}>
      {children}
    </Element>
  );
}

Body2.defaultProps = {
  size: 'REGULAR',
  Element: 'p',
};

export default Body2;
