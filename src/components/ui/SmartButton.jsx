import React from 'react';
import PropTypes from 'prop-types';
const themes = {
  basic:
    'font-sans text-lg appearance-none relative block w-1/2 px-12 my-6 py-3 border border-transparent text-white bg-smartPurple rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smartPurple hover:bg-cyan-700 sm:text-base',
  small:
    'font-sans text-lg appearance-none my-4 mx-2 px-12 py-2 border-transparent text-white bg-smartPurple rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smartPurple hover:bg-cyan-700 sm:text-base',
};

const SmartButton = ({
  title,
  type = 'submit',
  className,
  theme = 'basic',
  onClick = () => {},
  children,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${themes[theme]} ${className}`}
    >
      {title}
      {children}
    </button>
  );
};

SmartButton.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf(['submit', 'button']),
  theme: PropTypes.oneOf(Object.keys(themes)),
  onClick: PropTypes.func,
};

export default SmartButton;
