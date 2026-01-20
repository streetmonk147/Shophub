import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getOrdersByUserId } from "@/lib/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Link from "next/link";
import Button from "@/components/ui/button";

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const orders = getOrdersByUserId(session.userId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">My Orders</h1>
        <Link href="/products">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="mb-4 text-lg text-muted-foreground">You haven't placed any orders yet.</p>
            <Link href="/products">
              <Button>Start Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    variant={
                      order.status === "delivered"
                        ? "success"
                        : order.status === "cancelled"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span>
                        {item.productName} x{item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Shipping to:</p>
                    <p className="text-sm">
                      {order.shippingAddress.fullName}, {order.shippingAddress.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-xl font-bold">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
