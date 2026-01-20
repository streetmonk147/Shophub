// Authentication utilities
import { cookies } from "next/headers";
import type { User, Session } from "./types";
import crypto from "crypto";

// In-memory user store (in production, use a database)
const users: User[] = [];

// Simple password hashing (in production, use bcrypt)
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "salt").digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Session management
const SESSION_SECRET = process.env.SESSION_SECRET || "your-secret-key-change-in-production";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export function createSession(userId: string, email: string, name: string): Session {
  return {
    userId,
    email,
    name,
    expiresAt: Date.now() + SESSION_DURATION,
  };
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return null;
  }

  try {
    const session: Session = JSON.parse(sessionCookie.value);
    if (session.expiresAt < Date.now()) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function setSession(session: Session): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("session", JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

// User management
export async function createUser(name: string, email: string, password: string): Promise<User> {
  // Check if user already exists
  if (users.find((u) => u.email === email)) {
    throw new Error("User already exists");
  }

  const user: User = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  return user;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = users.find((u) => u.email === email);
  if (!user) {
    return null;
  }

  if (!verifyPassword(password, user.passwordHash)) {
    return null;
  }

  return user;
}

export async function getUserById(id: string): Promise<User | null> {
  return users.find((u) => u.id === id) || null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return users.find((u) => u.email === email) || null;
}
