// import { Loader } from "lucide-react";
import React from "react";

const Button = React.forwardRef(
  ({ className, loading, outline, disabled, children, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        disabled={disabled}
        className={`button-general ${
          outline ? "button-outline" : "button-filled"
        } ${disabled ? "button-disabled" : ""} ${className}`}
      >
        {/* {loading && <Loader className="w-4 h-4 mr-2 animate-spin" />} */}
        {children}
      </button>
    );
  }
);

export default Button;
