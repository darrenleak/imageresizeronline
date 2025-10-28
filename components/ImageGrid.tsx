"use client";

import Image from "next/image";
import { ImageFile } from "@/lib/types";

interface ImageGridProps {
  images: ImageFile[];
  onRemove: (id: string) => void;
}

export default function ImageGrid({ images, onRemove }: ImageGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Your Images ({images.length})
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={image.preview}
              alt={image.file.name}
              fill
              className="object-cover"
            />
            
            {/* Overlay with file name and remove button */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-sm font-medium truncate">
                  {image.file.name}
                </p>
                <p className="text-white/70 text-xs">
                  {(image.file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>

            {/* Remove button */}
            <button
              onClick={() => onRemove(image.id)}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 flex items-center justify-center"
              aria-label="Remove image"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

