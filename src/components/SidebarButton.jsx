import { tv } from "tailwind-variants";

const SidebarButton = ({ children, color }) => {
  const sidebarbutton = tv({
    base: "flex items-center gap-2 rounded-lg px-6 py-3",
    variants: {
      color: {
        unselected: "text-brand-dark_blue",
        selected: "bg-[#E6F7F8] text-brand-primary",
      },
    },
    defaultVariants: {
      color: "unselected",
    },
  });

  return (
    <a href="#" className={sidebarbutton({ color })}>
      {children}
    </a>
  );
};

export default SidebarButton;
