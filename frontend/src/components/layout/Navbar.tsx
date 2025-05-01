import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserContext } from '@/contexts/UserContext';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'; // Import shadcn components
import {useNavigate, useLocation} from "react-router-dom";
import api from "@/api/api.ts";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, userId } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;


  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dark mode
  useEffect(() => {
    const isDark =
      localStorage.getItem('darkMode') === 'true' ||
      (!localStorage.getItem('darkMode') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Feed', path: '/feed' },
    { name: 'Developers', path: '/developers' },
    { name: 'Projects', path: '/projects' },
    { name: 'Chat', path: '/chat' },
  ];
  function handleLogout() {
    api.get('/user/logout')
        .then(() => {
          window.location.href = 'http://localhost:5173/auth';
          console.log("LogOut Successfull")
        })
        .catch((err) => {
          console.error('Logout failed:', err);
        });
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 transition-all duration-300',
        {
          'glass-panel shadow-md backdrop-blur-md': isScrolled,
          'bg-transparent': !isScrolled,
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-primary font-bold text-2xl"
        >
          <span
            className={cn(
              'transition-all duration-300 font-mono',
              { 'text-foreground': isScrolled || isMenuOpen }
            )}
          >
            Dev<span className="text-blue-500">Gram</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-foreground/80 hover:text-foreground smooth-transition font-medium text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search Icon */}
          <button
            className="text-foreground/70 hover:text-foreground smooth-transition"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-foreground/70 hover:text-foreground smooth-transition"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Profile Dropdown or Auth Button */}
          {currentRoute === "/auth" ? 
            null : 
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden cursor-pointer"
                    aria-label="Toggle profile dropdown"
                  >
                    <img
                      src={user.profilePictureUrl}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="flex items-center space-x-3 p-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <img
                        src={user.profilePictureUrl}
                        alt={user.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div   
                      onClick={() => navigate(`/u/${userId}`)}>
                      <p className="font-medium">{user.fullName}</p>
                      <p className="text-sm text-foreground/60">View profile</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Account</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500 focus:text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/auth"
                  className="py-2 px-4 rounded-lg border border-foreground/10 hover:border-foreground/20 smooth-transition text-sm"
                >
                  Sign In
                </Link>
              </div>
            )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground/70 hover:text-foreground smooth-transition"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 bg-background glass-panel z-40 pt-20 px-6 md:hidden transition-transform duration-300 ease-in-out',
          {
            'translate-x-0': isMenuOpen,
            'translate-x-full': !isMenuOpen,
          }
        )}
      >
        <div className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-foreground/80 hover:text-foreground py-2 border-b border-border smooth-transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex flex-col space-y-4 pt-4">
            <button
              onClick={toggleDarkMode}
              className="flex items-center space-x-2 py-2 text-foreground/80 hover:text-foreground smooth-transition"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            {!user ?
                <Link
                  to="/auth"
                  className="py-2 px-4 border border-foreground/10 hover:border-foreground/20 rounded-lg text-center smooth-transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link> :
               <Link
                 to="/auth"
                 className="py-2 px-4 border border-foreground/10 hover:border-foreground/20 rounded-lg text-center smooth-transition"
                 onClick={() => setIsMenuOpen(false)}
               >
                 Logout
               </Link>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;