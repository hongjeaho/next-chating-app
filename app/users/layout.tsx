import Sidebar from "@/components/sidebar/Sidebar";
import { PropsWithChildren } from "react";
import UserList from "./components/UserList";
import getUser from "@/app/action/getrUsers";

interface Props extends PropsWithChildren {}

const UserLayout: React.FC<Props> = async ({ children }) => {
  const users = await getUser();

  return (
    <Sidebar>
      <UserList users={users} />
      <div className="h-full"> {children} </div>
    </Sidebar>
  );
};

export default UserLayout;
