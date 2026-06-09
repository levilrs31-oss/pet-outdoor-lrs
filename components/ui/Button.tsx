/* components/ui/Button.tsx */

interface ButtonProps {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  href?: string;
}

export default function Button({
  variant = "solid",
  size = "md",
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  href,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-sans font-medium tracking-[0.15em] uppercase text-xs transition-all duration-[250ms] ease-out cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes = {
    sm: "h-9 px-5",
    md: "h-11 px-7",
    lg: "h-13 px-9",
  };

  const variants = {
    solid:
      "bg-brand text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(45,74,62,0.25)] active:translate-y-px active:shadow-none",
    outline:
      "border border-white text-white hover:bg-action hover:border-action hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(193,127,74,0.25)] active:translate-y-px",
    ghost:
      "text-brand underline underline-offset-4 hover:text-action decoration-transparent hover:decoration-action transition-all",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}