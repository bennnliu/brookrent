import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import api from "@/lib/axios";
import Logo from "@/assets/logoWITHOUTname.png";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Browse Listings", href: "/renter/properties" },
  { name: "Contact Us", href: "/contact" },
];

const NavBar = ({ user, setUser, loading }) => {
  const [menuState, setMenuState] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header>
      <nav className="fixed z-50 w-full bg-white border-b border-gray-200 px-2">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="flex items-center justify-between py-4">
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-[rgb(153,0,0)]"
            >
              <img src={Logo} alt="BrookRent Logo" className="h-8 w-auto" />
              <h1>BrookRent</h1>
            </Link>

            <ul className="hidden lg:flex gap-20 text-sm">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-700 hover:text-red-600"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {!loading && (
              <div className="hidden lg:flex items-center gap-4">
                {user ? (
                  <>
                    <span className="text-gray-700">
                      Hi, <strong>{user.name}</strong>
                    </span>
                    <Button
                      size="sm"
                      className="bg-gray-800 hover:bg-gray-900 text-white"
                      onClick={handleLogout}
                    >
                      Sign out
                    </Button>
                  </>
                ) : (
                  <Button
                    asChild
                    size="sm"
                    className="bg-[rgb(153,0,0)] hover:bg-[rgb(120,0,0)] text-white"
                  >
                    <Link to="/lister/list">Become a lister</Link>
                  </Button>
                )}
              </div>
            )}

            <button
              onClick={() => setMenuState(!menuState)}
              className="lg:hidden p-2"
              aria-label="Toggle menu"
            >
              {menuState ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
