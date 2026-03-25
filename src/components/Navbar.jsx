import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineShoppingBag, HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useCart } from "../context/CartContext";

const navLinks = [
  { to: "/", label: "Trang chủ" },
  { to: "/shop", label: "Cửa hàng" },
  { to: "/about", label: "Về chúng tôi" },
  { to: "/contact", label: "Liên hệ" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg shadow-purple/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink to-purple flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">H</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-semibold text-dark tracking-wide leading-none">
                Handmade
              </span>
              <span className="text-[10px] text-dark-light font-medium tracking-widest uppercase hidden sm:block">
                thủ công mỹ nghệ
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all no-underline ${
                    isActive
                      ? "bg-pink-soft text-pink"
                      : "text-dark-light hover:text-dark hover:bg-base-dark"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full text-dark hover:bg-pink-soft hover:text-pink transition-all no-underline"
            >
              <HiOutlineShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-gradient-to-r from-pink to-purple text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2.5 rounded-full text-dark hover:bg-base-dark transition-all bg-transparent border-none cursor-pointer"
            >
              {menuOpen ? (
                <HiOutlineX className="w-5 h-5" />
              ) : (
                <HiOutlineMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass mx-4 mb-4 rounded-2xl p-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-medium no-underline transition-all ${
                  isActive
                    ? "bg-pink-soft text-pink"
                    : "text-dark-light hover:text-dark hover:bg-base-dark"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
