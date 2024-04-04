import Link from "next/link";
import { IconType } from "react-icons";

interface Props {
  href: string;
  label: string;
  icon: IconType;
  active: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<Props> = ({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="group flex gab-x-3 text-sm-leading-6 font-semibold w-full justify-center p-4 hover:text-black hover:bg-gray-100"
    >
      <Icon className="w-6 h-6 shrink-0" aria-hidden="true" />
    </Link>
  );
};

export default MobileItem;
