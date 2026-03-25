import useScrollReveal from "../hooks/useScrollReveal";
import { HiOutlineSparkles } from "react-icons/hi";

const values = [
  { emoji: "🌿", title: "100% Thủ công", desc: "Mỗi sản phẩm được tạo nên hoàn toàn bằng tay, không sản xuất hàng loạt." },
  { emoji: "🧵", title: "Nguyên liệu tự nhiên", desc: "Ưu tiên sử dụng nguyên liệu thiên nhiên, thân thiện với môi trường." },
  { emoji: "💝", title: "Giao hàng tận tâm", desc: "Đóng gói cẩn thận, giao hàng toàn quốc với tình yêu gửi gắm." },
];

export default function About() {
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const ref3 = useScrollReveal();

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <div className="relative overflow-hidden py-16 mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-light via-pink-soft to-base" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-purple font-semibold text-sm uppercase tracking-widest">About us</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-dark mt-2 mb-4">
            Về chúng tôi
          </h1>
          <p className="text-dark-light text-lg max-w-2xl mx-auto">
            Handmade — nơi tình yêu được gửi gắm trong từng sản phẩm thủ công
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story */}
        <div ref={ref1} className="grid md:grid-cols-2 gap-10 items-center mb-20">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden border-4 border-white shadow-xl">
              <img
                src="https://picsum.photos/seed/about1/500/400"
                alt="Xưởng handmade"
                className="w-full h-72 md:h-80 object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-pink/10 rounded-full blur-xl" />
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark mb-5">
              Câu chuyện bắt đầu từ <span className="text-gradient">đam mê</span>
            </h2>
            <p className="text-dark-light leading-relaxed mb-4">
              Handmade được thành lập bởi một nhóm nghệ nhân trẻ yêu thích nghệ
              thuật thủ công truyền thống Việt Nam. Chúng tôi tin rằng trong thời
              đại công nghiệp hoá, những sản phẩm được làm bằng tay mang một giá
              trị đặc biệt.
            </p>
            <p className="text-dark-light leading-relaxed">
              Mỗi sản phẩm tại Handmade đều trải qua quá trình tạo tác thủ công,
              từ khâu chọn nguyên liệu đến hoàn thiện, đảm bảo mang đến những món
              đồ độc nhất vô nhị cho bạn.
            </p>
          </div>
        </div>

        {/* Values */}
        <div ref={ref2} className="grid md:grid-cols-3 gap-5 mb-20 stagger-children">
          {values.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-7 text-center card-hover border border-gray/50"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-soft to-purple-light rounded-2xl flex items-center justify-center text-2xl">
                {item.emoji}
              </div>
              <h3 className="font-semibold text-dark mb-2 text-base">
                {item.title}
              </h3>
              <p className="text-dark-light text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div ref={ref3} className="bg-gradient-to-br from-dark via-dark to-purple-dark rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-pink/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <HiOutlineSparkles className="w-8 h-8 text-pink mx-auto mb-4" />
            <h2 className="font-display text-3xl font-bold text-white mb-10">
              Những con số ấn tượng
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { num: "500+", label: "Sản phẩm" },
                { num: "2,000+", label: "Khách hàng" },
                { num: "50+", label: "Nghệ nhân" },
                { num: "4.9★", label: "Đánh giá" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink to-purple">
                    {s.num}
                  </p>
                  <p className="text-white/50 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
