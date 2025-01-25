import { UIProps } from "@/types/ui";
import React from "react";

const Text = ({ children, className = "", style }: UIProps) => {
  return (
    <h1 className={`${className}`} style={style}>
      {children}
    </h1>
  );
};

export { Text };
