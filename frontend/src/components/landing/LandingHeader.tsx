import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon, Sun, Moon } from "lucide-react";
import classNames from "classnames";

const LandingHeader: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={classNames(
        "fixed w-full z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md border-b border-[rgb(var(--border))] bg-[rgb(var(--container-bg)/0.85)]"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={classNames("transition-all", {
              "drop-shadow-md scale-105": scrolled,
            })}
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-gradient bg-clip-text">
              Gossipa
            </h1>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4 ml-4">
              <Button
                variant="ghost"
                className="text-sm font-medium hover:bg-muted hover:text-primary"
                asChild
              >
                <a href="/login">Sign In</a>
              </Button>

              <Button className="text-sm font-medium btn-playful" asChild>
                <a href="/register">Join Us</a>
              </Button>

              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-muted transition"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon size={18} className="text-muted-foreground" />
                ) : (
                  <Sun size={18} className="text-yellow-300" />
                )}
              </motion.button>
            </div>
          </nav>

          {/* Mobile Nav + Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon size={18} className="text-muted-foreground" />
              ) : (
                <Sun size={18} className="text-yellow-300" />
              )}
            </button>

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded hover:bg-muted transition"
              aria-label="Toggle menu"
            >
              {showMenu ? (
                <XIcon size={22} className="text-foreground" />
              ) : (
                <MenuIcon size={22} className="text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden rounded-b-xl backdrop-blur-lg bg-black/80 dark:bg-white/5 shadow-xl px-4"
            >
              <div className="pt-4 pb-6 space-y-4">
                <motion.a
                  href="#features"
                  className="block font-medium text-foreground hover:text-primary transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  View Gossips
                </motion.a>
                <motion.a
                  href="#stream"
                  className="block font-medium text-foreground hover:text-primary transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  Share Gossips
                </motion.a>

                <div className="pt-2 space-y-3">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full hover:bg-muted hover:text-primary"
                      asChild
                    >
                      <a href="/login">Sign In</a>
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Button className="w-full btn-playful" asChild>
                      <a href="/register">Join Us</a>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default LandingHeader;
