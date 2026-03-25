import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { formatPrice } from "../../components/ProductCard";
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlusCircle, HiOutlineCollection } from "react-icons/hi";

export default function ProductList() {
  const { products, deleteProduct } = useProducts();
  const [confirm, setConfirm] = useState(null);

  const handleDelete = (id) => {
    deleteProduct(id);
    setConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-dark">
          Quản lý sản phẩm
        </h1>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 btn-gradient px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-pink/15 no-underline"
        >
          <HiOutlinePlusCircle className="w-5 h-5" />
          <span>Thêm mới</span>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray/50">
          <div className="w-20 h-20 mx-auto mb-4 bg-purple-light rounded-full flex items-center justify-center">
            <HiOutlineCollection className="w-8 h-8 text-purple" />
          </div>
          <h3 className="font-display text-xl text-dark mb-2 font-bold">
            Chưa có sản phẩm nào
          </h3>
          <p className="text-dark-light text-sm mb-6">
            Bắt đầu thêm sản phẩm đầu tiên của bạn
          </p>
          <Link
            to="/admin/products/new"
            className="btn-gradient inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-pink/15 no-underline"
          >
            <HiOutlinePlusCircle className="w-4 h-4" />
            <span>Thêm sản phẩm</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-base/50">
                  <th className="text-left px-5 py-3 font-medium text-dark-light text-xs uppercase tracking-wider">Sản phẩm</th>
                  <th className="text-left px-5 py-3 font-medium text-dark-light text-xs uppercase tracking-wider hidden sm:table-cell">Danh mục</th>
                  <th className="text-left px-5 py-3 font-medium text-dark-light text-xs uppercase tracking-wider">Giá</th>
                  <th className="text-left px-5 py-3 font-medium text-dark-light text-xs uppercase tracking-wider hidden md:table-cell">Kho</th>
                  <th className="text-right px-5 py-3 font-medium text-dark-light text-xs uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-gray/30 hover:bg-base/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images?.[0] || "https://picsum.photos/seed/default/100/100"}
                          alt={product.name}
                          className="w-10 h-10 rounded-xl object-cover flex-shrink-0 border border-gray/50"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-dark truncate max-w-[200px]">{product.name}</p>
                          <p className="text-xs text-dark-light sm:hidden">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <span className="text-xs font-medium text-purple bg-purple-light px-2.5 py-1 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-dark font-medium">{formatPrice(product.price)}</td>
                    <td className="px-5 py-3.5 text-dark-light hidden md:table-cell">{product.stock}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="p-2 text-dark-light hover:text-purple hover:bg-purple-light transition-all rounded-lg"
                        >
                          <HiOutlinePencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setConfirm(product.id)}
                          className="p-2 text-dark-light hover:text-pink hover:bg-pink-soft transition-all bg-transparent border-none cursor-pointer rounded-lg"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {confirm && (
        <div
          className="fixed inset-0 bg-dark/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setConfirm(null)}
        >
          <div
            className="bg-white rounded-3xl p-7 max-w-sm w-full shadow-2xl animate-fade-in border border-gray/50"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-xl font-bold text-dark mb-2">
              Xác nhận xoá?
            </h3>
            <p className="text-dark-light text-sm mb-6">
              Hành động này không thể hoàn tác. Sản phẩm sẽ bị xoá vĩnh viễn.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirm(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray text-dark font-medium hover:bg-base-dark transition-all cursor-pointer bg-transparent"
              >
                Huỷ
              </button>
              <button
                onClick={() => handleDelete(confirm)}
                className="flex-1 py-2.5 rounded-xl bg-pink text-white font-medium hover:bg-pink-dark transition-all cursor-pointer border-none"
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
