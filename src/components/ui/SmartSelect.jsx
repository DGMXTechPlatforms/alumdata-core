import React from 'react';
import PropTypes from 'prop-types';

const SmartSelect = ({
  imageSrc,
  imageWidth = 30,
  isRequired,
  placeholder = '--',
  placeholderValue = '',
  title = null,
  name,
  onChange,
  onBlur,
  options,
  defaultValue = '',
  value,
  inputProps = {},
  isValid = true,
}) => {
  return (
    <div className="inputForm">
      <div style={{ display: 'inline-block', width: '100%' }}>
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
        <select
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          required={isRequired}
          className="form-select font-sans bg-transparent text-lg pr-24 relative block w-full mt-6 mb-0 px-12 py-3 border border-borders-gray text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
          placeholder="Origen del dato"
          defaultValue={defaultValue}
          {...inputProps}
        >
          <option value={placeholderValue}>{placeholder}</option>
          {options.map((opt) => {
            return (
              <option key={opt.key} value={opt.key}>
                {opt.value}
              </option>
            );
          })}
        </select>
      </div>
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

SmartSelect.propTypes = {
  imageSrc: PropTypes.string,
  imageWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SmartSelect;
