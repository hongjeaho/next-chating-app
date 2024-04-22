import Input from "@/components/form/Input";
import { register } from "module";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  required: boolean;
  placeholder: string;
}

const MessageInput: React.FC<Props> = ({ id, register }) => {
  return <div></div>;
};

export default MessageInput;
