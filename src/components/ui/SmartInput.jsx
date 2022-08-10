import React from 'react';
import PropTypes from 'prop-types';

const SmartInput = ({
  imageSrc,
  imageWidth = 30,
  isRequired,
  title,
  name,
  value,
  onChange,
  placeholder = title,
  type = 'text',
  inputProps = {},
  onBlur,
  onFocus,
  isValid = value === '' ? false : true,
}) => {
  return (
    <div className="inputForm">
      {title && (
        <label className="text-basic-gray text-base labelForm">
          {isRequired && <span className="text-smartPurple pr-1">*</span>}
          {title}
        </label>
      )}
      {imageSrc && (
        <span className="iconInputForm">
          <img
            className="mx-auto"
            src={imageSrc}
            width={imageWidth}
            alt="icon"
          />
        </span>
      )}
      <input
        {...inputProps}
        name={name}
        onChange={onChange}
        type={type}
        value={value}
        required={isRequired}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        className={`${
          !isValid && 'border-red-400'
        } font-sans bg-transparent text-lg appearance-none relative block w-full mt-6 mb-0 px-12 py-3 border border-borders-gray placeholder-gray-500 text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base`}
      />
      {
        // border-red-400
      }
      {!isValid && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-12 py-3 rounded-full relative"
          role="alert"
        >
          <strong className="font-bold">Campo Requerido!</strong>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
        </div>
      )}
    </div>
  );
};

SmartInput.propTypes = {
  imageSrc: PropTypes.string,
  imageWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isRequired: PropTypes.bool,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'tel', 'email', 'date']),
};

export default SmartInput;
