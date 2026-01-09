import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// JWT Secret - In production, use environment variable
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-this-in-production";
const JWT_EXPIRES_IN = "7d"; // 7 days
const COOKIE_NAME = "admin_token";

/**
 * Generate JWT token for admin
 */
export function generateToken(adminId, username) {
  return jwt.sign(
    {
      id: adminId,
      username: username,
      type: "admin",
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/**
 * Verify JWT token
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Set authentication cookie with JWT token
 */
export async function setAuthCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

/**
 * Get authentication token from cookie
 */
export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

/**
 * Remove authentication cookie
 */
export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Get admin ID from current session
 * This is the main function to use in other actions for authentication
 */
export async function getAuthenticatedAdminId() {
  try {
    const token = await getAuthToken();

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);

    if (!decoded || decoded.type !== "admin") {
      return null;
    }

    return decoded.id;
  } catch (error) {
    console.error("Error getting authenticated admin ID:", error);
    return null;
  }
}

/**
 * Verify if request is authenticated
 * Use this in server actions to protect routes
 */
export async function requireAuth() {
  const adminId = await getAuthenticatedAdminId();

  if (!adminId) {
    throw new Error("Unauthorized: Authentication required");
  }

  return adminId;
}
