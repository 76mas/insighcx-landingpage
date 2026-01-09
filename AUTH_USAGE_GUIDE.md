# Authentication System - Usage Guide

## Overview

The authentication system uses **bcrypt** for password hashing and **JWT** for token-based authentication with secure HTTP-only cookies.

## Files Created

1. **`/src/lib/auth.js`** - JWT token management and authentication utilities
2. **`/src/lib/password.js`** - Password hashing and validation utilities
3. **`/src/app/dashboard/actions/auth.action.js`** - Authentication server actions

---

## Environment Variables

Add to your `.env` file:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

⚠️ **Important**: Generate a strong random secret for production!

---

## Core Functions

### 1. Authentication Utilities (`/src/lib/auth.js`)

#### `getAuthenticatedAdminId()`

Get the current admin ID from JWT token:

```javascript
import { getAuthenticatedAdminId } from "@/lib/auth";

const adminId = await getAuthenticatedAdminId();
if (!adminId) {
  // Not authenticated
}
```

#### `requireAuth()`

**Use this in ALL protected server actions:**

```javascript
import { requireAuth } from "@/lib/auth";

export async function protectedAction() {
  try {
    const adminId = await requireAuth(); // Throws error if not authenticated

    // Your protected logic here
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

---

## How to Protect Server Actions

### Example: Protected Blog Actions

Update your blog actions to require authentication:

```javascript
"use server";

import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// Add Blog - PROTECTED
export async function addBlog(data) {
  try {
    // Require authentication - throws error if not authenticated
    await requireAuth();

    const newBlog = await prisma.blog.create({
      data: {
        mainTitle: data.mainTitle,
        content: data.content,
        category: data.category,
        imageUrl: data.imageUrl,
        paragraphs: data.paragraphs || [],
        secondaryTitle: data.secondaryTitle || [],
      },
    });

    return { success: true, blog: newBlog };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Update Blog - PROTECTED
export async function updateBlog(id, data) {
  try {
    await requireAuth();

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        mainTitle: data.mainTitle,
        content: data.content,
        category: data.category,
        imageUrl: data.imageUrl,
        paragraphs: data.paragraphs || [],
        secondaryTitle: data.secondaryTitle || [],
      },
    });

    return { success: true, blog: updatedBlog };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Delete Blog - PROTECTED
export async function deleteBlog(id) {
  try {
    await requireAuth();

    const deletedBlog = await prisma.blog.delete({
      where: { id },
    });

    return { success: true, blog: deletedBlog };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Get Blogs - PUBLIC (no auth required)
export async function getAllBlogs({ page = 1, limit = 10, search = "" }) {
  try {
    // No requireAuth() - this is a public action

    const blogs = await prisma.blog.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return { success: true, blogs };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

---

## Usage in Frontend

### Login Page

```javascript
"use client";

import { loginAdmin } from "@/app/dashboard/actions/auth.action";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const result = await loginAdmin(
      formData.get("username"),
      formData.get("password")
    );

    if (result.success) {
      router.push("/dashboard");
      router.refresh(); // Refresh to update auth state
    } else {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <div className="error">{error}</div>}
      <input name="username" type="text" required />
      <input name="password" type="password" required />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Protected Layout

```javascript
import { verifyAdminSession } from "@/app/dashboard/actions/auth.action";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await verifyAdminSession();

  if (!session.authenticated) {
    redirect("/dashboard/login");
  }

  return (
    <div>
      <header>Welcome, {session.admin.name}</header>
      {children}
    </div>
  );
}
```

### Logout Button

```javascript
"use client";

import { logoutAdmin } from "@/app/dashboard/actions/auth.action";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/dashboard/login");
    router.refresh();
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

---

## Password Requirements

The system enforces strong passwords:

- ✅ Minimum 8 characters
- ✅ At least one uppercase letter
- ✅ At least one lowercase letter
- ✅ At least one number

### Create Admin Example

```javascript
import { createAdmin } from "@/app/dashboard/actions/auth.action";

const result = await createAdmin({
  name: "John Doe",
  username: "johndoe",
  password: "SecurePass123", // Must meet requirements
});

if (result.success) {
  console.log("Admin created:", result.admin);
} else {
  console.error("Error:", result.error);
}
```

---

## Security Features

✅ **Bcrypt password hashing** - Passwords are never stored in plain text  
✅ **JWT tokens** - Stateless authentication  
✅ **HTTP-only cookies** - Prevents XSS attacks  
✅ **Secure cookies in production** - HTTPS only  
✅ **7-day token expiration** - Automatic logout  
✅ **Password validation** - Enforces strong passwords  
✅ **Username validation** - Prevents invalid usernames

---

## Quick Reference

### Protect a Server Action

```javascript
import { requireAuth } from "@/lib/auth";

export async function myProtectedAction() {
  try {
    await requireAuth(); // Add this line
    // Your code here
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### Get Current Admin ID

```javascript
import { getAuthenticatedAdminId } from "@/lib/auth";

const adminId = await getAuthenticatedAdminId();
```

### Check Authentication

```javascript
import { isAuthenticated } from "@/app/dashboard/actions/auth.action";

const result = await isAuthenticated();
if (result.isAuthenticated) {
  // User is logged in
}
```

---

## Next Steps

1. **Update all blog actions** - Add `await requireAuth()` to protected functions
2. **Update all message actions** - Add `await requireAuth()` to protected functions
3. **Update dashboard actions** - Add `await requireAuth()` to protected functions
4. **Set JWT_SECRET** - Add to `.env` file
5. **Test authentication** - Try logging in and accessing protected routes
