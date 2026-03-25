import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import ProductCard, { formatPrice } from "../components/ProductCard";
import { HiOutlineShoppingBag, HiOutlineChevronLeft, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineShieldCheck, HiOutlineTruck, HiOutlineRefresh } from "react-icons/hi";

export default function ProductDetail() {
  const { id } = useParams();
  const { getProduct, products } = useProducts();
  const { addToCart } = useCart();
  const product = getProduct(id);
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);

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

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

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
            <p className="text-3xl font-bold mb-6">
              <span className="text-gradient">{formatPrice(product.price)}</span>
            </p>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
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

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-semibold text-dark text-sm uppercase tracking-wider mb-3">
                Mô tả
              </h3>
              <p className="text-dark-light leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Add to cart */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-8">
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
