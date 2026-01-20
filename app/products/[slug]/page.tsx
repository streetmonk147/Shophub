import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/product/product-card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import AddToCartButton from "@/components/product/add-to-cart-button";

export async function generateStaticParams() {
  const products = await import("@/lib/products").then((m) => m.getProducts());
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const price = product.discountPrice || product.price;
  const originalPrice = product.discountPrice ? product.price : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg border">
                  <Image src={image} alt={`${product.name} ${index + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            {product.badges && product.badges.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
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
            <h1 className="mb-4 text-4xl font-bold">{product.name}</h1>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-primary">${price.toFixed(2)}</span>
                {originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.rating > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="font-medium">{product.rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
                </div>
              )}
            </div>
            <p className="text-lg text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium">Availability</p>
              <p className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
              </p>
            </div>

            {product.longDescription && (
              <div>
                <p className="mb-2 text-sm font-medium">Description</p>
                <p className="text-muted-foreground whitespace-pre-line">{product.longDescription}</p>
              </div>
            )}

            {product.tags.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-8 text-3xl font-bold">Related Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
