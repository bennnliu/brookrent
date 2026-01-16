import { Link, useNavigate } from "react-router-dom";
import { Menu, X, CirclePlus, LayoutDashboard, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Logo from "@/assets/output-onlinepngtools.png";
import { useAuth } from "@/lib/authcontext.jsx";

const menuItems = [
  { name: "Getting Started", href: "/education" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const [menuState, setMenuState] = useState(false);
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setMenuState(false);
  };

  const closeMenu = () => setMenuState(false);
  const toggleMenu = () => setMenuState(!menuState);

  return (
    <header className="relative">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <Link
            to="/"
            className="flex items-center gap-3 font-bold text-[rgb(153,0,0)] hover:opacity-90 transition-transform hover:scale-105 duration-300"
          >
            <img src={Logo} alt="BrookRent Logo" className="h-10 w-auto sm:h-12" />
            <h1 className="pt-2 text-2xl sm:text-3xl tracking-tight">BrookRents</h1>
          </Link>

          <div className="flex items-center gap-4 ml-auto">
            
            {/* DESKTOP BAR */}
            <div className="hidden lg:flex items-center gap-4 mr-2">

              {loading ? (
                 <span className="text-gray-400 text-sm">Loading...</span>
              ) : user ? (
                <div className="flex items-center gap-4">
                  <div className="text-right leading-tight">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-sm font-bold text-gray-900">{user.name}</p>
                  </div>
                  
                <Link
                    to={`/${user.role}/dashboard`}
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-2 py-2 text-sm text-gray-700 font-medium hover:text-[rgb(153,0,0)] hover:bg-red-50 rounded-md"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <Button size="sm" className="bg-[rgb(153,0,0)] hover:bg-[#7a0000]" asChild>
                    <Link to={`/${user.role}/list`} className="flex gap-2">
                      <CirclePlus className="w-4 h-4" /> List Property
                    </Link>
                  </Button>
                    <Button 
                        variant="ghost" 
                        className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50 " 
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Log Out
                      </Button>
                </div>
              ) : (
                <div className="flex justify-around gap-10 items-center"> 
                <Link 
                  to="/renter/properties" 
                  className="text-lg font-medium text-gray-700 hover:text-[rgb(153,0,0)] transition-colors"
                >
                  Browse Properties
                </Link>
                
                <Button className="bg-[rgb(153,0,0)] hover:bg-[#7a0000] font-bold" asChild>
                  <Link to="/auth/signup">Become A Lister</Link>
                </Button>           
              </div>
              )}
            </div>

            {/*Hamburger Menu */}
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md transition-colors focus:outline-none ${
                menuState 
                  ? "bg-red-50 text-[rgb(153,0,0)]" 
                  : "text-gray-600 hover:text-[rgb(153,0,0)] hover:bg-red-50"
              }`}
              aria-label="Toggle menu"
            >
              {menuState ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>

        {menuState && (
          <>
            <div 
              className="fixed inset-0 top-20 z-40 bg-black/20 backdrop-blur-[2px]" 
              onClick={closeMenu}
            />
            <div className="absolute top-20 right-0 w-full sm:w-80 z-50 bg-white shadow-xl border-b sm:border-x border-gray-200 sm:rounded-b-xl animate-in slide-in-from-top-2 duration-200 overflow-hidden">
              <div className="flex flex-col p-2">
                
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 rounded-md hover:bg-red-50 hover:text-[rgb(153,0,0)] transition-colors group"
                    >
                      {item.name}
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[rgb(153,0,0)]" />
                    </Link>
                  ))}
                  
                   <Link
                      to="/renter/properties"
                      onClick={closeMenu}
                      className="lg:hidden flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 rounded-md hover:bg-red-50 hover:text-[rgb(153,0,0)] group"
                    >
                      Browse Properties
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[rgb(153,0,0)]" />
                    </Link>
                </div>

                <div className="lg:hidden mt-2 pt-3 border-t border-gray-100 px-2 pb-2">
                  {loading ? (
                    <div className="text-center text-gray-400 py-2">Loading...</div>
                  ) : user ? (
                    <div className="space-y-3">
                      <div className="px-2">
                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Signed in as</p>
                        <p className="font-bold text-gray-900 truncate">{user.name}</p>
                      </div>
                      
                      <Link
                        to={`/${user.role}/dashboard`}
                        onClick={closeMenu}
                        className="flex items-center gap-3 px-2 py-2 text-sm text-gray-700 font-medium hover:text-[rgb(153,0,0)] hover:bg-red-50 rounded-md"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>

                      <Button className="w-full bg-[rgb(153,0,0)] hover:bg-[#7a0000]" asChild>
                          <Link to={`/${user.role}/list`} onClick={closeMenu}>
                            <CirclePlus className="w-4 h-4 mr-2" /> List Property
                          </Link>
                      </Button>

                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 px-2" 
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Log Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                        <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                           <p className="text-sm text-gray-600 font-medium">Ready to list your property?</p>
                        </div>
                        <Button className="w-full bg-[rgb(153,0,0)] hover:bg-[#7a0000] font-bold shadow-sm" asChild onClick={closeMenu}>
                          <Link to="/auth/signup">Become A Lister</Link>
                        </Button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </>
        )}
      </nav>
      {/* Spacer to prevent content overlap */}
      <div className="h-20" /> 
    </header>
  );
};

export default Navbar;