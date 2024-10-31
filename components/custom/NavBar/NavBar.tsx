/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import NavLinkList from "./NavLinkList";

const NavBar = async () => {
  return (
    <>
      <nav>
        <div className="container mx-auto flex justify-between items-center py-1 px-6">
          <Link href="/">
            <Image
              src="https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191383/logohero_nsqj8h.png"
              alt="CSIT Association pf BMC"
              height={200}
              width={200}
              className="w-16 h-16 object-contain"
            />
          </Link>
          <NavLinkList />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
