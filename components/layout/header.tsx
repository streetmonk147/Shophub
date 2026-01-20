"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    async function updateCartCount() {
      try {
        const response = await fetch("/api/cart");
        if (response.ok) {
          const data = await response.json();
          setCartCount(data.itemCount || 0);
        }
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
      }
    }
    
    async function fetchSession() {
      try {
        const response = await fetch("/api/auth/session");
        if (response.ok) {
          const data = await response.json();
          setUser(data.session);
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
      }
    }

    updateCartCount();
    fetchSession();
    
    // Listen for cart updates
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);
    
    // Poll for cart updates
    const interval = setInterval(updateCartCount, 2000);
    return () => {
      clearInterval(interval);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">ShopHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Search - Desktop */}
          <div className="hidden md:flex items-center">
            <input
              type="search"
              placeholder="Search products..."
              className="w-64 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.586c1.031 0 1.947-.693 2.054-1.715l.267-1.43m0 0a2.25 2.25 0 10-4.5 0m4.5 0a2.25 2.25 0 01-4.5 0M9 12.75h.008v.008H9v-.008z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Account */}
          {user ? (
            <Link
              href="/profile"
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <span className="text-sm font-medium">{user.name}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <Link
                href="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-sm font-medium text-muted-foreground"
              >
                {user.name}
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-sm font-medium text-muted-foreground"
              >
                Account
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
