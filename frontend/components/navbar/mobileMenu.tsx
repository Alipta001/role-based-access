"use client";

import Link from "next/link";
import { FiMenu, FiX, FiPlus, FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { MenuItem } from "./menu";

interface MobileMenuProps {
  menu: MenuItem[];
  role: "admin" | "manager" | "employee";
  onLogout: () => void;
}

export default function MobileMenu({
  menu,
  role,
  onLogout,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="
          lg:hidden
          flex
          items-center
          justify-center
          w-11
          h-11
          rounded-xl
          border
          border-slate-200
          bg-white
          hover:bg-slate-100
          transition
        "
      >
        <FiMenu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed
          top-0
          right-0
          z-50
          h-screen
          w-80
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="text-xl font-bold">
              Dashboard
            </h2>

            <p className="text-sm text-slate-500 capitalize">
              {role}
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="
              rounded-lg
              p-2
              hover:bg-slate-100
            "
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Create Record */}
        <div className="p-5">
          <Link
            href="/records/create"
            onClick={() => setOpen(false)}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              py-3
              font-semibold
              text-white
              shadow-lg
              hover:shadow-xl
              transition
            "
          >
            <FiPlus />
            Create Record
          </Link>
        </div>

        {/* Navigation */}
        <div className="px-4 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3
                  text-slate-700
                  hover:bg-indigo-50
                  hover:text-indigo-600
                  transition
                "
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 w-full border-t p-5">
          <button
            onClick={onLogout}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-xl
              bg-red-50
              py-3
              font-semibold
              text-red-600
              transition
              hover:bg-red-100
            "
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}