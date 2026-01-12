import { Link, useNavigate } from "react-router-dom";
import { Menu, X , CirclePlus} from "lucide-react";
import { Button } from "@/components/ui/button";
import {useState} from "react";
import Logo from "@/assets/output-onlinepngtools.png";
import { useAuth } from "@/lib/authcontext.jsx";

const menuItems = [
  { name: "Browse Properties", href: "/renter/properties" },
  { name: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const [menuState, setMenuState] = useState(false);
  const { user, loading, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); 
    navigate("/");
  };

  const closeMenu = () => setMenuState(false);

  return (
    <header>
      <nav className="fixed z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 font-bold text-[rgb(153,0,0)] hover:opacity-90 transition hover:scale-110 duration-300 ease-in-out"
          >
            <img src={Logo} alt="BrookRent Logo" className="h-15 w-auto" />
            <h1 className="pt-4 text-3xl tracking-tight">BrookRents</h1>
          </Link>

          <div className="flex items-center gap-6">
            
            {/* Desktop View */}
            {loading ? (
                <div className="hidden lg:block text-gray-400">Loading...</div>
            ) : user ? (
              <div className="hidden lg:flex items-center gap-6">
                <span className="text-base font-medium text-gray-700">
                   <span className="text-gray-500 text-sm">Signed in as </span>
                    <span className="font-bold text-lg text-gray-900">{user.name}</span>
                </span>
               <Link 
                    to={`/${user.role}/dashboard`} 
                    onClick={closeMenu}
                    className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-[rgb(153,0,0)]"
                  >
                    View Dashboard
                  </Link>
                <Button className="bg-[#990000]">
                  <Link 
                    to={`/${user.role}/list`} 
                    className="flex items-center gap-2 font-bold" 
                  >
                    <CirclePlus className="!h-5 !w-5" />
                    <span>List Property</span> 
                  </Link>
                </Button>
                <Button
                  className="bg-[rgb(153,0,0)] hover:bg-[#6B000D] font-bold text-white px-6"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </div>
            ) : (
              <ul className="hidden lg:flex items-center gap-8 text-base font-medium text-gray-700">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="hover:text-[rgb(153,0,0)] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <Button className={"bg-[rgb(153,0,0)] hover:bg-[#6B000D] font-bold"}>
                  <Link to="/auth/signup">Become A Lister</Link>
                </Button>
              </ul>
            )}

            {/* Mobile Menu Toggle (Visible only on small screens) */}
            <button
              onClick={() => setMenuState(!menuState)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuState ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>

        </div>

        {menuState && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-xl py-4 flex flex-col animate-in slide-in-from-top-5">
            <div className="flex flex-col gap-4 px-6">
              
              {loading ? (
                 <div className="text-center py-4 text-gray-500">Loading...</div>
              ) : user ? (
              
                <>
                  <div className="py-2 border-b border-gray-100">
                    <p className="text-gray-500 text-sm">Signed in as</p>
                    <p className="font-bold text-lg text-gray-900">{user.name}</p>
                  </div>
                  
                  <Link 
                    to={`/${user.role}/dashboard`} 
                    onClick={closeMenu}
                    className="flex items-center py-2 text-lg font-medium text-gray-700 hover:text-[rgb(153,0,0)]"
                  >
                    View Dashboard
                  </Link>
                  <Button className="bg-[#990000]">
                  <Link 
                    to={`/${user.role}/list`} 
                    className="flex items-center gap-2 font-bold" 
                  >
                    <CirclePlus className="!h-5 !w-5" />
                    <span>List Property</span> 
                  </Link>
                </Button>
                  <Button 
                    className="w-full mt-2 bg-[rgb(153,0,0)] hover:bg-[#6B000D]" 
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
               
                <>
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={closeMenu}
                      className="text-lg font-medium text-gray-700 hover:text-[rgb(153,0,0)] py-2 border-b border-gray-50 last:border-0"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-2">
                    <Button className="w-full bg-[rgb(153,0,0)] hover:bg-[#6B000D] font-bold" asChild onClick={closeMenu}>
                      <Link to="/auth/signup">Become A Lister</Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      <div className="h-20" /> 
    </header>
  );
};

export default Navbar;
