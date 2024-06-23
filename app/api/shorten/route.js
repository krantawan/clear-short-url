import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { url } = await request.json();

    const shortUrl = nanoid(6);

    // await prisma.$connect();
    // console.log("Connected to the database");

    const newUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortUrl: shortUrl,
      },
    });

    // console.log("New URL created:", newUrl);
    // await prisma.$disconnect();
    // console.log("Disconnected from the database");

    return NextResponse.json({ shortUrl: newUrl.shortUrl });
  } catch (error) {
    console.error("Error creating URL:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
