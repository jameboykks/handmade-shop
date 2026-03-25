import { useCart } from "../context/CartContext";
import { HiCheckCircle } from "react-icons/hi";

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] toast-enter">
      <div className="glass-dark text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-dark/20 flex items-center gap-3 max-w-sm border border-white/10">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-mint to-mint-dark flex items-center justify-center flex-shrink-0">
          <HiCheckCircle className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium">{toast}</span>
      </div>
    </div>
  );
}
