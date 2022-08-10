import React from "react";
import PropTypes from "prop-types";

const TitleBlock = ({ text = "", styleCont = {} }) => {
  return (
    <div className="w-full text-center pb-10" style={{ ...styleCont }}>
      <span className="cssTitlePage text-smartDark font-bold text-xl">{text}</span>
    </div>
  );
};

TitleBlock.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default TitleBlock;
