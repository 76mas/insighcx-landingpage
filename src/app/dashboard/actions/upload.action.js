"use server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function uploadImage(formData) {
  try {
    const file = formData.get("file");
    if (!file) {
      throw new Error("No file provided");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "blogs");

    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const url = `/uploads/blogs/${filename}`;
    return { success: true, url };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: error.message };
  }
}
