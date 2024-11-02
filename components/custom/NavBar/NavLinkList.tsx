"use client";

import { useState } from "react";
import NavLink from "./NavLinks";
import { Menu, X } from "lucide-react";
import { Button } from "../../ui/button";
import { NavLinkPaths } from "@/app/data";

const NavLinkList = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* larg screen menue */}
      <div className="hidden md:flex justify-end items-center w-full space-x-4 md:mx-4">
        <NavList />
      </div>

      {/* mobile menue */}
      <div className="md:hidden flex items-center w-full justify-end">
        <button className="pl-2" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col absolute z-[1000] top-16 left-0 w-full bg-background backdrop-blur-xl shadow-sm">
          <NavList toggleMenu={toggleMenu} />
        </div>
      )}
    </>
  );
};

export default NavLinkList;

const NavList = ({ toggleMenu }: { toggleMenu?: () => void | boolean }) => {
  return (
    <div className="font-medium flex flex-col space-y-4 py-4 justify-end items-center w-full md:space-x-8 md:flex-row md:space-y-0">
      {NavLinkPaths.map((item, index) => (
        <NavLink
          href={item.path}
          key={index}
          {...(toggleMenu && { onClick: toggleMenu })}
        >
          {item.title}
        </NavLink>
      ))}

      <NavLink href="/login" {...(toggleMenu && { onClick: toggleMenu })}>
        <Button>Log in</Button>
      </NavLink>
    </div>
  );
};
