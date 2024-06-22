import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Log the id for debugging
    console.log("Deleting URL with shortUrl:", id);

    // Validate if id exists in the request params
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    // Attempt to delete the URL from the database
    const deleteURL = await prisma.url.delete({
      where: {
        shortUrl: id,
      },
    });

    return NextResponse.json({
      message: "Successfully deleted",
      data: deleteURL,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error deleting URL:", error);

    return NextResponse.json(
      { message: "Error deleting URL", error: error.message },
      { status: 500 }
    );
  }
}
