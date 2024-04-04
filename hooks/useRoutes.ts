import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { HiChat, HiLogout } from "react-icons/hi";
import { HiUsers } from "react-icons/hi2";
import useConversation from "./useConversation";
const useRoutes = () => {
  const pathname = usePathname();
  const { isOpen } = useConversation();

  const routes = [
    {
      label: "Chat",
      href: "/conversations",
      icon: HiChat,
      active: pathname === "/conversations" || isOpen,
    },
    {
      label: "Users",
      href: "/users",
      icon: HiUsers,
      active: pathname === "/users",
    },
    {
      label: "Logout",
      href: "#",
      onClick: () => {
        signOut();
      },
      icon: HiLogout,
      active: pathname === "/users",
    },
  ];

  return routes;
};

export default useRoutes;
