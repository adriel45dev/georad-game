import Link from "next/link";
import React, { ReactNode } from "react";

type ButtonSectionProps = {
  children: ReactNode;
  href: string;
};

export default function ButtonSection({ children, href }: ButtonSectionProps) {
  return (
    <Link
      href={href}
      className="group border-b-2 border-white rounded-full flex justify-center items-center px-2 py-1 text-white hover:border-violet-600 w-full"
    >
      <div className="bg-violet-600 w-full rounded-full text-center text-lg py-2 px-4 flex flex-row justify-center items-center gap-2 group-hover:bg-white">
        {children}
      </div>
    </Link>
  );
}
