import { useState } from "react";
import { HiOutlineRefresh, HiOutlineTruck, HiOutlineShieldCheck } from "react-icons/hi";

const tabs = [
  {
    id: "return",
    label: "Chính sách đổi trả",
    icon: HiOutlineRefresh,
  },
  {
    id: "shipping",
    label: "Chính sách vận chuyển",
    icon: HiOutlineTruck,
  },
  {
    id: "privacy",
    label: "Chính sách bảo mật",
    icon: HiOutlineShieldCheck,
  },
];

function ReturnPolicy() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-xl font-semibold text-dark mb-3">
          Điều kiện đổi trả
        </h3>
        <p className="text-dark-light leading-relaxed mb-3">
          Tại Handmade, chúng tôi luôn mong muốn mang đến cho bạn những sản phẩm
          hoàn hảo nhất. Nếu bạn không hài lòng với sản phẩm đã nhận, chúng tôi hỗ trợ
          đổi trả trong vòng <strong className="text-dark">30 ngày</strong> kể từ ngày nhận hàng.
        </p>
        <ul className="space-y-2 text-dark-light">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-pink mt-2 flex-shrink-0" />
            Sản phẩm còn nguyên vẹn, chưa qua sử dụng và còn nguyên bao bì
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-pink mt-2 flex-shrink-0" />
            Có hóa đơn mua hàng hoặc xác nhận đơn hàng qua email
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-pink mt-2 flex-shrink-0" />
            Sản phẩm không nằm trong danh mục hàng khuyến mãi đặc biệt
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold text-dark mb-3">
          Quy trình đổi trả
        </h3>
        <div className="space-y-3">
          {[
            "Liên hệ với chúng tôi qua email hoặc hotline trong vòng 30 ngày",
            "Gửi hình ảnh sản phẩm và mô tả lý do đổi trả",
            "Nhận xác nhận và hướng dẫn gửi hàng từ bộ phận chăm sóc khách hàng",
            "Gửi sản phẩm về địa chỉ được cung cấp",
            "Nhận sản phẩm mới hoặc hoàn tiền trong 5-7 ngày làm việc",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-pink to-purple text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-dark-light">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-mint-light rounded-2xl p-5">
        <p className="text-mint-dark text-sm font-medium">
          Lưu ý: Đối với các sản phẩm handmade được đặt làm riêng theo yêu cầu,
          chúng tôi không hỗ trợ đổi trả trừ trường hợp lỗi từ phía sản xuất.
          Vui lòng liên hệ trực tiếp để được tư vấn cụ thể.
        </p>
      </div>
    </div>
  );
}

function ShippingPolicy() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-xl font-semibold text-dark mb-3">
          Phí vận chuyển
        </h3>
        <div className="space-y-3">
          <div className="bg-base-dark rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-dark font-medium">Đơn hàng từ 300.000₫</p>
              <p className="text-dark-light text-sm">Toàn quốc</p>
            </div>
            <span className="text-mint-dark font-bold">Miễn phí</span>
          </div>
          <div className="bg-base-dark rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-dark font-medium">Đơn hàng dưới 300.000₫</p>
              <p className="text-dark-light text-sm">Nội thành TP.HCM & Hà Nội</p>
            </div>
            <span className="text-dark font-bold">25.000₫</span>
          </div>
          <div className="bg-base-dark rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-dark font-medium">Đơn hàng dưới 300.000₫</p>
              <p className="text-dark-light text-sm">Các tỉnh thành khác</p>
            </div>
            <span className="text-dark font-bold">35.000₫</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold text-dark mb-3">
          Thời gian giao hàng
        </h3>
        <ul className="space-y-2 text-dark-light">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple mt-2 flex-shrink-0" />
            <strong className="text-dark">Nội thành TP.HCM & Hà Nội:</strong>&nbsp;2-3 ngày làm việc
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple mt-2 flex-shrink-0" />
            <strong className="text-dark">Các tỉnh thành khác:</strong>&nbsp;3-5 ngày làm việc
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple mt-2 flex-shrink-0" />
            <strong className="text-dark">Vùng sâu, vùng xa:</strong>&nbsp;5-7 ngày làm việc
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold text-dark mb-3">
          Đối tác vận chuyển
        </h3>
        <p className="text-dark-light leading-relaxed">
          Chúng tôi hợp tác với các đơn vị vận chuyển uy tín như GHN, GHTK và J&T Express
          để đảm bảo đơn hàng của bạn được giao một cách an toàn và nhanh chóng. Mỗi đơn hàng
          đều được đóng gói cẩn thận với hộp quà và giấy lót chuyên dụng để bảo vệ sản phẩm
          handmade trong quá trình vận chuyển.
        </p>
      </div>

      <div className="bg-pink-soft rounded-2xl p-5">
        <p className="text-pink-dark text-sm font-medium">
          Mẹo nhỏ: Để theo dõi đơn hàng, bạn có thể sử dụng mã vận đơn được gửi qua email
          sau khi đơn hàng được xác nhận và giao cho đơn vị vận chuyển.
        </p>
      </div>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-xl font-semibold text-dark mb-3">
          Thu thập thông tin
        </h3>
        <p className="text-dark-light leading-relaxed">
          Chúng tôi thu thập thông tin cá nhân khi bạn đặt hàng, đăng ký tài khoản,
          hoặc liên hệ với chúng tôi. Thông tin bao gồm: họ tên, địa chỉ email,
          số điện thoại, địa chỉ giao hàng và thông tin thanh toán.
          Chúng tôi cam kết chỉ thu thập những thông tin cần thiết để phục vụ đơn hàng
          và nâng cao trải nghiệm mua sắm của bạn.
        </p>
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold text-dark mb-3">
          Sử dụng thông tin
        </h3>
        <ul className="space-y-2 text-dark-light">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-mint mt-2 flex-shrink-0" />
            Xử lý và giao đơn hàng của bạn
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-mint mt-2 flex-shrink-0" />
            Gửi thông báo về tình trạng đơn hàng
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-mint mt-2 flex-shrink-0" />
            Cung cấp dịch vụ chăm sóc khách hàng
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-mint mt-2 flex-shrink-0" />
            Gửi thông tin khuyến mãi (nếu bạn đã đăng ký nhận)
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-mint mt-2 flex-shrink-0" />
            Cải thiện sản phẩm và dịch vụ của chúng tôi
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold text-dark mb-3">
          Bảo vệ thông tin
        </h3>
        <p className="text-dark-light leading-relaxed">
          Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ thông tin
          cá nhân của bạn. Dữ liệu được mã hóa trong quá trình truyền tải và lưu trữ
          an toàn trên hệ thống bảo mật. Chúng tôi không bán, trao đổi hoặc chia sẻ
          thông tin cá nhân của bạn cho bên thứ ba, trừ khi cần thiết để hoàn thành
          đơn hàng (ví dụ: đơn vị vận chuyển).
        </p>
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold text-dark mb-3">
          Quyền của bạn
        </h3>
        <p className="text-dark-light leading-relaxed mb-3">
          Bạn có quyền:
        </p>
        <ul className="space-y-2 text-dark-light">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple mt-2 flex-shrink-0" />
            Yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple mt-2 flex-shrink-0" />
            Hủy đăng ký nhận email quảng cáo bất cứ lúc nào
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple mt-2 flex-shrink-0" />
            Yêu cầu xuất dữ liệu cá nhân của bạn
          </li>
        </ul>
      </div>

      <div className="bg-purple-light rounded-2xl p-5">
        <p className="text-purple-dark text-sm font-medium">
          Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật, vui lòng liên hệ
          với chúng tôi qua email hello@handmade.vn hoặc gọi hotline 1900-xxxx.
          Chúng tôi luôn sẵn sàng hỗ trợ bạn.
        </p>
      </div>
    </div>
  );
}

export default function Policies() {
  const [activeTab, setActiveTab] = useState("return");

  const content = {
    return: <ReturnPolicy />,
    shipping: <ShippingPolicy />,
    privacy: <PrivacyPolicy />,
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-pink font-semibold text-sm uppercase tracking-widest">
            Chính sách
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-dark mt-2 mb-3">
            Chính sách cửa hàng
          </h1>
          <p className="text-dark-light max-w-md mx-auto">
            Chúng tôi luôn đặt quyền lợi của khách hàng lên hàng đầu
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-medium transition-all border-none cursor-pointer ${
                  activeTab === tab.id
                    ? "btn-gradient shadow-md shadow-pink/15"
                    : "bg-white text-dark-light hover:text-dark hover:bg-base-dark border border-gray/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray/50 shadow-sm">
          {content[activeTab]}
        </div>
      </div>
    </div>
  );
}
