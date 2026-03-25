import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { formatPrice } from "../components/ProductCard";
import {
  HiOutlineDeviceMobile,
  HiOutlineCreditCard,
  HiOutlineTruck,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlineChevronLeft,
} from "react-icons/hi";

const PAYMENT_METHODS = [
  {
    id: "momo",
    name: "Ví MoMo",
    desc: "Thanh toán qua ví điện tử MoMo",
    icon: HiOutlineDeviceMobile,
    gradient: "from-[#D82D8B] to-[#A50064]",
    accent: "pink",
  },
  {
    id: "bank",
    name: "Chuyển khoản ngân hàng",
    desc: "QR Code / Số tài khoản",
    icon: HiOutlineCreditCard,
    gradient: "from-purple to-purple-dark",
    accent: "purple",
  },
  {
    id: "cod",
    name: "Thanh toán khi nhận hàng",
    desc: "Thanh toán bằng tiền mặt (COD)",
    icon: HiOutlineTruck,
    gradient: "from-mint to-mint-dark",
    accent: "mint",
  },
];

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState("momo");
  const [step, setStep] = useState("info"); // info | payment | processing
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (items.length === 0) navigate("/cart", { replace: true });
  }, [items.length, navigate]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validateForm = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Vui lòng nhập họ tên";
    if (!form.phone.trim()) errs.phone = "Vui lòng nhập số điện thoại";
    else if (!/^0\d{9}$/.test(form.phone.trim())) errs.phone = "Số điện thoại không hợp lệ";
    if (!form.address.trim()) errs.address = "Vui lòng nhập địa chỉ";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Email không hợp lệ";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinueToPayment = () => {
    if (validateForm()) setStep("payment");
  };

  const handleConfirmPayment = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      const order = addOrder({
        customerInfo: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          address: form.address.trim(),
          notes: form.notes.trim(),
        },
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.images?.[0],
        })),
        total: totalPrice,
        paymentMethod: payment,
      });
      clearCart();
      navigate(`/order-success/${order.id}`, { replace: true });
    }, 2000);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border bg-base/50 text-dark focus:outline-none focus:ring-2 transition-all font-body box-border text-sm ${
      errors[field]
        ? "border-pink focus:ring-pink/20"
        : "border-gray focus:border-purple focus:ring-purple/10"
    }`;

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <button
          onClick={() => (step === "payment" ? setStep("info") : navigate("/cart"))}
          className="inline-flex items-center gap-1 text-dark-light hover:text-purple transition-colors mb-6 text-sm no-underline font-medium bg-transparent border-none cursor-pointer p-0"
        >
          <HiOutlineChevronLeft className="w-4 h-4" />
          {step === "payment" ? "Quay lại thông tin" : "Quay lại giỏ hàng"}
        </button>

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {["Thông tin", "Thanh toán", "Hoàn tất"].map((label, i) => {
            const stepIndex = step === "info" ? 0 : step === "payment" ? 1 : 2;
            return (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i <= stepIndex
                      ? "bg-gradient-to-br from-pink to-purple text-white shadow-md shadow-pink/20"
                      : "bg-gray text-dark-light"
                  }`}
                >
                  {i < stepIndex ? (
                    <HiOutlineCheckCircle className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:inline ${
                    i <= stepIndex ? "text-dark" : "text-dark-light"
                  }`}
                >
                  {label}
                </span>
                {i < 2 && (
                  <div
                    className={`w-8 sm:w-16 h-0.5 rounded ${
                      i < stepIndex ? "bg-gradient-to-r from-pink to-purple" : "bg-gray"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main form area */}
          <div className="lg:col-span-3">
            {step === "info" && (
              <div className="animate-fade-in">
                <h2 className="font-display text-2xl font-bold text-dark mb-6">
                  Thông tin nhận hàng
                </h2>
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray/50 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1.5">
                        Họ và tên <span className="text-pink">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={inputClass("name")}
                        placeholder="Nguyễn Thị A"
                      />
                      {errors.name && <p className="text-pink text-xs mt-1 font-medium">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1.5">
                        Số điện thoại <span className="text-pink">*</span>
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className={inputClass("phone")}
                        placeholder="0912 345 678"
                      />
                      {errors.phone && <p className="text-pink text-xs mt-1 font-medium">{errors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={inputClass("email")}
                      placeholder="email@example.com (không bắt buộc)"
                    />
                    {errors.email && <p className="text-pink text-xs mt-1 font-medium">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">
                      Địa chỉ nhận hàng <span className="text-pink">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className={inputClass("address")}
                      placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                    />
                    {errors.address && <p className="text-pink text-xs mt-1 font-medium">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">
                      Ghi chú
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      rows={3}
                      className={`${inputClass()} resize-none`}
                      placeholder="Ghi chú cho đơn hàng (không bắt buộc)"
                    />
                  </div>
                </div>
                <button
                  onClick={handleContinueToPayment}
                  className="w-full sm:w-auto mt-6 btn-gradient px-10 py-3.5 rounded-2xl font-semibold shadow-lg shadow-pink/20 cursor-pointer hover:shadow-xl active:scale-[0.98] transition-all"
                >
                  <span>Tiếp tục thanh toán</span>
                </button>
              </div>
            )}

            {step === "payment" && (
              <div className="animate-fade-in">
                <h2 className="font-display text-2xl font-bold text-dark mb-6">
                  Phương thức thanh toán
                </h2>

                {/* Payment method cards */}
                <div className="space-y-3 mb-6">
                  {PAYMENT_METHODS.map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setPayment(pm.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left bg-white cursor-pointer ${
                        payment === pm.id
                          ? "border-pink shadow-md shadow-pink/10"
                          : "border-gray/50 hover:border-purple/30"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pm.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}
                      >
                        <pm.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-dark text-sm">{pm.name}</p>
                        <p className="text-dark-light text-xs mt-0.5">{pm.desc}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          payment === pm.id ? "border-pink" : "border-gray"
                        }`}
                      >
                        {payment === pm.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-pink to-purple" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Payment details */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray/50">
                  {payment === "momo" && <MoMoPayment total={totalPrice} />}
                  {payment === "bank" && <BankPayment total={totalPrice} />}
                  {payment === "cod" && <CODPayment total={totalPrice} />}
                </div>

                {/* Confirm button */}
                <button
                  onClick={handleConfirmPayment}
                  disabled={processing}
                  className="w-full mt-6 btn-gradient py-4 rounded-2xl font-semibold shadow-xl shadow-pink/20 cursor-pointer hover:shadow-2xl active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {processing ? (
                      <>
                        <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Đang xử lý...
                      </>
                    ) : payment === "cod" ? (
                      <>
                        <HiOutlineTruck className="w-5 h-5" />
                        Đặt hàng (COD)
                      </>
                    ) : (
                      <>
                        <HiOutlineCheckCircle className="w-5 h-5" />
                        Xác nhận đã thanh toán
                      </>
                    )}
                  </span>
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-dark-light">
                  <HiOutlineLockClosed className="w-3.5 h-3.5" />
                  Giao dịch được bảo mật & mã hoá
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 border border-gray/50 sticky top-24">
              <h3 className="font-semibold text-dark text-sm uppercase tracking-wider mb-4">
                Đơn hàng ({items.length} sản phẩm)
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.images?.[0] || "https://picsum.photos/seed/default/100/100"}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover border border-gray/50"
                      />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-dark text-white text-[10px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-dark truncate">{item.name}</p>
                      <p className="text-xs text-dark-light">{formatPrice(item.price)}</p>
                    </div>
                    <p className="text-sm font-semibold text-dark whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray/50 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-dark-light">Tạm tính</span>
                  <span className="text-dark font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark-light">Phí vận chuyển</span>
                  <span className="text-mint font-semibold">Miễn phí</span>
                </div>
                <div className="border-t border-gray/50 pt-3 flex justify-between">
                  <span className="font-semibold text-dark">Tổng cộng</span>
                  <span className="text-lg font-bold text-gradient">{formatPrice(totalPrice)}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-dark-light bg-mint-light/50 rounded-xl px-3 py-2.5">
                <HiOutlineShieldCheck className="w-4 h-4 text-mint flex-shrink-0" />
                Đơn hàng được bảo vệ & giao hàng miễn phí
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Payment detail panels ---- */

function MoMoPayment({ total }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 bg-[#D82D8B]/10 text-[#D82D8B] px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
        <HiOutlineDeviceMobile className="w-4 h-4" />
        Thanh toán MoMo
      </div>
      {/* Mock QR */}
      <div className="w-48 h-48 mx-auto rounded-2xl bg-gradient-to-br from-[#D82D8B]/5 to-[#A50064]/5 border-2 border-dashed border-[#D82D8B]/30 flex flex-col items-center justify-center mb-5">
        <div className="grid grid-cols-5 gap-1 mb-2">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-sm ${
                Math.random() > 0.3 ? "bg-[#D82D8B]" : "bg-[#D82D8B]/20"
              }`}
            />
          ))}
        </div>
        <p className="text-[10px] text-[#D82D8B]/60 font-medium">MOCK QR CODE</p>
      </div>
      <div className="space-y-2 text-sm">
        <p className="text-dark-light">Số điện thoại MoMo</p>
        <p className="font-bold text-dark text-lg tracking-wider">0900 000 000</p>
        <p className="text-dark-light">Chủ tài khoản: <span className="font-medium text-dark">HANDMADE SHOP</span></p>
        <div className="bg-base-dark rounded-xl px-4 py-3 mt-3">
          <p className="text-xs text-dark-light">Số tiền cần chuyển</p>
          <p className="text-xl font-bold text-gradient">{formatPrice(total)}</p>
        </div>
        <p className="text-xs text-dark-light mt-3">
          Nội dung chuyển khoản: <span className="font-mono font-semibold text-dark">HANDMADE {Date.now().toString().slice(-6)}</span>
        </p>
      </div>
    </div>
  );
}

function BankPayment({ total }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 bg-purple/10 text-purple px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
        <HiOutlineCreditCard className="w-4 h-4" />
        Chuyển khoản ngân hàng
      </div>
      {/* Mock QR */}
      <div className="w-48 h-48 mx-auto rounded-2xl bg-gradient-to-br from-purple/5 to-purple-dark/5 border-2 border-dashed border-purple/30 flex flex-col items-center justify-center mb-5">
        <div className="grid grid-cols-5 gap-1 mb-2">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-sm ${
                Math.random() > 0.3 ? "bg-purple" : "bg-purple/20"
              }`}
            />
          ))}
        </div>
        <p className="text-[10px] text-purple/60 font-medium">MOCK QR CODE</p>
      </div>
      <div className="bg-base-dark rounded-2xl p-5 text-left space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-xs text-dark-light">Ngân hàng</span>
          <span className="text-sm font-semibold text-dark">Vietcombank</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-dark-light">Số tài khoản</span>
          <span className="text-sm font-mono font-bold text-dark tracking-wider">1234 5678 9000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-dark-light">Chủ tài khoản</span>
          <span className="text-sm font-semibold text-dark">HANDMADE SHOP</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-dark-light">Chi nhánh</span>
          <span className="text-sm text-dark">Hồ Chí Minh</span>
        </div>
        <div className="border-t border-gray/50 pt-3 flex justify-between items-center">
          <span className="text-xs text-dark-light">Số tiền</span>
          <span className="text-lg font-bold text-gradient">{formatPrice(total)}</span>
        </div>
      </div>
      <p className="text-xs text-dark-light">
        Nội dung CK: <span className="font-mono font-semibold text-dark">HANDMADE {Date.now().toString().slice(-6)}</span>
      </p>
    </div>
  );
}

function CODPayment({ total }) {
  return (
    <div className="text-center py-4">
      <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-mint-light to-mint/20 flex items-center justify-center">
        <HiOutlineTruck className="w-9 h-9 text-mint" />
      </div>
      <h3 className="font-display text-xl font-bold text-dark mb-2">
        Thanh toán khi nhận hàng
      </h3>
      <p className="text-dark-light text-sm max-w-sm mx-auto mb-6">
        Bạn sẽ thanh toán bằng tiền mặt khi nhận được hàng. Shipper sẽ liên hệ
        trước khi giao.
      </p>
      <div className="bg-base-dark rounded-xl px-6 py-4 inline-block">
        <p className="text-xs text-dark-light mb-1">Tổng tiền cần thanh toán</p>
        <p className="text-2xl font-bold text-gradient">{formatPrice(total)}</p>
      </div>
      <div className="mt-6 flex flex-col items-center gap-2 text-xs text-dark-light">
        <div className="flex items-center gap-1.5">
          <HiOutlineCheckCircle className="w-3.5 h-3.5 text-mint" />
          Kiểm tra hàng trước khi thanh toán
        </div>
        <div className="flex items-center gap-1.5">
          <HiOutlineCheckCircle className="w-3.5 h-3.5 text-mint" />
          Đổi trả miễn phí trong 30 ngày
        </div>
      </div>
    </div>
  );
}
