// Order management utilities
import type { Order, CartItem, OrderStatus } from "./types";
import { getCart, clearCart } from "./cart";
import crypto from "crypto";

// In-memory order store (in production, use a database)
const orders: Order[] = [];

export async function createOrder(
  userId: string,
  shippingAddress: Order["shippingAddress"],
  paymentMethod: string
): Promise<Order> {
  const cart = await getCart();

  if (cart.length === 0) {
    throw new Error("Cart is empty");
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const order: Order = {
    id: crypto.randomUUID(),
    userId,
    items: [...cart],
    shippingAddress,
    paymentMethod,
    subtotal,
    shipping,
    tax,
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  orders.push(order);
  await clearCart();

  // Simulate payment processing
  setTimeout(() => {
    order.status = "processing";
    order.updatedAt = new Date().toISOString();
  }, 1000);

  return order;
}

export function getOrdersByUserId(userId: string): Order[] {
  return orders.filter((o) => o.userId === userId).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getOrderById(orderId: string): Order | undefined {
  return orders.find((o) => o.id === orderId);
}

export function updateOrderStatus(orderId: string, status: OrderStatus): void {
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.status = status;
    order.updatedAt = new Date().toISOString();
  }
}

export function getAllOrders(): Order[] {
  return [...orders].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
