import { PropsWithChildren } from "react";
import DeskTopSidebar from "./DeskTopSidebar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "@/app/action/getCurrentUser";

interface Props extends PropsWithChildren {}

const Sidebar: React.FC<Props> = async ({ children }) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DeskTopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
};

export default Sidebar;
