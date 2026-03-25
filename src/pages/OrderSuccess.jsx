import { useParams, Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { formatPrice } from "../components/ProductCard";
import {
  HiOutlineCheckCircle,
  HiOutlineShoppingBag,
  HiOutlineClipboardList,
} from "react-icons/hi";

const paymentLabels = {
  momo: "Ví MoMo",
  bank: "Chuyển khoản ngân hàng",
  cod: "Thanh toán khi nhận hàng (COD)",
};

export default function OrderSuccess() {
  const { orderId } = useParams();
  const { getOrder } = useOrders();
  const order = getOrder(orderId);

  if (!order) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl text-dark mb-4">
            Không tìm thấy đơn hàng
          </h2>
          <Link
            to="/"
            className="text-purple font-semibold hover:text-purple-dark transition-colors no-underline"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {/* Success animation */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-mint-light to-mint/20 rounded-full animate-ping opacity-20" />
          <div className="relative w-24 h-24 bg-gradient-to-br from-mint-light to-mint/20 rounded-full flex items-center justify-center">
            <HiOutlineCheckCircle className="w-12 h-12 text-mint" />
          </div>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-dark mb-3 animate-fade-in-up">
          Đặt hàng thành công!
        </h1>
        <p className="text-dark-light mb-8 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Cảm ơn bạn đã mua sắm tại Handmade. Đơn hàng của bạn đang được xử lý.
        </p>

        {/* Order info card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray/50 text-left mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs text-dark-light uppercase tracking-wider">Mã đơn hàng</p>
              <p className="font-mono font-bold text-dark text-lg">{order.id}</p>
            </div>
            <span className="bg-mint-light text-mint-dark text-xs font-semibold px-3 py-1.5 rounded-full">
              {order.status}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="bg-base-dark rounded-xl p-4">
              <p className="text-xs text-dark-light mb-1">Người nhận</p>
              <p className="font-semibold text-dark text-sm">{order.customerInfo.name}</p>
              <p className="text-xs text-dark-light mt-0.5">{order.customerInfo.phone}</p>
            </div>
            <div className="bg-base-dark rounded-xl p-4">
              <p className="text-xs text-dark-light mb-1">Phương thức thanh toán</p>
              <p className="font-semibold text-dark text-sm">
                {paymentLabels[order.paymentMethod]}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-gray/50 pt-4 mb-4">
            <p className="text-xs text-dark-light uppercase tracking-wider mb-3">
              Sản phẩm ({order.items.length})
            </p>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || "https://picsum.photos/seed/default/80/80"}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover border border-gray/50"
                    />
                    <div>
                      <p className="font-medium text-dark">{item.name}</p>
                      <p className="text-xs text-dark-light">x{item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium text-dark">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray/50 pt-4 flex justify-between items-center">
            <span className="font-semibold text-dark">Tổng cộng</span>
            <span className="text-xl font-bold text-gradient">
              {formatPrice(order.total)}
            </span>
          </div>

          {/* Delivery address */}
          <div className="mt-4 bg-base-dark rounded-xl p-4">
            <p className="text-xs text-dark-light mb-1">Địa chỉ giao hàng</p>
            <p className="text-sm text-dark">{order.customerInfo.address}</p>
            {order.customerInfo.notes && (
              <p className="text-xs text-dark-light mt-1">
                Ghi chú: {order.customerInfo.notes}
              </p>
            )}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Link
            to="/shop"
            className="btn-gradient inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-semibold shadow-lg shadow-pink/20 no-underline"
          >
            <HiOutlineShoppingBag className="w-5 h-5" />
            <span>Tiếp tục mua sắm</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-semibold border-2 border-gray text-dark hover:border-purple hover:text-purple transition-all no-underline"
          >
            <HiOutlineClipboardList className="w-5 h-5" />
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
