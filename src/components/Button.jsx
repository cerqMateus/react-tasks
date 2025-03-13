const Button = ({
  children,
  variant = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    if (variant === "ghost") {
      return "text-[#818181] bg-transparent";
    }
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white";
    }
    if (variant === "secondary") {
      return "bg-[#EEEEEE] text-[#35383E]";
    }
  };

  const getSizeClasses = () => {
    if (size === "small") {
      return "py-1 text-xs";
    }
    if (size === "large") {
      return "py-2 text-sm";
    }
  };

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-md px-3 font-semibold transition hover:opacity-75 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
