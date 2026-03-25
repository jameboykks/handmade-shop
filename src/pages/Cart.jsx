import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../components/ProductCard";
import { HiOutlineTrash, HiOutlineShoppingBag, HiOutlineCheckCircle, HiOutlineSparkles } from "react-icons/hi";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-purple-light rounded-full flex items-center justify-center">
            <HiOutlineShoppingBag className="w-10 h-10 text-purple" />
          </div>
          <h2 className="font-display text-2xl font-bold text-dark mb-3">
            Giỏ hàng trống
          </h2>
          <p className="text-dark-light mb-8 max-w-sm mx-auto">
            Hãy khám phá cửa hàng và thêm sản phẩm yêu thích nhé!
          </p>
          <Link
            to="/shop"
            className="btn-gradient inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold shadow-lg shadow-pink/20 no-underline"
          >
            <HiOutlineSparkles className="w-5 h-5" />
            <span>Mua sắm ngay</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-dark">
            Giỏ hàng
          </h1>
          <p className="text-dark-light text-sm mt-2">{items.length} sản phẩm</p>
        </div>

        <div className="space-y-3 mb-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-gray/50 flex gap-4 items-center card-hover"
            >
              <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <img
                  src={item.images?.[0] || "https://picsum.photos/seed/default/200/200"}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.id}`} className="no-underline">
                  <h3 className="font-semibold text-dark text-sm sm:text-base truncate hover:text-pink transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-gradient font-bold text-sm mt-1">
                  {formatPrice(item.price)}
                </p>
                <div className="flex items-center gap-3 mt-2.5">
                  <div className="flex items-center bg-base-dark rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-dark hover:bg-gray transition-colors bg-transparent border-none cursor-pointer text-sm font-medium"
                    >
                      −
                    </button>
                    <span className="px-3 py-1.5 text-sm font-semibold text-dark">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-dark hover:bg-gray transition-colors bg-transparent border-none cursor-pointer text-sm font-medium"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-dark-light hover:text-pink hover:bg-pink-soft rounded-lg transition-all bg-transparent border-none cursor-pointer"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-dark text-sm sm:text-base">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray/50 shadow-sm">
          <div className="flex justify-between items-center mb-3 text-sm">
            <span className="text-dark-light">Tạm tính</span>
            <span className="text-dark font-medium">{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-dark-light">Phí vận chuyển</span>
            <span className="text-mint font-semibold">Miễn phí</span>
          </div>
          <div className="border-t border-gray/50 pt-4 flex justify-between items-center mb-6">
            <span className="text-dark font-display text-xl font-bold">Tổng cộng</span>
            <span className="text-2xl font-bold text-gradient">{formatPrice(totalPrice)}</span>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full btn-gradient py-4 rounded-2xl font-semibold text-base cursor-pointer shadow-lg shadow-pink/20 hover:shadow-xl active:scale-[0.98] transition-all"
          >
            <span>Đặt hàng</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div
          className="fixed inset-0 bg-dark/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full text-center animate-fade-in shadow-2xl border border-gray/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-mint-light to-mint/20 rounded-full flex items-center justify-center">
              <HiOutlineCheckCircle className="w-10 h-10 text-mint" />
            </div>
            <h2 className="font-display text-2xl font-bold text-dark mb-3">
              Đặt hàng thành công!
            </h2>
            <p className="text-dark-light mb-8 leading-relaxed">
              Cảm ơn bạn đã tin tưởng Handmade. Đơn hàng của bạn sẽ được xử lý
              trong thời gian sớm nhất.
            </p>
            <button
              onClick={() => {
                clearCart();
                setShowConfirm(false);
              }}
              className="btn-gradient px-10 py-3.5 rounded-2xl font-semibold cursor-pointer shadow-lg shadow-pink/20"
            >
              <span>Tuyệt vời!</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
