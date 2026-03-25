import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useOrders } from "../../context/OrderContext";
import mockOrders from "../../data/orders";
import { HiOutlineCollection, HiOutlineClipboardList, HiOutlineCurrencyDollar, HiOutlinePlusCircle, HiOutlineArrowRight } from "react-icons/hi";
import { formatPrice } from "../../components/ProductCard";

const statusColors = {
  "Chờ xác nhận": "bg-peach/20 text-[#C46030]",
  "Đang xử lý": "bg-pink-soft text-pink",
  "Đang giao": "bg-purple-light text-purple",
  "Đã giao": "bg-mint-light text-mint-dark",
};

export default function Dashboard() {
  const { products } = useProducts();
  const { orders: realOrders } = useOrders();

  const displayOrders = realOrders.length > 0 ? realOrders : mockOrders;
  const totalRevenue = displayOrders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: "Tổng sản phẩm", value: products.length, icon: HiOutlineCollection, gradient: "from-pink to-coral" },
    { label: "Tổng đơn hàng", value: displayOrders.length, icon: HiOutlineClipboardList, gradient: "from-purple to-lavender" },
    { label: "Doanh thu", value: formatPrice(totalRevenue), icon: HiOutlineCurrencyDollar, gradient: "from-mint to-mint-dark" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-dark">
            Tổng quan
          </h1>
          <p className="text-dark-light text-sm mt-1">
            Chào mừng trở lại, Admin!
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 btn-gradient px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-pink/15 no-underline"
        >
          <HiOutlinePlusCircle className="w-5 h-5" />
          <span className="hidden sm:inline">Thêm sản phẩm</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray/50 card-hover">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-dark-light text-sm font-medium">{stat.label}</span>
            </div>
            <p className="font-display text-2xl font-bold text-dark">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray/50 overflow-hidden">
        <div className="p-5 border-b border-gray/50 flex items-center justify-between">
          <h2 className="font-semibold text-dark">
            Đơn hàng gần đây
          </h2>
          <Link
            to="/admin/orders"
            className="flex items-center gap-1 text-xs font-semibold text-purple hover:text-purple-dark transition-colors no-underline"
          >
            Xem tất cả <HiOutlineArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-base/50">
                <th className="text-left px-5 py-3 font-medium text-dark-light text-xs uppercase tracking-wider">Mã đơn</th>
                <th className="text-left px-5 py-3 font-medium text-dark-light text-xs uppercase tracking-wider">Khách hàng</th>
                <th className="text-left px-5 py-3 font-medium text-dark-light text-xs uppercase tracking-wider">Tổng tiền</th>
                <th className="text-left px-5 py-3 font-medium text-dark-light text-xs uppercase tracking-wider">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {displayOrders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-t border-gray/30 hover:bg-base/30 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-semibold text-dark text-xs">{order.id}</td>
                  <td className="px-5 py-3.5 text-dark-light">{order.customer}</td>
                  <td className="px-5 py-3.5 text-dark font-medium">{formatPrice(order.total)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColors[order.status] || (
                        order.status === "Đã giao"
                          ? "bg-mint-light text-mint-dark"
                          : order.status === "Đang giao"
                          ? "bg-purple-light text-purple"
                          : "bg-pink-soft text-pink"
                      )
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
