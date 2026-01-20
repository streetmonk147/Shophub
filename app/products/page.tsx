"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/product/product-card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  useEffect(() => {
    fetchProducts();
  }, [category, sort, priceRange]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (sort !== "default") params.append("sort", sort);
      if (priceRange.min) params.append("minPrice", priceRange.min);
      if (priceRange.max) params.append("maxPrice", priceRange.max);
      if (search) params.append("search", search);

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchProducts();
  }

  const categories = [
    { slug: "", name: "All Categories" },
    { slug: "electronics", name: "Electronics" },
    { slug: "fashion", name: "Fashion" },
    { slug: "home-living", name: "Home & Living" },
    { slug: "sports-outdoors", name: "Sports & Outdoors" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Shop All Products</h1>
        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
          <Input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Filters</h2>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium">Price Range</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium">Sort By</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setCategory("");
                setSort("default");
                setPriceRange({ min: "", max: "" });
                setSearch("");
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
