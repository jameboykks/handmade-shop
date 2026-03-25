import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag, HiOutlineEye, HiOutlineHeart, HiHeart } from "react-icons/hi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN").format(price) + " ₫";
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imgLoaded, setImgLoaded] = useState(false);
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden card-hover border border-gray/50">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
        <div
          className={`absolute inset-0 bg-base-dark animate-pulse ${
            imgLoaded ? "hidden" : ""
          }`}
        />
        <img
          src={product.images?.[0] || "https://picsum.photos/seed/default/600/600"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onLoad={() => setImgLoaded(true)}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
          <span className="glass text-dark px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <HiOutlineEye className="w-3.5 h-3.5" />
            Xem chi tiết
          </span>
        </div>
        {/* Category badge */}
        <span className="absolute top-3 left-3 glass text-dark text-[11px] px-3 py-1 rounded-full font-medium">
          {product.category}
        </span>
      </Link>

      {/* Wishlist heart button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer border-none shadow-sm ${
          inWishlist
            ? "bg-pink text-white"
            : "glass text-dark-light hover:text-pink"
        }`}
        aria-label="Yêu thích"
      >
        {inWishlist ? (
          <HiHeart className="w-4 h-4" />
        ) : (
          <HiOutlineHeart className="w-4 h-4" />
        )}
      </button>

      {/* Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="no-underline">
          <h3 className="font-display text-base font-semibold text-dark mb-1 line-clamp-1 group-hover:text-pink transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gradient font-bold text-sm mb-3">
          {formatPrice(product.price)}
        </p>
        <button
          onClick={() => addToCart(product)}
          disabled={product.stock <= 0}
          className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-none ${
            product.stock > 0
              ? "btn-gradient hover:shadow-lg hover:shadow-pink/20 active:scale-[0.97]"
              : "bg-gray text-dark-light cursor-not-allowed"
          }`}
        >
          <HiOutlineShoppingBag className="w-4 h-4" />
          <span>{product.stock > 0 ? "Thêm vào giỏ" : "Hết hàng"}</span>
        </button>
      </div>
    </div>
  );
}

export { formatPrice };
