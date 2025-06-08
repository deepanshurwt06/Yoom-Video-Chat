import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-40 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1 ">
        <Image
          src="/icons/logo.svg"
          alt="yoom logo"
          width={32}
          height={32}
          className="max-sm:size-10"
        />
        <p className="text-[25px] font-bold text-white max-sm:hidden">Yoom</p>
      </Link>

      <div className="flex-between gap-5 ">
        {/* cleark management section */}
        <SignedIn>
          <UserButton />
        </SignedIn>


        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
