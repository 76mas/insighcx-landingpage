"use server";
import { getAuthenticatedAdminId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

// Add a new blog
export async function addBlog(data) {
  try {
    const adminId = await getAuthenticatedAdminId();
    if (!adminId) {
      throw new Error("Unauthorized: Authentication required");
    }

    console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data);

    // return;
    const newBlog = await prisma.blog.create({
      data: {
        mainTitle: data.mainTitle,
        category: data.category,
        imageUrl: data.imageUrl.file.response,
        content: data.content || [],
      },
    });
    return { success: true, blog: newBlog };
  } catch (error) {
    console.error("Error adding blog:", error);
    return { success: false, error: error.message };
  }
}

// Get all blogs with pagination and search
export async function getAllBlogs({ page = 1, limit = 10, search = "" }) {
  try {
    const skip = (page - 1) * limit;

    // Build where clause for search
    const whereClause = search
      ? {
          OR: [
            {
              mainTitle: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              category: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {};

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        skip,
        take: limit,
        where: whereClause,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.blog.count({
        where: whereClause,
      }),
    ]);

    return {
      success: true,
      blogs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { success: false, error: error.message };
  }
}

// Get a single blog by ID
export async function getBlogById(id) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return { success: false, error: "Blog not found" };
    }

    return { success: true, blog };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return { success: false, error: error.message };
  }
}

// Update a blog
export async function updateBlog(id, data) {
  const adminId = await getAuthenticatedAdminId();
  if (!adminId) {
    throw new Error("Unauthorized: Authentication required");
  }
  try {
    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        mainTitle: data.mainTitle,
        category: data.category,
        imageUrl: data.imageUrl?.file?.response || data.imageUrl,
        content: data.content || [],
      },
    });
    return { success: true, blog: updatedBlog };
  } catch (error) {
    console.error("Error updating blog:", error);
    return { success: false, error: error.message };
  }
}

// Delete a blog
export async function deleteBlog(id) {
  const adminId = await getAuthenticatedAdminId();
  if (!adminId) {
    throw new Error("Unauthorized: Authentication required");
  }
  try {
    // 1. Get the blog to find the imageUrl
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return { success: false, error: "Blog not found" };
    }

    // 2. Delete the blog from database
    const deletedBlog = await prisma.blog.delete({
      where: { id },
    });

    // 3. Delete the image from the folder
    if (blog.imageUrl) {
      try {
        const filePath = path.join(process.cwd(), "public", blog.imageUrl);
        await fs.unlink(filePath);
        console.log("Deleted image:", filePath);
      } catch (fileError) {
        console.error("Error deleting image file:", fileError);
        // We don't fail the action if file deletion fails but DB deletion succeeded
      }
    }

    return { success: true, blog: deletedBlog };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false, error: error.message };
  }
}
