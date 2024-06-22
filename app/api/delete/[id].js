import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function deleteURL({ params }) {
  const { id } = params; // id คือ shortUrl
  try {
    await prisma.url.delete({
      where: {
        shortUrl: id,
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
