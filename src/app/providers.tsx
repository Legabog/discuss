'use client'

import { FC } from "react";
import {NextUIProvider} from "@nextui-org/react";

import { Props } from "./types";

const Providers: FC<Props> = ({ children }) => {
  return (
    <NextUIProvider>
      { children }
    </NextUIProvider>
  );
}

export default Providers;