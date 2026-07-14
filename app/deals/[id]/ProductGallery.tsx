"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  title: string;
};

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const mainImage = images[selectedImage] ?? images[0];

  return (
    <section aria-label={`${title} product images`}>
      <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-[var(--surface)] sm:rounded-[2.5rem]">
        <Image
          key={mainImage}
          src={mainImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-8 transition-opacity duration-200 sm:p-12"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1" aria-label="Choose a product image">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={clsx(
                "relative size-16 shrink-0 overflow-hidden rounded-xl bg-[var(--surface)] transition sm:size-[4.5rem]",
                selectedImage === index
                  ? "opacity-100"
                  : "opacity-65 hover:opacity-100",
              )}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              aria-pressed={selectedImage === index}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="72px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
