import { SpanTypes, UIProps } from "@/types/ui";
import React, { FC } from "react";

const Text = ({ children, className = "", style }: UIProps) => {
  return (
    <h1 className={`${className}`} style={style}>
      {children}
    </h1>
  );
};


const Span: FC<SpanTypes> = ({text, className}) => {
  return(
    <span className={className}>{text}</span>
  )
}

export { Text, Span };
