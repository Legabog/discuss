import { FC, Suspense } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { HeaderAuth, SearchInput } from "@/components";

export const Header: FC = () => {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link className="font-bold" href="/">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
};
