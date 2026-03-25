import { useState } from "react";
import { useOrders } from "../../context/OrderContext";
import { formatPrice } from "../../components/ProductCard";
import { HiOutlineClipboardList, HiOutlineEye, HiOutlineX } from "react-icons/hi";

const STATUSES = ["Tất cả", "Chờ xác nhận", "Đang xử lý", "Đang giao", "Đã giao"];
const STATUS_OPTIONS = ["Chờ xác nhận", "Đang xử lý", "Đang giao", "Đã giao"];

const paymentLabels = { momo: "MoMo", bank: "Chuyển khoản", cod: "COD" };

const statusColors = {
  "Chờ xác nhận": "bg-peach/20 text-[#C46030]",
  "Đang xử lý": "bg-pink-soft text-pink",
  "Đang giao": "bg-purple-light text-purple",
  "Đã giao": "bg-mint-light text-mint-dark",
};

export default function OrderList() {
  const { orders, updateOrderStatus } = useOrders();
  const [filter, setFilter] = useState("Tất cả");
  const [detail, setDetail] = useState(null);

  const filtered = filter === "Tất cả" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-dark">
            Quản lý đơn hàng
          </h1>
          <p className="text-dark-light text-sm mt-1">{orders.length} đơn hàng</p>
        </div>
      </div>

      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border-none cursor-pointer ${
              filter === s
                ? "btn-gradient shadow-md shadow-pink/15"
                : "bg-white text-dark-light hover:text-dark border border-gray"
            }`}
          >
            {filter === s ? <span>{s}</span> : s}
            {s !== "Tất cả" && (
              <span className="ml-1 opacity-60">
                ({orders.filter((o) => o.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray/50">
          <div className="w-20 h-20 mx-auto mb-4 bg-purple-light rounded-full flex items-center justify-center">
            <HiOutlineClipboardList className="w-8 h-8 text-purple" />
          </div>
          <h3 className="font-display text-xl text-dark mb-2 font-bold">
            Chưa có đơn hàng nào
          </h3>
          <p className="text-dark-light text-sm">
            Đơn hàng từ khách sẽ hiển thị ở đây
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-base/50">
                  <th className="text-left px-5 py-3 font-medium text-dark-light text-xs uppercase tracking-wider">Mã đơn</th>
                  <th className="text-left px-5 py-3 font-medium text-dark-light text-xs uppercase tracking-wider">Khách hàng</th>
                  <th className="text-left px-5 py-3 font-medium text-dark-light text-xs uppercase tracking-wider hidden sm:table-cell">Thanh toán</th>
                  <th className="text-left px-5 py-3 font-medium text-dark-light text-xs uppercase tracking-wider">Tổng tiền</th>
                  <th className="text-left px-5 py-3 font-medium text-dark-light text-xs uppercase tracking-wider">Trạng thái</th>
                  <th className="text-right px-5 py-3 font-medium text-dark-light text-xs uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id} className="border-t border-gray/30 hover:bg-base/30 transition-colors">
                    <td className="px-5 py-3.5 font-mono font-semibold text-dark text-xs">{order.id}</td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-dark">{order.customer}</p>
                      <p className="text-xs text-dark-light">{order.customerInfo?.phone}</p>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <span className="text-xs font-medium text-dark-light">
                        {paymentLabels[order.paymentMethod] || order.paymentMethod}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-dark">{formatPrice(order.total)}</td>
                    <td className="px-5 py-3.5">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border-none cursor-pointer appearance-none ${
                          statusColors[order.status] || "bg-base-dark text-dark-light"
                        }`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setDetail(order)}
                        className="p-2 text-dark-light hover:text-purple hover:bg-purple-light transition-all bg-transparent border-none cursor-pointer rounded-lg"
                      >
                        <HiOutlineEye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order detail modal */}
      {detail && (
        <div
          className="fixed inset-0 bg-dark/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setDetail(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-fade-in border border-gray/50 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs text-dark-light uppercase tracking-wider">Chi tiết đơn hàng</p>
                <p className="font-mono font-bold text-dark text-lg">{detail.id}</p>
              </div>
              <button
                onClick={() => setDetail(null)}
                className="p-2 text-dark-light hover:text-dark hover:bg-base-dark rounded-xl transition-all bg-transparent border-none cursor-pointer"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-base-dark rounded-xl p-3">
                <p className="text-[10px] text-dark-light uppercase">Khách hàng</p>
                <p className="text-sm font-semibold text-dark">{detail.customerInfo?.name}</p>
                <p className="text-xs text-dark-light">{detail.customerInfo?.phone}</p>
              </div>
              <div className="bg-base-dark rounded-xl p-3">
                <p className="text-[10px] text-dark-light uppercase">Thanh toán</p>
                <p className="text-sm font-semibold text-dark">
                  {paymentLabels[detail.paymentMethod]}
                </p>
                <p className="text-xs text-dark-light">{detail.date}</p>
              </div>
            </div>

            {detail.customerInfo?.address && (
              <div className="bg-base-dark rounded-xl p-3 mb-5">
                <p className="text-[10px] text-dark-light uppercase">Địa chỉ</p>
                <p className="text-sm text-dark">{detail.customerInfo.address}</p>
                {detail.customerInfo.notes && (
                  <p className="text-xs text-dark-light mt-1">Ghi chú: {detail.customerInfo.notes}</p>
                )}
              </div>
            )}

            <p className="text-xs text-dark-light uppercase tracking-wider mb-3">
              Sản phẩm ({detail.items?.length})
            </p>
            <div className="space-y-2 mb-5">
              {detail.items?.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.image || "https://picsum.photos/seed/default/60/60"}
                      alt={item.name}
                      className="w-9 h-9 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-dark text-xs">{item.name}</p>
                      <p className="text-[10px] text-dark-light">x{item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium text-dark text-xs">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray/50 pt-4 flex justify-between items-center">
              <span className="font-semibold text-dark">Tổng cộng</span>
              <span className="text-xl font-bold text-gradient">{formatPrice(detail.total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
