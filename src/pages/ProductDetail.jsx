import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard, { formatPrice } from "../components/ProductCard";
import {
  HiOutlineShoppingBag,
  HiOutlineChevronLeft,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineHeart,
  HiHeart,
  HiStar,
  HiOutlineStar,
} from "react-icons/hi";

// Mock reviews data keyed by product ID pattern
const reviewsData = {
  default: [
    {
      id: 1,
      name: "Nguyễn Thị Mai",
      rating: 5,
      date: "15/03/2026",
      text: "Sản phẩm rất đẹp, chất lượng tuyệt vời! Đóng gói cẩn thận, giao hàng nhanh. Mình rất hài lòng và sẽ mua thêm để tặng bạn bè.",
    },
    {
      id: 2,
      name: "Trần Văn Hoàng",
      rating: 4,
      date: "10/03/2026",
      text: "Mua làm quà tặng cho vợ, cô ấy rất thích. Sản phẩm handmade rất tinh tế và độc đáo. Sẽ ủng hộ shop lần sau.",
    },
    {
      id: 3,
      name: "Lê Phương Anh",
      rating: 5,
      date: "05/03/2026",
      text: "Lần thứ 3 mua hàng ở đây rồi, lần nào cũng ưng ý. Sản phẩm handmade thật sự khác biệt so với hàng công nghiệp. Rất recommend cho mọi người!",
    },
  ],
  set2: [
    {
      id: 4,
      name: "Phạm Minh Tâm",
      rating: 5,
      date: "12/03/2026",
      text: "Xinh quá luôn! Màu sắc đúng như hình, chất liệu rất tốt. Shop gói quà rất đẹp nữa, mình rất thích.",
    },
    {
      id: 5,
      name: "Đỗ Hải Yến",
      rating: 4,
      date: "08/03/2026",
      text: "Sản phẩm đẹp, tinh xảo. Giao hàng hơi lâu một chút nhưng bù lại chất lượng rất ổn. Sẽ quay lại mua thêm.",
    },
    {
      id: 6,
      name: "Vũ Quốc Bảo",
      rating: 5,
      date: "01/03/2026",
      text: "Tuyệt vời! Mua tặng mẹ nhân ngày 8/3, mẹ mình rất vui. Cảm ơn shop đã làm ra những sản phẩm ý nghĩa như vậy.",
    },
  ],
};

function getReviewsForProduct(productId) {
  // Alternate between review sets based on product ID
  const idNum = parseInt(productId) || 0;
  return idNum % 2 === 0 ? reviewsData.default : reviewsData.set2;
}

function getAverageRating(reviews) {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return (sum / reviews.length).toFixed(1);
}

function StarRating({ rating, size = "w-4 h-4" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <HiStar key={star} className={`${size} text-yellow-400`} />
        ) : (
          <HiOutlineStar key={star} className={`${size} text-gray`} />
        )
      )}
    </div>
  );
}

function getEstimatedDelivery() {
  const today = new Date();
  // Add 3 business days for start
  let startDate = new Date(today);
  let daysAdded = 0;
  while (daysAdded < 3) {
    startDate.setDate(startDate.getDate() + 1);
    const day = startDate.getDay();
    if (day !== 0 && day !== 6) daysAdded++;
  }
  // Add 5 business days for end
  let endDate = new Date(today);
  daysAdded = 0;
  while (daysAdded < 5) {
    endDate.setDate(endDate.getDate() + 1);
    const day = endDate.getDay();
    if (day !== 0 && day !== 6) daysAdded++;
  }
  const fmt = (d) =>
    `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
  return `${fmt(startDate)} - ${fmt(endDate)}`;
}

export default function ProductDetail() {
  const { id } = useParams();
  const { getProduct, products } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const product = getProduct(id);
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [reviewToast, setReviewToast] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-purple-light rounded-full flex items-center justify-center">
            <HiOutlineShoppingBag className="w-8 h-8 text-purple" />
          </div>
          <h2 className="font-display text-2xl text-dark mb-4">
            Không tìm thấy sản phẩm
          </h2>
          <Link
            to="/shop"
            className="text-purple font-semibold hover:text-purple-dark transition-colors no-underline"
          >
            ← Quay lại cửa hàng
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const reviews = getReviewsForProduct(product.id);
  const avgRating = getAverageRating(reviews);
  const estimatedDelivery = getEstimatedDelivery();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleWriteReview = () => {
    setReviewToast(true);
    setTimeout(() => setReviewToast(false), 3000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-1 text-dark-light hover:text-purple transition-colors mb-8 text-sm no-underline font-medium"
        >
          <HiOutlineChevronLeft className="w-4 h-4" />
          Quay lại cửa hàng
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-base-dark mb-4 border border-gray/50">
              <img
                src={product.images?.[selectedImg] || "https://picsum.photos/seed/default/600/600"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer p-0 ${
                      selectedImg === i
                        ? "border-pink shadow-md shadow-pink/20"
                        : "border-gray/50 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <span className="inline-block bg-purple-light text-purple text-xs px-3 py-1.5 rounded-full mb-4 font-semibold">
              {product.category}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-dark mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-bold mb-4">
              <span className="text-gradient">{formatPrice(product.price)}</span>
            </p>

            {/* Average rating */}
            <div className="flex items-center gap-2 mb-6">
              <StarRating rating={Math.round(parseFloat(avgRating))} />
              <span className="text-sm font-semibold text-dark">{avgRating}</span>
              <span className="text-sm text-dark-light">({reviews.length} đánh giá)</span>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-4">
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 bg-mint-light text-mint-dark text-sm font-medium px-3 py-1.5 rounded-full">
                  <HiOutlineCheckCircle className="w-4 h-4" />
                  Còn {product.stock} sản phẩm
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-pink-light text-pink-dark text-sm font-medium px-3 py-1.5 rounded-full">
                  <HiOutlineXCircle className="w-4 h-4" />
                  Hết hàng
                </span>
              )}
            </div>

            {/* Estimated shipping */}
            <div className="flex items-center gap-2 mb-6 bg-base-dark rounded-xl px-4 py-3">
              <HiOutlineTruck className="w-5 h-5 text-purple flex-shrink-0" />
              <p className="text-sm text-dark">
                <span className="font-medium">Giao hàng dự kiến:</span>{" "}
                <span className="text-purple font-semibold">{estimatedDelivery}</span>
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-semibold text-dark text-sm uppercase tracking-wider mb-3">
                Mô tả
              </h3>
              <p className="text-dark-light leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Add to cart + Wishlist */}
            {product.stock > 0 && (
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center bg-base-dark rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-3 text-dark hover:bg-gray transition-colors bg-transparent border-none cursor-pointer text-lg font-medium"
                  >
                    −
                  </button>
                  <span className="px-4 py-3 font-semibold text-dark min-w-[3rem] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    className="px-4 py-3 text-dark hover:bg-gray transition-colors bg-transparent border-none cursor-pointer text-lg font-medium"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => addToCart(product, qty)}
                  className="flex-1 btn-gradient py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-pink/20 hover:shadow-xl hover:shadow-pink/25 active:scale-[0.98] transition-all"
                >
                  <HiOutlineShoppingBag className="w-5 h-5" />
                  <span>Thêm vào giỏ</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer bg-transparent ${
                    inWishlist
                      ? "border-pink bg-pink-soft text-pink"
                      : "border-gray/50 text-dark-light hover:border-pink hover:text-pink"
                  }`}
                  aria-label="Yêu thích"
                >
                  {inWishlist ? (
                    <HiHeart className="w-5 h-5" />
                  ) : (
                    <HiOutlineHeart className="w-5 h-5" />
                  )}
                </button>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: HiOutlineTruck, text: "Miễn phí giao hàng" },
                { icon: HiOutlineShieldCheck, text: "Bảo hành 30 ngày" },
                { icon: HiOutlineRefresh, text: "Đổi trả dễ dàng" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="text-center p-3 bg-base-dark rounded-xl">
                  <Icon className="w-5 h-5 mx-auto text-purple mb-1" />
                  <p className="text-[11px] text-dark-light font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark">
                Đánh giá từ khách hàng
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <StarRating rating={Math.round(parseFloat(avgRating))} size="w-5 h-5" />
                <span className="text-lg font-bold text-dark">{avgRating}</span>
                <span className="text-dark-light">trên {reviews.length} đánh giá</span>
              </div>
            </div>
            <button
              onClick={handleWriteReview}
              className="btn-gradient px-6 py-3 rounded-2xl font-semibold text-sm cursor-pointer shadow-lg shadow-pink/20 hover:shadow-xl hover:shadow-pink/25 active:scale-[0.98] transition-all self-start"
            >
              <span>Viết đánh giá</span>
            </button>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-3xl p-6 border border-gray/50 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar placeholder */}
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink to-purple flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                      <span className="font-semibold text-dark text-sm">
                        {review.name}
                      </span>
                      <span className="text-xs text-dark-light">{review.date}</span>
                    </div>
                    <StarRating rating={review.rating} />
                    <p className="text-dark-light text-sm leading-relaxed mt-3">
                      {review.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Review toast */}
        {reviewToast && (
          <div className="fixed bottom-6 right-6 z-[100] toast-enter">
            <div className="glass-dark text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-dark/20 flex items-center gap-3 max-w-sm border border-white/10">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink to-purple flex items-center justify-center flex-shrink-0">
                <HiStar className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">
                Cảm ơn bạn! Tính năng đánh giá sẽ sớm ra mắt.
              </span>
            </div>
          </div>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark mb-8">
              Sản phẩm liên quan
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
