"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  }

  return (
    <Button variant="destructive" className="w-full" onClick={handleLogout}>
      Logout
    </Button>
  );
}
