import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { HiOutlineSparkles, HiOutlineHeart, HiOutlineGift, HiOutlineStar, HiArrowRight } from "react-icons/hi";
import useScrollReveal from "../hooks/useScrollReveal";

const categories = [
  { name: "Trang sức", icon: HiOutlineSparkles, gradient: "from-pink to-coral" },
  { name: "Phụ kiện tóc", icon: HiOutlineStar, gradient: "from-purple to-lavender" },
  { name: "Quà tặng", icon: HiOutlineGift, gradient: "from-mint to-mint-dark" },
  { name: "Túi xách", icon: HiOutlineHeart, gradient: "from-peach to-pink" },
];

export default function Home() {
  const { getFeatured, products } = useProducts();
  const featured = getFeatured();
  const latestProducts = products.slice(-8).reverse();
  const heroRef = useScrollReveal();
  const catRef = useScrollReveal();
  const gridRef = useScrollReveal();
  const storyRef = useScrollReveal();

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-soft via-base to-purple-light" />
        <div className="absolute top-20 right-[10%] w-80 h-80 bg-pink/15 rounded-full blur-[80px] animate-blob" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-purple/10 rounded-full blur-[80px] animate-blob" style={{ animationDelay: "-4s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mint/5 rounded-full blur-[100px]" />

        {/* Floating decorative elements */}
        <div className="absolute top-32 left-[15%] w-3 h-3 rounded-full bg-pink/30 animate-float" />
        <div className="absolute top-48 right-[20%] w-2 h-2 rounded-full bg-purple/40 animate-float" style={{ animationDelay: "-2s" }} />
        <div className="absolute bottom-32 left-[25%] w-4 h-4 rounded-full bg-mint/20 animate-float" style={{ animationDelay: "-3s" }} />

        <div className="relative text-center px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/50 rounded-full px-5 py-2 mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
            <span className="text-dark-light text-sm font-medium">
              Thủ công mỹ nghệ Việt Nam
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-dark leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Handcrafted
            <br />
            <span className="text-gradient italic">with Love</span>
          </h1>
          <p className="font-body text-dark-light text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Mỗi sản phẩm là một tác phẩm nghệ thuật, được tạo nên bởi tình yêu
            và sự tỉ mỉ trong từng đường kim mũi chỉ.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/shop"
              className="btn-gradient px-8 py-4 rounded-2xl font-semibold text-base flex items-center gap-2 no-underline shadow-xl shadow-pink/20 hover:shadow-2xl hover:shadow-pink/30 hover:-translate-y-0.5 transition-all"
            >
              <span>Khám phá ngay</span>
              <HiArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 rounded-2xl font-semibold text-base text-dark border-2 border-gray hover:border-purple hover:text-purple transition-all no-underline"
            >
              Câu chuyện của chúng tôi
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section ref={catRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-pink font-semibold text-sm uppercase tracking-widest">Danh mục</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark mt-2">
            Khám phá bộ sưu tập
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 stagger-children">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group bg-white rounded-3xl p-6 sm:p-8 text-center card-hover border border-gray/50 no-underline"
            >
              <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <cat.icon className="w-7 h-7 text-white" />
              </div>
              <span className="font-semibold text-dark text-sm">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-pink font-semibold text-sm uppercase tracking-widest">Nổi bật</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark mt-2">
              Sản phẩm yêu thích
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-purple hover:text-purple-dark transition-colors no-underline"
          >
            Xem tất cả <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {featured.length > 0 || products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 stagger-children">
            {(featured.length >= 4 ? featured : latestProducts)
              .slice(0, 8)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-purple-light rounded-full flex items-center justify-center">
              <HiOutlineSparkles className="w-8 h-8 text-purple" />
            </div>
            <p className="text-dark-light text-lg">Chưa có sản phẩm nào</p>
          </div>
        )}
        <div className="text-center mt-10 sm:hidden">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple no-underline"
          >
            Xem tất cả sản phẩm <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Our Story */}
      <section ref={storyRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-light via-pink-soft to-mint-light" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-purple font-semibold text-sm uppercase tracking-widest">Our Story</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark mt-2 mb-6">
                Nơi nghệ thuật thủ công
                <br />
                <span className="text-gradient">gặp gỡ tình yêu</span>
              </h2>
              <p className="text-dark-light leading-relaxed mb-4">
                Handmade ra đời từ niềm đam mê dành cho những sản phẩm thủ công
                mang đậm nét văn hóa Việt. Chúng tôi tin rằng mỗi món đồ handmade
                đều mang trong mình một câu chuyện.
              </p>
              <p className="text-dark-light leading-relaxed mb-8">
                Từ những viên đá quý được chọn lọc kỹ càng đến từng đường thêu tỉ mỉ,
                mỗi sản phẩm đều là duy nhất, giống như chính bạn.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-purple font-semibold hover:text-purple-dark transition-colors no-underline group"
              >
                Tìm hiểu thêm
                <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-purple/10 border-4 border-white">
                <img
                  src="https://picsum.photos/seed/ourstory/600/500"
                  alt="Câu chuyện của chúng tôi"
                  className="w-full h-80 md:h-[420px] object-cover"
                />
              </div>
              {/* Floating stats */}
              <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-lg animate-float">
                <p className="text-2xl font-bold text-gradient">500+</p>
                <p className="text-xs text-dark-light">Sản phẩm thủ công</p>
              </div>
              <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 shadow-lg animate-float" style={{ animationDelay: "-3s" }}>
                <p className="text-2xl font-bold text-gradient-alt">2K+</p>
                <p className="text-xs text-dark-light">Khách hàng tin yêu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative bg-gradient-to-br from-dark via-dark to-purple-dark rounded-[2rem] p-8 sm:p-14 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Đừng bỏ lỡ sản phẩm mới
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Đăng ký nhận thông báo để cập nhật những sản phẩm handmade mới nhất và ưu đãi đặc biệt.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-pink/50 focus:ring-1 focus:ring-pink/50 transition-colors font-body box-border"
              />
              <button className="btn-gradient px-6 py-3.5 rounded-xl font-semibold text-sm cursor-pointer shadow-lg shadow-pink/20">
                <span>Đăng ký</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
