interface IButton {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: IButton) => {
  return (
    <button
      className="w-full text-slate-50 bg-slate-800 py-3 rounded-md flex items-center justify-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
