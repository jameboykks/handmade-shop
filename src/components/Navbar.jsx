import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag, HiOutlineMenu, HiOutlineX, HiOutlineSearch, HiOutlineHeart } from "react-icons/hi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import BrandLogo from "./BrandLogo";

const navLinks = [
  { to: "/", label: "Trang chủ" },
  { to: "/shop", label: "Cửa hàng" },
  { to: "/about", label: "Về chúng tôi" },
  { to: "/contact", label: "Liên hệ" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

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
            <BrandLogo className="w-9 h-9" />
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

          {/* Icons + Mobile Menu */}
          <div className="flex items-center gap-1">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-full text-dark hover:bg-pink-soft hover:text-pink transition-all bg-transparent border-none cursor-pointer"
              aria-label="Tìm kiếm"
            >
              <HiOutlineSearch className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-full text-dark hover:bg-pink-soft hover:text-pink transition-all no-underline"
            >
              <HiOutlineHeart className="w-5 h-5" />
              {totalWishlist > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-gradient-to-r from-pink to-coral text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Cart */}
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

      {/* Search overlay */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          searchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full px-5 py-3 pr-12 rounded-2xl bg-white border border-gray/50 text-dark placeholder:text-dark-light/50 focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-all font-body text-sm shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-xl bg-gradient-to-r from-pink to-purple text-white border-none cursor-pointer hover:shadow-md transition-all"
              aria-label="Tìm kiếm"
            >
              <HiOutlineSearch className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
          <NavLink
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-sm font-medium no-underline transition-all ${
                isActive
                  ? "bg-pink-soft text-pink"
                  : "text-dark-light hover:text-dark hover:bg-base-dark"
              }`
            }
          >
            Yêu thích {totalWishlist > 0 && `(${totalWishlist})`}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
