"use server";

import prisma from "@/lib/prisma";
import {
  hashPassword,
  comparePassword,
  validatePassword,
  validateUsername,
} from "@/lib/password";
import {
  generateToken,
  setAuthCookie,
  removeAuthCookie,
  getAuthenticatedAdminId,
  requireAuth,
} from "@/lib/auth";

/**
 * Login admin with username and password
 * Uses bcrypt for password comparison and JWT for session
 */
export async function loginAdmin(username, password) {
  try {
    // Find admin by username
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return {
        success: false,
        error: "Invalid username or password",
      };
    }

    // Compare password using bcrypt
    const isPasswordValid = await comparePassword(password, admin.password);

    if (!isPasswordValid) {
      return {
        success: false,
        error: "Invalid username or password",
      };
    }

    // Generate JWT token
    const token = generateToken(admin.id, admin.username);

    // Set authentication cookie
    await setAuthCookie(token);

    return {
      success: true,
      admin: {
        id: admin.id,
        name: admin.name,
        username: admin.username,
      },
    };
  } catch (error) {
    console.error("Error logging in admin:", error);
    return {
      success: false,
      error: "An error occurred during login",
    };
  }
}

/**
 * Logout admin - removes authentication cookie
 */
export async function logoutAdmin() {
  try {
    await removeAuthCookie();

    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error) {
    console.error("Error logging out admin:", error);
    return {
      success: false,
      error: "An error occurred during logout",
    };
  }
}

/**
 * Get current authenticated admin
 */
export async function getCurrentAdmin() {
  try {
    const adminId = await getAuthenticatedAdminId();

    if (!adminId) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        name: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin) {
      return {
        success: false,
        error: "Admin not found",
      };
    }

    return {
      success: true,
      admin,
    };
  } catch (error) {
    console.error("Error getting current admin:", error);
    return {
      success: false,
      error: "An error occurred",
    };
  }
}

/**
 * Check if admin is authenticated
 */
export async function isAuthenticated() {
  try {
    const adminId = await getAuthenticatedAdminId();

    return {
      success: true,
      isAuthenticated: !!adminId,
    };
  } catch (error) {
    console.error("Error checking authentication:", error);
    return {
      success: false,
      error: "An error occurred",
    };
  }
}

/**
 * Create a new admin account
 * Validates username and password, hashes password with bcrypt
 */
export async function createAdmin(data) {
  try {
    // Validate username
    const usernameValidation = validateUsername(data.username);
    if (!usernameValidation.valid) {
      return {
        success: false,
        error: usernameValidation.message,
      };
    }

    // Validate password
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.valid) {
      return {
        success: false,
        error: passwordValidation.message,
      };
    }

    // Check if username already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { username: data.username },
    });

    if (existingAdmin) {
      return {
        success: false,
        error: "Username already exists",
      };
    }

    // Hash password using bcrypt
    const hashedPassword = await hashPassword(data.password);

    // Create admin
    const newAdmin = await prisma.admin.create({
      data: {
        name: data.name,
        username: data.username,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        username: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      admin: newAdmin,
    };
  } catch (error) {
    console.error("Error creating admin:", error);
    return {
      success: false,
      error: "An error occurred while creating admin",
    };
  }
}

/**
 * Update admin password
 * Requires current password verification
 */
export async function updateAdminPassword(currentPassword, newPassword) {
  try {
    // Require authentication
    const adminId = await requireAuth();

    // Validate new password
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      return {
        success: false,
        error: passwordValidation.message,
      };
    }

    // Get admin
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      return {
        success: false,
        error: "Admin not found",
      };
    }

    // Verify current password
    const isPasswordValid = await comparePassword(
      currentPassword,
      admin.password
    );

    if (!isPasswordValid) {
      return {
        success: false,
        error: "Current password is incorrect",
      };
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await prisma.admin.update({
      where: { id: adminId },
      data: {
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Password updated successfully",
    };
  } catch (error) {
    console.error("Error updating password:", error);
    return {
      success: false,
      error: error.message || "An error occurred while updating password",
    };
  }
}

/**
 * Update admin profile (name)
 */
export async function updateAdminProfile(data) {
  try {
    // Require authentication
    const adminId = await requireAuth();

    const updatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data: {
        name: data.name,
      },
      select: {
        id: true,
        name: true,
        username: true,
      },
    });

    return {
      success: true,
      admin: updatedAdmin,
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      error: error.message || "An error occurred while updating profile",
    };
  }
}

/**
 * Verify admin session (use this in middleware or layouts)
 */
export async function verifyAdminSession() {
  try {
    const adminId = await getAuthenticatedAdminId();

    if (!adminId) {
      return {
        success: false,
        authenticated: false,
      };
    }

    // Verify admin still exists in database
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        name: true,
        username: true,
      },
    });

    if (!admin) {
      await removeAuthCookie();
      return {
        success: false,
        authenticated: false,
      };
    }

    return {
      success: true,
      authenticated: true,
      admin,
    };
  } catch (error) {
    console.error("Error verifying session:", error);
    return {
      success: false,
      authenticated: false,
    };
  }
}
