import React from "react";
import PropTypes from "prop-types";

const TitleSection = ({ title }) => {
  return (
    <h3 className="tituloPaso4 mx-auto text-center text-normalPurple text-base pb-2 border-b-normalPurple">
      {title}
    </h3>
  );
};

TitleSection.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TitleSection;
