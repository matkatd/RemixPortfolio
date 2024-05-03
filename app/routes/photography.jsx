import styles from "~/styles/project.css";
import { env } from "process";
import { useLoaderData } from "@remix-run/react";
import { getPhotos } from "../utils/db.server";
import { Lightbox } from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import LightBoxStyles from "yet-another-react-lightbox/styles.css";
import ThumbnailStyles from "yet-another-react-lightbox/plugins/thumbnails.css";
import React from "react";
import { PhotoAlbum } from "react-photo-album";

export async function loader() {
  const photos = await getPhotos();
  const data = [];
  const lightBox = [];
  photos.forEach((photo) => {
    lightBox.push({
      key: photo.id,
      src: env.STORAGE_URL + photo.img,
      width: 3000,
      alt: photo.alt,
      srcset: [
        { src: env.STORAGE_URL + photo.thumb, width: 648, height: 486 },
        { src: env.STORAGE_URL + photo.img, width: 3000 },
      ],
    });
    data.push({
      key: photo.id,
      src: env.STORAGE_URL + photo.thumb,
      width: 648,
      height: 486,
      alt: photo.alt,
      srcset: [
        { src: env.STORAGE_URL + photo.thumb, width: 648, height: 486 },
        { src: env.STORAGE_URL + photo.img, width: 3000 },
      ],
    });
  });
  return { data, lightBox };
}

export default function PhotographyPage() {
  const [index, setIndex] = React.useState(-1);
  const { data, lightBox } = useLoaderData();
  // console.log(data);
  return (
    <main className="img-page">
      <h2 className="grid-page img-page">Photography</h2>
      <PhotoAlbum
        photos={data}
        layout="rows"
        targetRowHeight={300}
        onClick={({ index }) => setIndex(index)}
      />
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={lightBox}
        plugins={[Thumbnails, Zoom]}
      />
    </main>
  );
}

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: LightBoxStyles },
    { rel: "stylesheet", href: ThumbnailStyles },
  ];
}
