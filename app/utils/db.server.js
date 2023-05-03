import { prisma } from "./prisma.server";

export async function getProjects(category) {
  return prisma.projects.findMany({
    where: {
      category: category,
    },
  });
}

export async function getProject(slug) {
  return prisma.projects.findFirst({
    where: {
      slug: slug,
    },
  });
}

export async function getPhotos() {
  return prisma.photography.findMany();
}
