"use server";

import prisma from "@/lib/prisma";
import { getAuthenticatedAdminId } from "@/lib/auth";

// Get dashboard statistics
export async function getDashboardStats() {
  const adminId = await getAuthenticatedAdminId();
  if (!adminId) {
    throw new Error("Unauthorized: Authentication required");
  }
  try {
    const [totalBlogs, totalMessages, unreadMessages] = await Promise.all([
      // Total blogs count
      prisma.blog.count(),

      // Total messages count
      prisma.message.count(),

      // Unread messages count
      prisma.message.count({
        where: {
          read: false,
        },
      }),
    ]);

    return {
      success: true,
      stats: {
        totalBlogs,
        totalMessages,
        unreadMessages,
        readMessages: totalMessages - unreadMessages,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { success: false, error: error.message };
  }
}

// Get recent blogs for dashboard preview
export async function getRecentBlogs(limit = 3) {
  const adminId = await getAuthenticatedAdminId();
  if (!adminId) {
    throw new Error("Unauthorized: Authentication required");
  }
  try {
    const recentBlogs = await prisma.blog.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        mainTitle: true,
        category: true,
        createdAt: true,
        imageUrl: true,
      },
    });

    return {
      success: true,
      blogs: recentBlogs,
    };
  } catch (error) {
    console.error("Error fetching recent blogs:", error);
    return { success: false, error: error.message };
  }
}

// Get recent messages for dashboard preview
export async function getRecentMessages(limit = 5) {
  const adminId = await getAuthenticatedAdminId();
  if (!adminId) {
    throw new Error("Unauthorized: Authentication required");
  }
  try {
    const recentMessages = await prisma.message.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        message: true,
        read: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      messages: recentMessages,
    };
  } catch (error) {
    console.error("Error fetching recent messages:", error);
    return { success: false, error: error.message };
  }
}

// Get complete dashboard overview (stats + recent items)
export async function getDashboardOverview() {
  const adminId = await getAuthenticatedAdminId();
  if (!adminId) {
    throw new Error("Unauthorized: Authentication required");
  }
  try {
    const [statsResult, blogsResult, messagesResult] = await Promise.all([
      getDashboardStats(),
      getRecentBlogs(3),
      getRecentMessages(5),
    ]);

    if (
      !statsResult.success ||
      !blogsResult.success ||
      !messagesResult.success
    ) {
      throw new Error("Failed to fetch dashboard data");
    }

    return {
      success: true,
      data: {
        stats: statsResult.stats,
        recentBlogs: blogsResult.blogs,
        recentMessages: messagesResult.messages,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard overview:", error);
    return { success: false, error: error.message };
  }
}

// Get blog statistics by category
export async function getBlogStatsByCategory() {
  const adminId = await getAuthenticatedAdminId();
  if (!adminId) {
    throw new Error("Unauthorized: Authentication required");
  }
  try {
    const blogs = await prisma.blog.findMany({
      select: {
        category: true,
      },
    });

    // Count blogs by category
    const categoryStats = blogs.reduce((acc, blog) => {
      acc[blog.category] = (acc[blog.category] || 0) + 1;
      return acc;
    }, {});

    // Convert to array format
    const stats = Object.entries(categoryStats).map(([category, count]) => ({
      category,
      count,
    }));

    return {
      success: true,
      stats,
    };
  } catch (error) {
    console.error("Error fetching blog stats by category:", error);
    return { success: false, error: error.message };
  }
}

// Get messages statistics (read vs unread)
export async function getMessagesStats() {
  const adminId = await getAuthenticatedAdminId();
  if (!adminId) {
    throw new Error("Unauthorized: Authentication required");
  }
  try {
    const [total, unread, read] = await Promise.all([
      prisma.message.count(),
      prisma.message.count({ where: { read: false } }),
      prisma.message.count({ where: { read: true } }),
    ]);

    return {
      success: true,
      stats: {
        total,
        unread,
        read,
        unreadPercentage: total > 0 ? Math.round((unread / total) * 100) : 0,
      },
    };
  } catch (error) {
    console.error("Error fetching messages stats:", error);
    return { success: false, error: error.message };
  }
}

// Get activity timeline (recent blogs and messages combined)
export async function getActivityTimeline(limit = 10) {
  const adminId = await getAuthenticatedAdminId();
  if (!adminId) {
    throw new Error("Unauthorized: Authentication required");
  }
  try {
    const [recentBlogs, recentMessages] = await Promise.all([
      prisma.blog.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          mainTitle: true,
          createdAt: true,
        },
      }),
      prisma.message.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      }),
    ]);

    // Combine and format activities
    const activities = [
      ...recentBlogs.map((blog) => ({
        id: blog.id,
        type: "blog",
        title: blog.mainTitle,
        createdAt: blog.createdAt,
      })),
      ...recentMessages.map((msg) => ({
        id: msg.id,
        type: "message",
        title: `Message from ${msg.name}`,
        createdAt: msg.createdAt,
      })),
    ];

    // Sort by date and limit
    const sortedActivities = activities
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);

    return {
      success: true,
      activities: sortedActivities,
    };
  } catch (error) {
    console.error("Error fetching activity timeline:", error);
    return { success: false, error: error.message };
  }
}
