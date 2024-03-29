import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<Props> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div>
      <label
        className={`
          block text-sm font-medium leading-6 text-gray-900
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        type={type}
        className={`
          form-input
          block 
          w-full 
          rounded-md 
          border-0 
          py-1.5
          text-gray-900 
          shadow-sm 
          ring-1 
          ring-inset 
          ring-gray-300 
          placeholder:text-gray-400
          focus:ring-2 
          focus:ring-inset 
          focus:ring-orange-600 
          sm:text-sm 
          sm:leading-6
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
    `}
      ></input>
    </div>
  );
};

export default Input;
