import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    let variantClass = "";

    switch (variant) {
      case "outline":
        variantClass = "border border-gray-300 text-gray-700 hover:bg-gray-100";
        break;
      case "default":
      default:
        variantClass = "bg-blue-600 text-white hover:bg-blue-700";
        break;
    }

    const baseClass =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    return (
      <button
        className={`${baseClass} ${variantClass} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
