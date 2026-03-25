import { Navigate, Outlet, Link, NavLink } from "react-router-dom";
import { HiOutlineHome, HiOutlineCollection, HiOutlinePlusCircle, HiOutlineClipboardList, HiOutlineLogout, HiOutlineExternalLink } from "react-icons/hi";

const sidebarLinks = [
  { to: "/admin/dashboard", label: "Tổng quan", icon: HiOutlineHome },
  { to: "/admin/orders", label: "Đơn hàng", icon: HiOutlineClipboardList },
  { to: "/admin/products", label: "Sản phẩm", icon: HiOutlineCollection },
  { to: "/admin/products/new", label: "Thêm mới", icon: HiOutlinePlusCircle },
];

export default function AdminLayout() {
  const isAuth = localStorage.getItem("handmade_admin") === "true";

  if (!isAuth) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("handmade_admin");
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen bg-base flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-dark flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink/10 rounded-full blur-3xl" />
        <div className="relative z-10 p-5">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink to-purple flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">H</span>
            </div>
            <span className="font-display text-lg font-semibold text-white">Handmade</span>
          </div>
          <p className="text-white/40 text-xs ml-10">Quản trị viên</p>
        </div>
        <nav className="relative z-10 px-3 pb-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all no-underline whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-pink/20 to-purple/20 text-white"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              {link.label}
            </NavLink>
          ))}
          <div className="hidden md:block border-t border-white/5 my-2" />
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all no-underline whitespace-nowrap"
          >
            <HiOutlineExternalLink className="w-5 h-5 flex-shrink-0" />
            Xem cửa hàng
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-pink hover:bg-white/5 transition-all bg-transparent border-none cursor-pointer whitespace-nowrap w-full text-left"
          >
            <HiOutlineLogout className="w-5 h-5 flex-shrink-0" />
            Đăng xuất
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
