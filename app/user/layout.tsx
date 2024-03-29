import Sidebar from "@/components/sidebar/Sidebar";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

const UserLayout: React.FC<Props> = ({ children }) => {
  return (
    <Sidebar>
      <div className="h-full"> {children} </div>
    </Sidebar>
  );
};

export default UserLayout;
