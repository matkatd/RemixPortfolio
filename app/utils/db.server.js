import { prisma } from "./prisma.server";

export async function getProjects(category) {
  return prisma.projects.findMany({
    where: {
      category: category,
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

export async function createPost(post) {
  const date = new Date();
  let currentDate = `${date.toLocaleString("en-US", {
    month: "long",
  })} ${date.getFullYear()}`;
  const writeup = [post.writeup];
  try {
    await prisma.projects.create({
      data: {
        category: post.category,
        title: post.title,
        date: currentDate,
        slug: post.slug,
        img: post.img,
        alt: post.alt,
        writeup: writeup,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

export async function updatePost(post) {
  const date = new Date();
  let currentDate = `${date.toLocaleString("en-US", {
    month: "long",
  })} ${date.getFullYear()}`;

  const writeup = Array.isArray(post.writeup) ? post.writeup : [post.writeup];

  prisma.projects.update({
    where: {
      id: post.id,
    },
    data: {
      category: post.category,
      title: post.title,
      date: currentDate,
      slug: post.slug,
      img: post.img,
      alt: post.alt,
      writeup: writeup,
    },
  });
}
