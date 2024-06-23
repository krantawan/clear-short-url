import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { shortUrl } = params;

  try {
    const urlRecord = await prisma.url.findUnique({
      where: { shortUrl },
    });

    if (urlRecord) {
      // Only return the clicks without updating
      return NextResponse.json({ clicks: urlRecord.clicks });
    } else {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching URL:", error);
    return NextResponse.json({ error: "Failed to fetch URL" }, { status: 500 });
  }
}
