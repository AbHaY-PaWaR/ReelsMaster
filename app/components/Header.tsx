

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Home, User, Upload, LogOut } from "lucide-react";
import { useNotification } from "./Notification";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session, status } = useSession();
  const { showNotification } = useNotification();
  const router = useRouter();
  const hasNotified = useRef(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);


  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session && !hasNotified.current) {
      showNotification(
        `Welcome back, ${session.user?.email?.split("@")[0] || "user"}!`,
        "success"
      );
      hasNotified.current = true;
    }
  }, [session, status, showNotification]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="shadow-sm  sticky top-0 z-50  dark:bg-gray-950">
      <nav className="container mx-auto flex items-center justify-between px-4 py-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white"
          prefetch
          onClick={()=>{ if(!clicked) {
      showNotification("Welcome to ReelsPro", "info");
      setClicked(true);}
           } }
        >
          <Home className="w-5 h-5" />
          ReelPro
        </Link>

        {/* User Menu */}
        <div className="relative" ref={dropdownRef}>
          {session && (
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
            >
              <User className="w-5 h-5 text-gray-700 dark:text-white" />
            </button>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && session && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">
                {session.user?.email?.split("@")[0]}
              </div>
              <button
                onClick={() => {
                  router.push("/upload");
                  setDropdownOpen(false);
                  showNotification("Welcome to Admin Dashboard", "info");
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Upload className="w-4 h-4" />
                Video Upload
              </button>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          )}

          {!session && (
             <button
                onClick={() => {
                  router.push("/login");
                  if (!clicked) {
                    showNotification("First Sign in to continue", "info");
                    setClicked(true)
                  }
                }}
                                className="w-full flex rounded-sm items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
>                         Log in
                        </button>
          )}
        </div>
      </nav>
    </header>
  );
}
