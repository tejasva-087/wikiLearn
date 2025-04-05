import React from "react";

function NumberCircle({ num, className }) {
  return <p className={`number-circle text-secondary ${className}`}>{num}</p>;
}

export default NumberCircle;
