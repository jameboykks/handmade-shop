import { Link } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaPinterestP, FaTiktok } from "react-icons/fa";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="bg-dark mt-auto relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BrandLogo className="w-8 h-8" light />
              <span className="font-display text-xl text-white font-semibold">Handmade</span>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              Mỗi sản phẩm là một câu chuyện, được tạo nên bởi đôi bàn tay khéo léo
              và tình yêu dành cho nghệ thuật thủ công.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Liên kết
            </h4>
            <div className="space-y-2.5 text-sm">
              {[
                { to: "/", label: "Trang chủ" },
                { to: "/shop", label: "Cửa hàng" },
                { to: "/about", label: "Về chúng tôi" },
                { to: "/contact", label: "Liên hệ" },
                { to: "/policies", label: "Chính sách" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-white/40 hover:text-pink transition-colors no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Kết nối
            </h4>
            <div className="flex gap-2">
              {[FaFacebookF, FaInstagram, FaPinterestP, FaTiktok].map(
                (Icon, i) => (
                  <span
                    key={i}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-pink/20 hover:to-purple/20 flex items-center justify-center transition-all cursor-pointer group"
                  >
                    <Icon className="w-4 h-4 text-white/50 group-hover:text-pink transition-colors" />
                  </span>
                )
              )}
            </div>
            <p className="text-xs text-white/30 mt-4">
              hello@handmade.vn
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 text-center text-xs text-white/30">
          <p className="flex items-center justify-center gap-1">
            © 2025 Handmade. Được tạo với
            <HiOutlineHeart className="w-3.5 h-3.5 text-pink" />
            tại Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
