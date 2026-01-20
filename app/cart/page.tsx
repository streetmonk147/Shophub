"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CartItem } from "@/lib/types";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
    window.addEventListener("cartUpdated", fetchCart);
    return () => window.removeEventListener("cartUpdated", fetchCart);
  }, []);

  async function fetchCart() {
    try {
      const response = await fetch("/api/cart");
      const data = await response.json();
      setCart(data.cart || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateQuantity(productId: string, quantity: number) {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", productId, quantity }),
      });
      if (response.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  }

  async function removeItem(productId: string) {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove", productId }),
      });
      if (response.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="mb-4 text-3xl font-bold">Your Cart is Empty</h1>
          <p className="mb-8 text-muted-foreground">Start shopping to add items to your cart.</p>
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = total;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.productId} className="flex gap-4 rounded-lg border bg-card p-4">
              <Link href={`/products/${item.slug}`} className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded">
                <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="font-semibold hover:text-primary">{item.productName}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label htmlFor={`qty-${item.productId}`} className="text-sm">
                      Qty:
                    </label>
                    <Input
                      id={`qty-${item.productId}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                      className="w-20"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.productId)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            {subtotal < 100 && (
              <p className="mb-4 text-sm text-muted-foreground">
                Add ${(100 - subtotal).toFixed(2)} more for free shipping!
              </p>
            )}
            <Link href="/checkout" className="block">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
            <Link href="/products" className="mt-4 block">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
