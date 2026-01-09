import { Link } from "react-router-dom";
import { Bold, HousePlusIcon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { House } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Browse Listings", href: "/listings" },
  { name: "Contact Us", href: "/contact" },
];

const NavBar = () => {
  const [menuState, setMenuState] = React.useState(false);

  return (
    <header>
      <nav className="fixed z-20 w-full bg-white border-b border-gray-200 px-2">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div
              className="flex w-full justify-between lg:w-auto"
              style={{
                fontWeight: "bold",
                fontFamily: "serif",
                color: "rgb(153, 0, 0)",
              }}
            >
              <House></House>
              <h1>BrookRent</h1>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 block lg:hidden p-2.5 -m-2.5"
              >
                <Menu className={cn(menuState && "hidden")} />
                <X className={cn(!menuState && "hidden")} />
              </button>
            </div>

            <div className="hidden lg:block">
              <ul className="flex gap-20 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.href}
                      className="text-gray-700 hover:text-red-600 block duration-150"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={cn(
                "flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 lg:flex-row lg:items-center lg:w-auto",
                menuState ? "block" : "hidden",
                "lg:flex lg:block"
              )}
            >
              <div className="lg:hidden mb-4">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className="text-gray-700 hover:text-red-600 block duration-150"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="bg-red-600 text-white hover:bg-red-700"
                style={{
                  backgroundColor: "rgb(153, 0, 0)",
                }}
              >
                <Link to="#">Become a lister</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default NavBar;
