import { forwardRef } from "react";

interface IInput {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  ref?: React.Ref<HTMLInputElement>;
}

const Input = forwardRef<
  HTMLInputElement,
  IInput & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, name, type, placeholder, ...rest }, ref) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-[#666666] font-semibold ">{label}</label>
      <input
        className="px-2 py-3 rounded-md placeholder:text-sm"
        name={name}
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
    </div>
  );
});

Input.displayName = "Input";

export default Input;
