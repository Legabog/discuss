"use client";

import { FC } from "react";
import { NextUIProvider } from "@nextui-org/react";

import { Props } from "./types";
import { SessionProvider } from "next-auth/react";

const Providers: FC<Props> = ({ children }) => {
  return (
    <NextUIProvider>
      <SessionProvider>{children}</SessionProvider>
    </NextUIProvider>
  );
};

export default Providers;
