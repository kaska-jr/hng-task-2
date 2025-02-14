import React from "react";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        {...props}
        ref={ref}
        type={type}
        className={`input ${className} `}
      />
    </div>
  );
});

Input.displayName = "Input";

export { Input };
