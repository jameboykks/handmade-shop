import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { HiOutlineHeart, HiArrowRight } from "react-icons/hi";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const { products } = useProducts();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-pink font-semibold text-sm uppercase tracking-widest">
            Yêu thích
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-dark mt-2 mb-3">
            Sản phẩm yêu thích
          </h1>
          <p className="text-dark-light max-w-md mx-auto">
            Những sản phẩm bạn đã lưu để mua sau
          </p>
        </div>

        {wishlistProducts.length > 0 ? (
          <>
            <p className="text-sm text-dark-light mb-6">
              <span className="font-semibold text-dark">{wishlistProducts.length}</span> sản phẩm yêu thích
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 stagger-children">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 bg-pink-soft rounded-full flex items-center justify-center">
              <HiOutlineHeart className="w-8 h-8 text-pink" />
            </div>
            <h3 className="font-display text-xl text-dark mb-2">
              Chưa có sản phẩm yêu thích
            </h3>
            <p className="text-dark-light text-sm mb-6">
              Hãy khám phá và thêm sản phẩm bạn yêu thích vào danh sách
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 btn-gradient px-6 py-3 rounded-2xl font-semibold text-sm no-underline shadow-lg shadow-pink/20"
            >
              <span>Khám phá cửa hàng</span>
              <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
