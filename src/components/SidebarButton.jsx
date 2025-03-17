const SidebarButton = ({ children, variant = "unselected" }) => {
  const getVariantClasses = () => {
    if (variant === "unselected") {
      return "text-brand-dark_blue";
    }
    if (variant === "selected") {
      return "bg-[#E6F7F8] text-brand-primary";
    }
  };

  return (
    <a
      href="#"
      className={`flex items-center gap-2 rounded-lg px-6 py-3 ${getVariantClasses()}`}
    >
      {children}
    </a>
  );
};

export default SidebarButton;
