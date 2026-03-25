import { useState, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";

const DISMISS_KEY = "handmade_promo_dismissed";

export default function PromoBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(DISMISS_KEY) === "true";
    } catch {
      return false;
    }
  });

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(DISMISS_KEY, "true");
  };

  if (dismissed) return null;

  return (
    <div className="sticky top-0 z-[60] bg-gradient-to-r from-pink to-purple text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center relative">
        <p className="text-xs sm:text-sm font-medium text-center pr-8 sm:pr-0">
          Miễn phí giao hàng cho đơn từ 300.000₫ | Đổi trả trong 30 ngày
        </p>
        <button
          onClick={handleDismiss}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors bg-transparent border-none cursor-pointer text-white"
          aria-label="Đóng"
        >
          <HiOutlineX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
