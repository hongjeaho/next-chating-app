"use client";
import useRoutes from "@/hooks/useRoutes";
import { User } from "@prisma/client";
import { useState } from "react";
import DeskTopItem from "./DeskTopItem";
import Avatar from "../Avatar";
import SettingsModal from "../modals/SettingsModal";

interface Props {
  currentUser: User;
}

const DeskTopSidebar: React.FC<Props> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div
        className="
        hidden 
        lg:fixed  
        lg:inset-y-0 
        lg:left-0 
        lg:z-40 
        lg:w-20 
        xl:px-6
        lg:overflow-y-auto 
        lg:bg-orange-400 
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
      "
      >
        <nav className="flex flex-col justify-between mt-4">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((route) => (
              <DeskTopItem
                key={route.label}
                href={route.href}
                label={route.label}
                icon={route.icon}
                active={route.active}
                onClick={route.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="flex flex-col items-center justify-between mt-4">
          <div
            onClick={() => setIsOpen(true)}
            className="transition cursor-pointer hover:opacity-75"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DeskTopSidebar;
