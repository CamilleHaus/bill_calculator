import { FormEvent } from "react";

interface IButton {
  children: React.ReactNode;
  onClick?: (e: FormEvent) => void;
  type: "submit" | "reset" | "button" | undefined;
}

const Button = ({ children, onClick, type }: IButton) => {
  return (
    <button
      className="w-full text-slate-50 bg-slate-800 py-3 rounded-full flex items-center justify-center text-sm"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
