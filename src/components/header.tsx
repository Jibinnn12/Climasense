import { Link } from "react-router-dom";
import { useTheme } from "./context/theme-provider";
import { Sun, Moon } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/">
          <img src={isDark?"/public/tlogo-white.png":"/public/tlogo.png"} alt="Logo" className="w-[102px] h-[80px] object-contain"/>
        </Link>

        {/* Toggle Button */}
        <div
          onClick={toggleTheme}
          className={`relative w-[75px] h-10 rounded-full p-1 flex items-center transition-all duration-300 shadow-inner cursor-pointer ${
            isDark ? 'bg-[#1d1f35]' : 'bg-gray-200'
          }`}
        >
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center shadow-md transform transition-all duration-300 ${
              isDark
                ? 'translate-x-[33px] bg-[#313030] text-white'
                : 'translate-x-0 bg-white text-yellow-500'
            }`}
          >
            {isDark ? <Moon size={17} /> : <Sun size={17} />}
          </div>

          <span
            className={`absolute left-3 right-3 text-center text-xs font-semibold transition-all duration-300 ${
              isDark ? 'text-white' : 'text-gray-700'
            }`}
          >
           
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
