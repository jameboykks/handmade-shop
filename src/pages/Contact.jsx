import { useState } from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineCheckCircle } from "react-icons/hi";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <div className="relative overflow-hidden py-16 mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-mint-light via-base to-purple-light" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-purple font-semibold text-sm uppercase tracking-widest">Contact</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-dark mt-2 mb-4">
            Liên hệ
          </h1>
          <p className="text-dark-light text-lg">
            Chúng tôi luôn sẵn sàng lắng nghe bạn
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <div className="space-y-5">
              {[
                { icon: HiOutlineMail, title: "Email", value: "hello@handmade.vn", color: "from-pink to-coral" },
                { icon: HiOutlinePhone, title: "Điện thoại", value: "0123 456 789", color: "from-purple to-lavender" },
                { icon: HiOutlineLocationMarker, title: "Địa chỉ", value: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM", color: "from-mint to-mint-dark" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray/50 card-hover">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark text-sm">{item.title}</h3>
                    <p className="text-dark-light text-sm mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl overflow-hidden shadow-lg border-4 border-white">
              <img
                src="https://picsum.photos/seed/contact/500/300"
                alt="Liên hệ"
                className="w-full h-52 object-cover"
              />
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-gray/50 shadow-sm space-y-5"
          >
            <h3 className="font-display text-xl font-bold text-dark mb-2">Gửi tin nhắn</h3>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Họ và tên
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray bg-base/50 text-dark focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/10 transition-all font-body box-border"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray bg-base/50 text-dark focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/10 transition-all font-body box-border"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Tin nhắn
              </label>
              <textarea
                rows={4}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray bg-base/50 text-dark focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/10 transition-all resize-none font-body box-border"
                placeholder="Nội dung tin nhắn..."
              />
            </div>
            <button
              type="submit"
              className="w-full btn-gradient py-3.5 rounded-xl font-semibold cursor-pointer shadow-lg shadow-pink/15 hover:shadow-xl active:scale-[0.98] transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                {sent && <HiOutlineCheckCircle className="w-5 h-5" />}
                {sent ? "Đã gửi thành công!" : "Gửi tin nhắn"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
