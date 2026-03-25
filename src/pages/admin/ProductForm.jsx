import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { HiOutlinePhotograph, HiOutlineX, HiOutlineCheck } from "react-icons/hi";

const CATEGORIES = ["Trang sức", "Phụ kiện tóc", "Túi xách", "Quà tặng", "Khác"];

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, addProduct, updateProduct } = useProducts();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    category: "Trang sức",
    price: "",
    description: "",
    stock: "",
    featured: false,
    images: [],
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const product = getProduct(id);
      if (product) {
        setForm({
          name: product.name,
          category: product.category,
          price: product.price.toString(),
          description: product.description,
          stock: product.stock.toString(),
          featured: product.featured,
          images: product.images || [],
        });
      }
    }
  }, [id, isEdit, getProduct]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (form.images.length + files.length > 5) {
      alert("Tối đa 5 ảnh");
      return;
    }
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((prev) => ({ ...prev, images: [...prev.images, ev.target.result] }));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removeImage = (index) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Vui lòng nhập tên sản phẩm";
    if (!form.price || Number(form.price) <= 0) errs.price = "Vui lòng nhập giá hợp lệ";
    if (form.images.length === 0) errs.images = "Vui lòng thêm ít nhất 1 ảnh";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const productData = {
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      description: form.description.trim(),
      stock: Number(form.stock) || 0,
      featured: form.featured,
      images: form.images,
    };
    if (isEdit) updateProduct(id, productData);
    else addProduct(productData);
    setTimeout(() => navigate("/admin/products"), 300);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border bg-base/50 text-dark focus:outline-none focus:ring-2 transition-all font-body box-border ${
      errors[field]
        ? "border-pink focus:ring-pink/20"
        : "border-gray focus:border-purple focus:ring-purple/10"
    }`;

  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-dark mb-8">
        {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray/50 space-y-6">
          {/* Images */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-3">
              Hình ảnh <span className="text-pink">*</span>
              <span className="text-dark-light font-normal ml-1 text-xs">(tối đa 5 ảnh)</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {form.images.map((img, i) => (
                <div key={i} className="relative w-24 h-24 group rounded-xl overflow-hidden border border-gray/50">
                  <img src={img} alt={`Ảnh ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 bg-dark/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-none"
                  >
                    <HiOutlineX className="w-5 h-5 text-white" />
                  </button>
                </div>
              ))}
              {form.images.length < 5 && (
                <label className="w-24 h-24 border-2 border-dashed border-gray rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-purple hover:bg-purple-light/30 transition-all">
                  <HiOutlinePhotograph className="w-6 h-6 text-dark-light" />
                  <span className="text-[10px] text-dark-light mt-1 font-medium">Thêm ảnh</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
            {errors.images && <p className="text-pink text-xs mt-2 font-medium">{errors.images}</p>}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              Tên sản phẩm <span className="text-pink">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={inputClass("name")}
              placeholder="VD: Vòng tay đá thạch anh hồng"
            />
            {errors.name && <p className="text-pink text-xs mt-1 font-medium">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">Danh mục</label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className={inputClass()}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">
                Giá (₫) <span className="text-pink">*</span>
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className={inputClass("price")}
                placeholder="150000"
                min="0"
              />
              {errors.price && <p className="text-pink text-xs mt-1 font-medium">{errors.price}</p>}
              {form.price > 0 && (
                <p className="text-dark-light text-xs mt-1">
                  {new Intl.NumberFormat("vi-VN").format(form.price)} ₫
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">Số lượng kho</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
                className={inputClass()}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">Mô tả</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              className={`${inputClass()} resize-none`}
              placeholder="Mô tả chi tiết sản phẩm..."
            />
          </div>

          {/* Featured toggle */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => handleChange("featured", !form.featured)}
          >
            <div
              className={`relative w-12 h-7 rounded-full transition-all ${
                form.featured
                  ? "bg-gradient-to-r from-pink to-purple"
                  : "bg-gray"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform shadow-md flex items-center justify-center ${
                  form.featured ? "translate-x-5" : "translate-x-0"
                }`}
              >
                {form.featured && <HiOutlineCheck className="w-3 h-3 text-pink" />}
              </span>
            </div>
            <span className="text-sm text-dark font-medium">
              Sản phẩm nổi bật (hiển thị trên trang chủ)
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-6 py-3 rounded-xl border border-gray text-dark font-medium hover:bg-base-dark transition-all cursor-pointer bg-transparent"
          >
            Huỷ
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-gradient px-8 py-3 rounded-xl font-semibold shadow-lg shadow-pink/15 cursor-pointer disabled:opacity-50 transition-all"
          >
            <span>
              {saving ? "Đang lưu..." : isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
