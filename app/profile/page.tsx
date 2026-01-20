import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import LogoutButton from "@/components/auth/logout-button";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">My Account</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="text-lg">{session.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-lg">{session.email}</p>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/orders">
              <Button variant="outline" className="w-full">
                View Orders
              </Button>
            </Link>
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
            <LogoutButton />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
