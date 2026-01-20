import { NextRequest, NextResponse } from "next/server";
import { authenticateUser, createSession, setSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const user = await authenticateUser(email, password);

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const session = createSession(user.id, user.email, user.name);
    await setSession(session);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Login failed" }, { status: 500 });
  }
}
