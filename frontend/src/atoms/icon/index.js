import { string } from "prop-types";
import React from "react";

import "./icon.scss";

const Icon = ({ alt, src, height, width, id }) => {
  return (
    <img
      src={src}
      alt={alt}
      height={height}
      className="svg-icon"
      width={width}
      id={id}
    />
  );
};

Icon.propTypes = {
  alt: string,
  src: string.isRequired,
  height: string,
  width: string,
  id: string,
};

export default Icon;
