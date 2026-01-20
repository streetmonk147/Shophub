import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createOrder, getOrdersByUserId } from "@/lib/orders";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = getOrdersByUserId(session.userId);
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get orders" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { shippingAddress, paymentMethod } = body;

    if (!shippingAddress || !paymentMethod) {
      return NextResponse.json(
        { error: "Shipping address and payment method required" },
        { status: 400 }
      );
    }

    const order = await createOrder(session.userId, shippingAddress, paymentMethod);

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 500 });
  }
}
