"use server";
import { getAuthenticatedAdminId } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Add a new message
export async function addMessage(data) {
  try {
    const newMessage = await prisma.message.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
        read: false,
      },
    });
    return { success: true, message: newMessage };
  } catch (error) {
    console.error("Error adding message:", error);
    return { success: false, error: error.message };
  }
}

// Get all messages with pagination and search
export async function getAllMessages({ page = 1, limit = 10, search = "" }) {
  const adminId = await getAuthenticatedAdminId();
  if (!adminId) {
    throw new Error("Unauthorized: Authentication required");
  }
  try {
    const skip = (page - 1) * limit;

    // Build where clause for search
    const whereClause = search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              message: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {};

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        skip,
        take: limit,
        where: whereClause,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.message.count({
        where: whereClause,
      }),
    ]);

    return {
      success: true,
      messages,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { success: false, error: error.message };
  }
}

// Get a single message by ID
export async function getMessageById(id) {
  const adminId = await getAuthenticatedAdminId();
  if (!adminId) {
    throw new Error("Unauthorized: Authentication required");
  }
  try {
    const message = await prisma.message.findUnique({
      where: { id },
    });

    if (!message) {
      return { success: false, error: "Message not found" };
    }

    return { success: true, message };
  } catch (error) {
    console.error("Error fetching message:", error);
    return { success: false, error: error.message };
  }
}

// Mark a message as read
export async function markMessageAsRead(id) {
  const adminId = await getAuthenticatedAdminId();
  if (!adminId) {
    throw new Error("Unauthorized: Authentication required");
  }
  try {
    const updatedMessage = await prisma.message.update({
      where: { id },
      data: {
        read: true,
      },
    });
    return { success: true, message: updatedMessage };
  } catch (error) {
    console.error("Error marking message as read:", error);
    return { success: false, error: error.message };
  }
}

// Delete a message
export async function deleteMessage(id) {
  const adminId = await getAuthenticatedAdminId();
  if (!adminId) {
    throw new Error("Unauthorized: Authentication required");
  }
  try {
    const deletedMessage = await prisma.message.delete({
      where: { id },
    });
    return { success: true, message: deletedMessage };
  } catch (error) {
    console.error("Error deleting message:", error);
    return { success: false, error: error.message };
  }
}

// Get unread messages count
export async function getUnreadMessagesCount() {
  const adminId = await getAuthenticatedAdminId();
  if (!adminId) {
    throw new Error("Unauthorized: Authentication required");
  }
  try {
    const count = await prisma.message.count({
      where: {
        read: false,
      },
    });
    return { success: true, count };
  } catch (error) {
    console.error("Error counting unread messages:", error);
    return { success: false, error: error.message };
  }
}
