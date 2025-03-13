const Button = ({ children, variant = "primary", ...rest }) => {
  const getVariantClasses = () => {
    if (variant === "ghost") {
      return "text-[#818181] bg-transparent";
    }
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white";
    }
  };

  return (
    <button
      className={`flex items-center gap-2 rounded-md px-3 py-1 text-xs font-semibold transition hover:opacity-75 ${getVariantClasses()}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
