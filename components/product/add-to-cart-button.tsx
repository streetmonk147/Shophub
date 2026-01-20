"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  async function handleAddToCart() {
    if (product.stock === 0) return;

    setIsAdding(true);
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", productId: product.id, quantity }),
      });
      if (response.ok) {
        window.dispatchEvent(new Event("cartUpdated"));
        alert("Added to cart!");
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-2">
        <label htmlFor="quantity" className="text-sm font-medium">
          Quantity:
        </label>
        <Input
          id="quantity"
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
          className="w-20"
        />
      </div>
      <Button
        onClick={handleAddToCart}
        disabled={isAdding || product.stock === 0}
        className="flex-1"
        size="lg"
      >
        {isAdding ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
}
