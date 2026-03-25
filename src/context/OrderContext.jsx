import { createContext, useContext, useState, useEffect, useCallback } from "react";

const OrderContext = createContext();
const STORAGE_KEY = "handmade_orders";

function loadOrders() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = useCallback((orderData) => {
    const newOrder = {
      id: "ORD" + Date.now(),
      customer: orderData.customerInfo.name,
      customerInfo: orderData.customerInfo,
      items: orderData.items,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
      status: orderData.paymentMethod === "cod" ? "Chờ xác nhận" : "Đang xử lý",
      date: new Date().toISOString().split("T")[0],
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const getOrder = useCallback(
    (id) => orders.find((o) => o.id === id),
    [orders]
  );

  const updateOrderStatus = useCallback((id, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  }, []);

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
