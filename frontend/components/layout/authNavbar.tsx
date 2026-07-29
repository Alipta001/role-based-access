"use client";

import Link from "next/link";
import {
  FiShield,
  FiUserCheck,
  FiUsers,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";

export default function AuthNavbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        bg-white/90
        backdrop-blur-xl
        border-b
        border-gray-200
        shadow-sm
      "
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                flex
                items-center
                justify-center
                text-white
                font-bold
                text-xl
                shadow-lg
              "
            >
              A
            </div>

            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
                Inventory Management
              </h1>

              <p className="hidden sm:block text-xs text-gray-500">
                Role Based Authentication
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-4">

            <Link
              href="/adminLogin"
              className="
                flex items-center gap-2
                px-5 py-3
                rounded-xl
                bg-red-600
                hover:bg-red-700
                text-white
                transition
                shadow-md
                font-medium
              "
            >
              <FiShield />
              Admin Login
            </Link>

            <Link
              href="/managerLogin"
              className="
                flex items-center gap-2
                px-5 py-3
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                transition
                shadow-md
                font-medium
              "
            >
              <FiUserCheck />
              Manager Login
            </Link>

            <Link
              href="/employeeLogin"
              className="
                flex items-center gap-2
                px-5 py-3
                rounded-xl
                bg-green-600
                hover:bg-green-700
                text-white
                transition
                shadow-md
                font-medium
              "
            >
              <FiUsers />
              Employee Login
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="
              lg:hidden
              p-2
              rounded-lg
              border
              border-gray-200
            "
          >
            {mobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="lg:hidden pb-6">

            <div className="grid gap-3">

              <Link
                href="/adminLogin"
                className="
                  flex items-center justify-center gap-2
                  py-3
                  rounded-xl
                  bg-red-600
                  text-white
                "
              >
                <FiShield />
                Admin Login
              </Link>

              <Link
                href="/managerLogin"
                className="
                  flex items-center justify-center gap-2
                  py-3
                  rounded-xl
                  bg-blue-600
                  text-white
                "
              >
                <FiUserCheck />
                Manager Login
              </Link>

              <Link
                href="/employeeLogin"
                className="
                  flex items-center justify-center gap-2
                  py-3
                  rounded-xl
                  bg-green-600
                  text-white
                "
              >
                <FiUsers />
                Employee Login
              </Link>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}