"use client";

import { useEffect, useState } from "react";
import NavLink from "./NavLinks";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "../../ui/button";
import { NavLinkPaths } from "@/app/data";
import { useSession, signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userProfileAvatar, setUserProfileAvatar] = useState<string>();
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/user/update-profile");
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const data = await response.json();
      setUserProfileAvatar(data.user.imageurl);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoading(false); // Once the fetch is done, set loading to false
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [router, userProfileAvatar]);

  async function handleLogout() {
    await signOut({ redirect: false });
    router.push("/");
  }
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

      <div className="hidden sm:ml-6 sm:flex sm:items-center">
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                {isLoading ? (
                  <>
                    <Skeleton className="h-8 w-8" />
                  </>
                ) : (
                  <>
                    <Avatar className="h-9 w-9 border">
                      <AvatarImage
                        src={userProfileAvatar}
                        alt={session.user.email || ""}
                      />
                      <AvatarFallback>
                        {session.user.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href="/profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <span className="text-gray-500 flex gap-1 items-center">
                  <LogOut className="w-3 h-4" />
                  Logout
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="space-x-4">
            <NavLink href="/login" {...(toggleMenu && { onClick: toggleMenu })}>
              <Button onClick={() => router.push("/login")}>Log in</Button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
