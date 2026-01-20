import Link from "next/link";
import Button from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <h2 className="mb-4 text-3xl font-semibold">Page Not Found</h2>
      <p className="mb-8 text-lg text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button size="lg">Go Home</Button>
        </Link>
        <Link href="/products">
          <Button size="lg" variant="outline">Browse Products</Button>
        </Link>
      </div>
    </div>
  );
}
