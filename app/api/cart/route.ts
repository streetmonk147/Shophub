import { NextRequest, NextResponse } from "next/server";
import { getCart, addToCart, updateCartItem, removeFromCart, getCartItemCount } from "@/lib/cart";

export async function GET() {
  try {
    const cart = await getCart();
    const itemCount = await getCartItemCount();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return NextResponse.json({
      cart,
      itemCount,
      total,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get cart" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, productId, quantity } = body;

    if (action === "add") {
      if (!productId) {
        return NextResponse.json({ error: "Product ID required" }, { status: 400 });
      }
      await addToCart(productId, quantity || 1);
    } else if (action === "update") {
      if (!productId || quantity === undefined) {
        return NextResponse.json({ error: "Product ID and quantity required" }, { status: 400 });
      }
      await updateCartItem(productId, quantity);
    } else if (action === "remove") {
      if (!productId) {
        return NextResponse.json({ error: "Product ID required" }, { status: 400 });
      }
      await removeFromCart(productId);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const cart = await getCart();
    const itemCount = await getCartItemCount();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return NextResponse.json({
      success: true,
      cart,
      itemCount,
      total,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update cart" }, { status: 500 });
  }
}
