import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { HiOutlineAdjustments, HiOutlineX } from "react-icons/hi";

const CATEGORIES = ["Tất cả", "Trang sức", "Phụ kiện tóc", "Túi xách", "Quà tặng", "Khác"];

export default function Shop() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "Tất cả";

  const [category, setCategory] = useState(initialCat);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [showFilter, setShowFilter] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const catMatch = category === "Tất cả" || p.category === category;
      const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
      return catMatch && priceMatch;
    });
  }, [products, category, priceRange]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (cat === "Tất cả") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-pink font-semibold text-sm uppercase tracking-widest">Shop</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-dark mt-2 mb-3">
            Cửa hàng
          </h1>
          <p className="text-dark-light max-w-md mx-auto">
            Khám phá bộ sưu tập handmade độc đáo của chúng tôi
          </p>
        </div>

        {/* Category pills (desktop) */}
        <div className="hidden md:flex items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border-none cursor-pointer ${
                category === cat
                  ? "btn-gradient shadow-md shadow-pink/15"
                  : "bg-white text-dark-light hover:text-dark hover:bg-base-dark border border-gray"
              }`}
            >
              {category === cat ? <span>{cat}</span> : cat}
            </button>
          ))}
        </div>

        {/* Filter toggle mobile */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="md:hidden flex items-center gap-2 mb-4 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray/50 text-dark font-medium cursor-pointer text-sm"
        >
          <HiOutlineAdjustments className="w-4 h-4" />
          Bộ lọc
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <aside
            className={`md:w-60 flex-shrink-0 ${
              showFilter ? "block" : "hidden md:block"
            }`}
          >
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray/50 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-dark text-sm uppercase tracking-wider">
                  Bộ lọc
                </h3>
                <button
                  onClick={() => setShowFilter(false)}
                  className="md:hidden bg-transparent border-none cursor-pointer text-dark-light hover:text-dark"
                >
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile category filter */}
              <div className="md:hidden mb-6">
                <h4 className="text-xs font-semibold text-dark-light uppercase tracking-wider mb-3">
                  Danh mục
                </h4>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`block w-full text-left px-3 py-2 rounded-xl text-sm transition-all border-none cursor-pointer ${
                        category === cat
                          ? "bg-pink-soft text-pink font-medium"
                          : "bg-transparent text-dark-light hover:bg-base-dark"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price filter */}
              <div>
                <h4 className="text-xs font-semibold text-dark-light uppercase tracking-wider mb-3">
                  Khoảng giá (₫)
                </h4>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([0, parseInt(e.target.value)])
                  }
                  className="w-full accent-pink"
                />
                <div className="flex justify-between text-xs text-dark-light mt-2">
                  <span>0 ₫</span>
                  <span className="font-medium text-dark">
                    {new Intl.NumberFormat("vi-VN").format(priceRange[1])} ₫
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <p className="text-sm text-dark-light mb-5">
              <span className="font-semibold text-dark">{filtered.length}</span> sản phẩm
            </p>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 stagger-children">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-4 bg-purple-light rounded-full flex items-center justify-center">
                  <HiOutlineAdjustments className="w-8 h-8 text-purple" />
                </div>
                <h3 className="font-display text-xl text-dark mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-dark-light text-sm">
                  Hãy thử thay đổi bộ lọc để tìm sản phẩm phù hợp
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
