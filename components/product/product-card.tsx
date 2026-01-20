"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const price = product.discountPrice || product.price;
  const originalPrice = product.discountPrice ? product.price : null;

  async function handleAddToCart(e: React.FormEvent) {
    e.preventDefault();
    setIsAdding(true);
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", productId: product.id, quantity: 1 }),
      });
      if (response.ok) {
        // Trigger cart count update
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-2">
            {product.badges.map((badge) => (
              <Badge
                key={badge}
                variant={badge === "Sale" ? "destructive" : badge === "New" ? "success" : "default"}
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="mb-2 text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{product.description}</p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">${price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.rating > 0 && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>★</span>
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-xs">({product.reviewCount})</span>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleAddToCart} className="mt-4">
          <Button type="submit" className="w-full" size="sm" disabled={isAdding}>
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </form>
      </div>
    </div>
  );
}
