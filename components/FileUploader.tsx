"use client";

import { useCallback } from "react";
import { ImageFile } from "@/lib/types";

interface FileUploaderProps {
  onFilesSelected: (files: ImageFile[]) => void;
}

export default function FileUploader({ onFilesSelected }: FileUploaderProps) {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      processFiles(files);
    },
    []
  );

  const processFiles = (files: File[]) => {
    const imageFiles: ImageFile[] = files
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
      }));

    if (imageFiles.length > 0) {
      onFilesSelected(imageFiles);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              Resize Your Images
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Fast, free, and secure. Everything happens in your browser.
          </p>
        </div>

        <label
          htmlFor="file-upload"
          className="block cursor-pointer group"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="relative border-4 border-dashed border-blue-300 rounded-3xl p-12 md:p-20 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500 hover:bg-white/70 hover:shadow-2xl group-hover:scale-[1.02]">
            <div className="flex flex-col items-center space-y-6">
              {/* Upload Icon */}
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>

              {/* Text */}
              <div className="text-center space-y-2">
                <p className="text-2xl font-semibold text-gray-700">
                  Drop your images here
                </p>
                <p className="text-lg text-gray-500">
                  or click to select files
                </p>
              </div>

              {/* Format badges */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {["JPG", "PNG", "GIF", "WebP", "TIFF"].map((format) => (
                  <span
                    key={format}
                    className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: "🔒",
              title: "Secure",
              desc: "All processing happens in your browser",
            },
            {
              icon: "⚡",
              title: "Fast",
              desc: "No uploading or waiting for servers",
            },
            {
              icon: "🎨",
              title: "Flexible",
              desc: "Resize, rotate, and convert formats",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

