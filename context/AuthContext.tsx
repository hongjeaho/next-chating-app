"use client"

import { PropsWithChildren } from "react";
import {SessionProvider} from "next-auth/react"

interface Props extends PropsWithChildren {}

const AuthContext: React.FC<Props> = ({children}) => {
  
  return <SessionProvider>
    {children}
  </SessionProvider>;
};

export default AuthContext;
