import { prisma } from "./prisma.server";

export async function getProjects(category) {
  return prisma.projects.findMany({
    where: {
      category: category,
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function getAllProjects() {
  return prisma.projects.findMany();
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

export async function createProject(project) {
  const date = new Date();
  let currentDate = `${date.toLocaleString("en-US", {
    month: "long",
  })} ${date.getFullYear()}`;
  const writeup = [project.writeup];
  console.log("prisma-createproject: " + JSON.stringify(project, null, 2));
  try {
    const data = await prisma.projects.create({
      data: {
        category: project.category,
        title: project.title,
        date: currentDate,
        slug: project.slug,
        img: project.img,
        alt: project.alt,
        writeup: writeup,
      },
    });
  } catch (e) {
    console.log("Exception while creating with prisma: " + e);
  }
}

export async function updateProject(project) {
  const date = new Date();
  let currentDate = `${date.toLocaleString("en-US", {
    month: "long",
  })} ${date.getFullYear()}`;

  const writeup = Array.isArray(project.writeup)
    ? project.writeup
    : [project.writeup];
  console.log("prisma-updateproject: " + JSON.stringify(project, null, 2));
  try {
    const data = await prisma.projects.update({
      where: {
        id: project.id,
      },
      data: {
        category: project.category,
        title: project.title,
        date: currentDate,
        slug: project.slug,
        img: project.img,
        alt: project.alt,
        writeup: writeup,
      },
    });
  } catch (e) {
    console.log("Exception while updating using prisma: " + e);
  }
}
export async function deleteProject(id) {
  console.log("prisma-deleteproject: " + id);
  try {
    await prisma.projects.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.log("Exception while deleting: " + e);
  }
}
