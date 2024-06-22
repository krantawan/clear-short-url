import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { url } = await request.json();

    const shortUrl = nanoid(6);

    const newUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortUrl: shortUrl,
      },
    });

    return NextResponse.json({ shortUrl: newUrl.shortUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
