import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-96 w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop"
          alt="About Us"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative z-10 mx-auto flex h-full items-center px-4">
          <h1 className="text-5xl font-bold text-white">About ShopHub</h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
            <p className="mb-4 text-lg text-muted-foreground">
              At ShopHub, we believe that shopping should be an enjoyable and seamless experience.
              Our mission is to provide customers with high-quality products at competitive prices,
              backed by exceptional customer service.
            </p>
            <p className="text-lg text-muted-foreground">
              We curate products from trusted suppliers and brands, ensuring that every item meets
              our strict quality standards. Whether you're looking for the latest electronics,
              trendy fashion, home essentials, or sports equipment, we've got you covered.
            </p>
          </div>
          <div className="relative h-96 overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
              alt="Our Mission"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 text-4xl">🎯</div>
                <h3 className="mb-2 text-xl font-semibold">Quality First</h3>
                <p className="text-muted-foreground">
                  We carefully select every product to ensure it meets our high standards for
                  quality and durability.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 text-4xl">💝</div>
                <h3 className="mb-2 text-xl font-semibold">Customer Focus</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. We're committed to providing exceptional
                  service and support.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 text-4xl">🚀</div>
                <h3 className="mb-2 text-xl font-semibold">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously improve our platform and services to provide the best shopping
                  experience possible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">10K+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">500+</div>
            <div className="text-muted-foreground">Products</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">50+</div>
            <div className="text-muted-foreground">Brands</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
        </div>
      </section>
    </div>
  );
}
