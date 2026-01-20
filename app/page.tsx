import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, getCategories } from "@/lib/products";
import ProductCard from "@/components/product/product-card";
import Button from "@/components/ui/button";

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const categories = getCategories();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
          alt="Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative z-10 mx-auto flex h-full items-center px-4">
          <div className="max-w-2xl text-white">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              Welcome to ShopHub
            </h1>
            <p className="mb-8 text-xl text-gray-200">
              Discover the latest products in electronics, fashion, home & living, and sports.
              Quality, style, and value in one place.
            </p>
            <div className="flex gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                  Shop Now
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group relative h-64 overflow-hidden rounded-lg"
              >
                <Image
                  src={category.image || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:bg-black/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products">
              <Button variant="ghost">View All →</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.8c0-.621.504-1.125 1.125-1.125h.75c.621 0 1.125.504 1.125 1.125v.8M12.75 18.75h-1.5M4.5 4.5l.195.195c.282.282.439.67.439 1.078v12.844c0 .414.336.75.75.75h14.25c.414 0 .75-.336.75-.75V7.5a2.25 2.25 0 00-2.25-2.25h-4.342a2.25 2.25 0 00-1.896 1.036l-1.9 2.7a2.25 2.25 0 01-1.896 1.036H8.25a2.25 2.25 0 00-2.25-2.25V4.5z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Free Shipping</h3>
              <p className="text-muted-foreground">On orders over $100</p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure Checkout</h3>
              <p className="text-muted-foreground">100% secure payment</p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.944 11.944 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">24/7 Support</h3>
              <p className="text-muted-foreground">We're here to help</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
