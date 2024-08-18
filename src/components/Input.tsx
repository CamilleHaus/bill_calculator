interface IInput {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

const Input = ({ label, name, type, placeholder }: IInput) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-slate-800">{label}</label>
      <input 
      className="px-2 py-3 rounded-md"
      name={name} 
      type={type} 
      placeholder={placeholder} />
    </div>
  );
};

export default Input;
