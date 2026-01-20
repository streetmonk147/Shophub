import { NextRequest, NextResponse } from "next/server";
import {
  getProducts,
  getProductsByCategory,
  searchProducts,
  filterProducts,
} from "@/lib/products";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minRating = searchParams.get("minRating");
  const tags = searchParams.get("tags");
  const sort = searchParams.get("sort") || "default";

  let products = getProducts();

  // Apply filters
  if (category) {
    products = getProductsByCategory(category);
  }

  if (search) {
    products = searchProducts(search).filter((p) =>
      category ? p.categorySlug === category : true
    );
  }

  const filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    tags?: string[];
  } = {};

  if (category) filters.category = category;
  if (minPrice) filters.minPrice = parseFloat(minPrice);
  if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
  if (minRating) filters.minRating = parseFloat(minRating);
  if (tags) filters.tags = tags.split(",");

  if (Object.keys(filters).length > 0) {
    products = filterProducts(filters);
  }

  // Apply sorting
  if (sort === "price-asc") {
    products.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
  } else if (sort === "price-desc") {
    products.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
  } else if (sort === "rating") {
    products.sort((a, b) => b.rating - a.rating);
  } else if (sort === "newest") {
    products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return NextResponse.json({ products });
}
