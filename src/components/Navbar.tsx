import { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon, User, LogOut, Calendar , Wallet} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Rides", href: "#fleet" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Why Us", href: "#why-us" },
  { name: "Reviews", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const { user, logout } = useAuth();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /* ================= SCROLL ================= */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= CLOSE USER MENU ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    toast({
      title: theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode",
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-nav shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ================= LOGO (UNCHANGED) ================= */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="flex items-center group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="rounded-xl bg-white shadow-md p-2 group-hover:scale-105 transition-transform">
              <img
                src="/logo.jpg"
                alt="Just My Rides"
                className="h-8 md:h-9 w-auto object-contain"
              />
            </div>
          </motion.a>

          {/* ================= DESKTOP LINKS ================= */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <button
                key={l.name}
                onClick={() => scrollToSection(l.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {l.name}
              </button>
            ))}
          </div>

          {/* ================= DESKTOP ACTIONS ================= */}
          <div className="hidden lg:flex items-center gap-3 relative">
            {/* Theme */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-lg bg-secondary/50 border"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-primary" />
              ) : (
                <Moon className="w-5 h-5 text-primary" />
              )}
            </button>

            {/* AUTH */}
            {!user ? (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="btn-primary"
              >
                Sign In
              </button>
            ) : (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsUserMenuOpen((p) => !p)}
                  className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center"
                >
                  <User className="w-5 h-5 text-primary" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-56 bg-background border rounded-xl shadow-lg overflow-hidden"
                    >
                      <div className="px-4 py-3 text-sm text-muted-foreground">
                        Hey <b>{user.email.split("@")[0]}</b>
                      </div>

                      <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-secondary">
                        <User className="w-4 h-4" /> My Profile
                      </button>

                      <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-secondary">
                        <Calendar className="w-4 h-4" /> My Bookings
                      </button>

                      <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-secondary">
                        <Wallet className="w-4 h-4" /> My Wallet
                      </button>

                      <button
                        onClick={logout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-red-500 hover:bg-secondary"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* ================= MOBILE BUTTONS ================= */}
          <div className="lg:hidden flex items-center gap-2">
            <button onClick={handleThemeToggle} className="p-2 rounded-lg">
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
            <button onClick={() => setIsMobileMenuOpen((p) => !p)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU (FIXED) ================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden glass-nav border-t"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((l) => (
                <button
                  key={l.name}
                  onClick={() => scrollToSection(l.href)}
                  className="px-4 py-3 rounded-lg hover:bg-secondary text-left"
                >
                  {l.name}
                </button>
              ))}

              <div className="border-t my-2" />

              {!user ? (
                <button
                  onClick={() => {
                    setIsAuthOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="btn-primary"
                >
                  Sign In
                </button>
              ) : (
                <>
                  <p className="px-4 py-2 text-sm text-muted-foreground">
                    Hey {user.email.split("@")[0]}
                  </p>

                  <button className="px-4 py-3 text-left hover:bg-secondary rounded-lg">
                    My Profile
                  </button>

                  <button className="px-4 py-3 text-left hover:bg-secondary rounded-lg">
                    My Bookings
                  </button>

                  <button className="px-4 py-3 text-left hover:bg-secondary rounded-lg">
                    My Wallet
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-4 py-3 text-left text-red-500 hover:bg-secondary rounded-lg"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal open={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
};

export default Navbar;
