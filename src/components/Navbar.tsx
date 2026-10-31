
"use client";

import { useState } from "react";
import {
  Leaf,
  Search,
  Menu,
  X,
  LogOut,
  CalendarPlus,
  ClipboardList,
  Users,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";





// Main navigation links
const links = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/events" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
];

// Profile navigation links
const profileLinks = [
  {
    name: "Create Event",
    href: "/create-event",
    icon: CalendarPlus,
  },
  {
    name: "Manage Events",
    href: "/manage-events",
    icon: ClipboardList,
  },
  {
    name: "Joined Events",
    href: "/joined-events",
    icon: Users,
  },
];

// User Profile Menu Props
type ProfileMenuProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  onSignOut: () => void;
};

// User Profile Menu
const ProfileMenu = ({
  user,
  onSignOut,
}: ProfileMenuProps) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Popover>
      <PopoverTrigger
        nativeButton={false}
        render={
          <button
            type="button"
            aria-label="Open profile menu"
            title={user.name ?? "User Profile"}
            className="rounded-full outline-none ring-offset-2 transition hover:ring-2 hover:ring-[#8be37a]"
          >
            <Avatar className="h-9 w-9 border border-emerald-500/30">
              <AvatarImage
                src={user.image ?? ""}
                referrerPolicy="no-referrer"
              />

              <AvatarFallback className="bg-[#8be37a] font-semibold text-[#062b20]">
                {user.name?.charAt(0)?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
          </button>
        }
      />

      <PopoverContent
        align="end"
        className="w-64 border border-white/10 bg-[#052b23] text-white"
      >
        {/* User Information */}
        <PopoverHeader>
          <PopoverTitle className="text-white">
            {user.name ?? "User"}
          </PopoverTitle>

          <PopoverDescription className="text-gray-400">
            {user.email}
          </PopoverDescription>
        </PopoverHeader>

        <div className="my-2 h-px bg-white/10" />

        {/* Profile Navigation */}
        <div className="flex flex-col gap-1">
          {profileLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  isActive(link.href)
                    ? "bg-[#8be37a]/10 text-[#8be37a]"
                    : "text-gray-300 hover:bg-white/10 hover:text-[#8be37a]"
                }`}
              >
                <Icon size={17} />
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="my-2 h-px bg-white/10" />

        {/* Sign Out */}
        <Button
          variant="destructive"
          className="w-full gap-2"
          onClick={onSignOut}
        >
          <LogOut size={16} />
          Sign Out
        </Button>
      </PopoverContent>
    </Popover>
  );
};

// Main Navbar
const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  // Better Auth Session
  const { data: session, isPending } =
    authClient.useSession();

  const user = session?.user;

  // Sign Out
  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Sign out failed:", error.message);
        return;
      }

      setMenuOpen(false);

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  // Check Active Route
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  // Render Main Navigation Links
  const renderLinks = (mobile = false) => (
    <>
      {links.map((link) => (
        <li
          key={link.href}
          className={mobile ? "w-full" : "h-full"}
        >
          <Link
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={`relative flex items-center text-[13px] font-medium transition-all duration-300
              ${
                mobile
                  ? "w-full rounded-lg px-3 py-3"
                  : "h-full"
              }
              ${
                isActive(link.href)
                  ? "text-[#8be37a] md:after:absolute md:after:bottom-0 md:after:left-0 md:after:h-[2px] md:after:w-full md:after:rounded-full md:after:bg-[#8be37a]"
                  : "text-gray-300 hover:text-white"
              }`}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#021d18]/90 backdrop-blur-xl">

      <nav className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-6 lg:px-12">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white"
        >
          <Leaf
            size={27}
            strokeWidth={1.8}
            className="fill-[#8be37a]/20 text-[#8be37a]"
          />
          Civicly
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden h-full items-center gap-7 md:flex lg:gap-8">
          {renderLinks()}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
<ThemeToggle />
          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            className="text-gray-300 transition hover:text-[#8be37a]"
          >
            <Search size={18} strokeWidth={1.8} />
          </button>

          {/* Authentication */}
          {isPending ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-white/10" />
          ) : user ? (
            <ProfileMenu
              user={user}
              onSignOut={handleSignOut}
            />
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-emerald-700/50 px-5 py-[7px] text-xs font-medium text-white transition duration-300 hover:border-[#8be37a] hover:text-[#8be37a]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-[#8be37a] px-5 py-[8px] text-xs font-semibold text-[#062b20] shadow-[0_0_15px_rgba(139,227,122,0.15)] transition duration-300 hover:bg-[#a0f08f] hover:shadow-[0_0_20px_rgba(139,227,122,0.3)]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
       <div className="flex items-center gap-3 md:hidden">
  <ThemeToggle />
  {/* the existing menu toggle <button> goes here, and remove "md:hidden" from its className */}
</div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#021d18] px-6 py-5 md:hidden">

          <div className="flex flex-col gap-4">

            {/* Mobile Navigation */}
            <ul className="flex flex-col gap-1">
              {renderLinks(true)}
            </ul>

            <div className="my-1 border-t border-white/10" />

            {/* Mobile Authentication */}
            {isPending ? (
              <div className="py-2 text-sm text-gray-400">
                Loading account...
              </div>
            ) : user ? (
              <div className="flex flex-col gap-4">

                {/* User Information */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user.image ?? ""}
                      referrerPolicy="no-referrer"
                    />

                    <AvatarFallback className="bg-[#8be37a] text-[#062b20]">
                      {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Mobile Profile Navigation */}
                <div className="flex flex-col gap-1">
                  {profileLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                          isActive(link.href)
                            ? "bg-[#8be37a]/10 text-[#8be37a]"
                            : "text-gray-300 hover:bg-white/10 hover:text-[#8be37a]"
                        }`}
                      >
                        <Icon size={17} />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Sign Out */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleSignOut}
                  className="w-full gap-2"
                >
                  <LogOut size={15} />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-white/15 py-2.5 text-center text-sm text-white transition hover:border-[#8be37a]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full bg-[#8be37a] py-2.5 text-center text-sm font-semibold text-[#062b20] transition hover:bg-[#a0f08f]"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
