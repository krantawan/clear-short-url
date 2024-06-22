import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function getShortURL({ params }) {
  const { shortUrl } = params;

  const findURLdata = await prisma.url.findUnique({
    where: { shortUrl: shortUrl },
  });

  if (findURLdata) {
    await prisma.url.update({
      where: { shortUrl: shortUrl },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    redirect(findURLdata.originalUrl);
  }
  return null;
}
