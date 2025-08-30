import React, { forwardRef, ButtonHTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import clsx from "clsx";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  variants: {
    variant: {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-300",
      outline: "border border-gray-300 text-gray-900 hover:bg-gray-100 focus:ring-gray-300",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-200",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
    },
    size: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
      icon: "p-2 rounded-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  wrapperClassName?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      loading = false,
      disabled,
      wrapperClassName,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={wrapperClassName}>
        <button
          ref={ref}
          disabled={disabled || loading}
          className={clsx(buttonVariants({ variant, size }), className)}
          {...rest}
        >
          {loading ? "Loading..." : children}
        </button>
      </div>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
