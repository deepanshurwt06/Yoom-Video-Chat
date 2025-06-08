"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLink } from "@/constant";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";


const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[250px] text-white ">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="hamburger icon"
            className="cursor-pointer md:hidden"
          />
        </SheetTrigger>
      
        <SheetContent side="left" className="border-none bg-dark-1 ">
          <SheetTitle>
            <VisuallyHidden>Mobile Navigation</VisuallyHidden>
          </SheetTitle>
          <Link href="/" className="flex items-center gap-1 px-4">
            <Image
              src="/icons/logo.svg"
              alt="yoom logo"
              width={32}
              height={32}
              className="max-sm:size-10 "
            />
            <p className="text-[25px] font-bold text-white max-sm:hidden">
              Yoom
            </p>
          </Link>

          <div className="flex h-[cal(100vh-72px)] flex-col justify-between overflow-y-auto p-4">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white ">
                {sidebarLink.map((link) => {
                  const isActive =
                    link.route === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.route);

                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                          { "bg-blue-1": isActive }
                        )}
                      >
                        <Image
                          src={link.imgUrl}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        <p className=" text-white font-semibold ">
                          {link.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
