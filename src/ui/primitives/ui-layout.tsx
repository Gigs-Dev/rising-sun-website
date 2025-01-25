import { UIProps } from "@/types/ui";
import React from "react";

const Box = ({ children, className = "", style, onClick }: UIProps) => {
  return (
    <div className={`${className}`} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

const HStack = ({ children, className = "", style }: UIProps) => {
  return (
    <div className={`flex items-center flex-wrap ${className}`} style={style}>
      {children}
    </div>
  );
};

const Flex = ({ children, className = "", style }: UIProps) => {
  return (
    <div className={`flex items-center ${className}`} style={style}>
      {children}
    </div>
  );
};

export { Box, HStack, Flex };
