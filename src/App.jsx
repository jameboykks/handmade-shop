import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import ChatBubble from "./components/ChatBubble";
import PageTransition from "./components/PageTransition";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/ProductList";
import ProductForm from "./pages/admin/ProductForm";

function StorefrontLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
      <Toast />
      <ChatBubble />
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
        </Route>
      </Routes>
    );
  }

  return <StorefrontLayout />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}
