import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLockClosed } from "react-icons/hi";

const PASSWORD = "handmade2025";

export default function AdminLogin() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pw === PASSWORD) {
      localStorage.setItem("handmade_admin", "true");
      navigate("/admin/dashboard");
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-light via-base to-pink-soft">
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-purple/10 max-w-sm w-full border border-gray/50">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-pink to-purple flex items-center justify-center shadow-lg shadow-pink/20">
            <HiOutlineLockClosed className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-dark">
            Admin Panel
          </h1>
          <p className="text-dark-light text-sm mt-1">
            Nhập mật khẩu để truy cập
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Mật khẩu"
            className={`w-full px-4 py-3.5 rounded-xl border bg-base/50 text-dark focus:outline-none focus:ring-2 transition-all font-body mb-4 box-border ${
              error
                ? "border-pink focus:ring-pink/20"
                : "border-gray focus:border-purple focus:ring-purple/10"
            }`}
          />
          {error && (
            <p className="text-pink text-sm mb-3 font-medium">Mật khẩu không đúng</p>
          )}
          <button
            type="submit"
            className="w-full btn-gradient py-3.5 rounded-xl font-semibold cursor-pointer shadow-lg shadow-pink/15"
          >
            <span>Đăng nhập</span>
          </button>
        </form>
      </div>
    </div>
  );
}
