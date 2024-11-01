import prisma from "@/lib/prisma";

const searchResultByQuery = async (query: string) => {
  const notice = await prisma.notice.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          category: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return notice;
};

export default searchResultByQuery;
