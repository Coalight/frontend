"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import ChangeThemeBtn from "./ChangeThemeBtn";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Solutions", href: "#solutions" },
    { name: "Pricing", href: "#pricing" },
    { name: "Resources", href: "#resources" },
  ];

  const authButtons = (
    <div className="flex items-center gap-3">
      <Link href="/login">
        <Button
          variant="ghost"
          className="rounded-full px-4 hover:bg-muted/50 transition font-medium text-sm"
        >
          Login
        </Button>
      </Link>

      <Link href="/signup">
        <Button className="rounded-full px-4 shadow-sm hover:shadow-md font-medium text-sm">
          Get Started
        </Button>
      </Link>

      <div className="hidden md:block">
        <ChangeThemeBtn />
      </div>
    </div>
  );

  return (
    <div className="w-full flex justify-center items-center bg-red-100">
      <motion.nav
        initial={false}
        animate={{
          top: 20,
          width: "calc(100% - 40px)",
          maxWidth: "calc(1280px - 40px)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed z-50 rounded-full  border  border-gray-800 bg-background/95 backdrop-blur-sm   shadow-lg `}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo.png"
              alt="Coalight Logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
            <span className="text-lg font-bold tracking-tight text-foreground hidden sm:block">
              Coalight
            </span>
          </Link>

          {/* Middle Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-1 mx-4">
            {isHome &&
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md relative group"
                >
                  {link.name}
                  <motion.span
                    className="absolute bottom-1 left-3 right-3 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">{authButtons}</div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <ChangeThemeBtn />
            <button
              className="focus:outline-none p-1"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <motion.span
                  animate={isOpen ? "open" : "closed"}
                  variants={{
                    closed: { rotate: 0, y: 0, width: 24 },
                    open: { rotate: 45, y: 6, width: 20 },
                  }}
                  className="block h-0.5 bg-foreground rounded-full"
                />
                <motion.span
                  animate={isOpen ? "open" : "closed"}
                  variants={{
                    closed: { opacity: 1, width: 20 },
                    open: { opacity: 0, width: 0 },
                  }}
                  className="block h-0.5 bg-foreground rounded-full ml-auto"
                />
                <motion.span
                  animate={isOpen ? "open" : "closed"}
                  variants={{
                    closed: { rotate: 0, y: 0, width: 16 },
                    open: { rotate: -45, y: -6, width: 20 },
                  }}
                  className="block h-0.5 bg-foreground rounded-full ml-auto"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-border/40 bg-background/95"
            >
              <motion.div
                className="px-4 py-3 flex flex-col gap-1"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-2 mt-1 border-t border-border/40 flex flex-col gap-2">
                  {authButtons.props.children[0]}
                  {authButtons.props.children[1]}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
