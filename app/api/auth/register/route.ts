import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail, createSession, setSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const user = await createUser(name, email, password);
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
    return NextResponse.json({ error: error.message || "Registration failed" }, { status: 500 });
  }
}
