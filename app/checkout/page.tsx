"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CartItem } from "@/lib/types";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    paymentMethod: "card",
  });

  useEffect(() => {
    fetchCart();
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingAddress: {
            fullName: formData.fullName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          },
          paymentMethod: formData.paymentMethod,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/orders?success=true&orderId=${data.order.id}`);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to place order");
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order");
    } finally {
      setSubmitting(false);
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
          <p className="mb-8 text-muted-foreground">Add items to your cart before checkout.</p>
          <Button onClick={() => router.push("/products")}>Continue Shopping</Button>
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
      <h1 className="mb-8 text-4xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="mb-2 block text-sm font-medium">
                      Address
                    </label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="mb-2 block text-sm font-medium">
                        City
                      </label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="mb-2 block text-sm font-medium">
                        State
                      </label>
                      <Input
                        id="state"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="zipCode" className="mb-2 block text-sm font-medium">
                        ZIP Code
                      </label>
                      <Input
                        id="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="mb-2 block text-sm font-medium">
                        Country
                      </label>
                      <Input
                        id="country"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button type="button" onClick={() => setStep(2)} className="w-full">
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      />
                      <span>Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      />
                      <span>PayPal</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="apple"
                        checked={formData.paymentMethod === "apple"}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      />
                      <span>Apple Pay</span>
                    </label>
                  </div>
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button type="button" onClick={() => setStep(3)} className="flex-1">
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold">Shipping To:</h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.fullName}
                      <br />
                      {formData.address}
                      <br />
                      {formData.city}, {formData.state} {formData.zipCode}
                      <br />
                      {formData.country}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Payment Method:</h3>
                    <p className="text-sm text-muted-foreground capitalize">{formData.paymentMethod}</p>
                  </div>
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" disabled={submitting} className="flex-1">
                      {submitting ? "Placing Order..." : "Place Order"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
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
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span>
                      {item.productName} x{item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
