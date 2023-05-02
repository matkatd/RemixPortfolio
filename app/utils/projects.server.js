import { prisma } from "./prisma.server";

export async function getProjects(category) {
  return prisma.projects.findMany({
    where: {
      category: category,
    },
  });
}
