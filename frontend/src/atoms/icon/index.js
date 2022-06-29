import { func, string } from "prop-types";
import React from "react";

import "./icon.scss";

const Icon = ({ alt, src, height, width, id, onClick }) => {
  return (
    <img
      src={src}
      alt={alt}
      height={height}
      className="svg-icon"
      width={width}
      id={id}
      onClick={onClick}
    />
  );
};

Icon.propTypes = {
  alt: string,
  src: string.isRequired,
  height: string,
  width: string,
  id: string,
  onClick: func,
};

export default Icon;
