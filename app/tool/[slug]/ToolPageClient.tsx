"use client";

import { useState } from "react";
import FileUploader from "@/components/FileUploader";
import ImageGrid from "@/components/ImageGrid";
import SettingsPanel from "@/components/SettingsPanel";
import { ImageFile, ResizeSettings } from "@/lib/types";
import { ImageProcessor } from "@/lib/imageProcessor";
import { getProgrammaticPage, ProgrammaticPage } from "@/lib/programmaticPages";

interface ToolPageClientProps {
  pageData: ProgrammaticPage;
}

export default function ToolPageClient({ pageData }: ToolPageClientProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [settings, setSettings] = useState<ResizeSettings>({
    width: 0,
    height: 0,
    usePercentage: false,
    percentage: 0,
    rotation: 0,
    outputFormat: "image/jpeg",
    quality: 80,
    outputName: "",
    ...pageData.settings, // Apply pre-configured settings
  });

  const handleFilesSelected = (files: ImageFile[]) => {
    setImages((prev) => [...prev, ...files]);
    if (files.length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      const removed = prev.find((img) => img.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.preview);
      }
      return updated;
    });
  };

  const handleResize = async () => {
    if (images.length === 0) return;

    setIsProcessing(true);
    const processor = new ImageProcessor();

    try {
      if (images.length === 1) {
        const image = images[0];
        const blob = await processor.processImage(image, settings);
        
        const extension = ImageProcessor.getFileExtension(settings.outputFormat);
        const fileName = settings.outputName 
          ? `${settings.outputName}.${extension}`
          : image.file.name.split(".").slice(0, -1).join(".") + `.${extension}`;

        ImageProcessor.downloadBlob(blob, fileName);
      } else {
        const JSZip = (await import("jszip")).default;
        const zip = new JSZip();
        const extension = ImageProcessor.getFileExtension(settings.outputFormat);

        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const blob = await processor.processImage(image, settings);
          
          let fileName: string;
          if (settings.outputName) {
            fileName = `${settings.outputName}-${i + 1}.${extension}`;
          } else {
            const nameParts = image.file.name.split(".");
            nameParts[nameParts.length - 1] = extension;
            fileName = nameParts.join(".");
          }

          zip.file(fileName, blob);
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        const zipFileName = settings.outputName 
          ? `${settings.outputName}.zip` 
          : `resized-images-${Date.now()}.zip`;
        
        ImageProcessor.downloadBlob(zipBlob, zipFileName);
      }

      images.forEach((img) => URL.revokeObjectURL(img.preview));
      setImages([]);
    } catch (error) {
      console.error("Error processing images:", error);
      alert("An error occurred while processing images. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddMoreImages = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const files = Array.from(e.target.files || []) as File[];
      const imageFiles: ImageFile[] = files
        .filter((file) => file.type.startsWith("image/"))
        .map((file) => ({
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: URL.createObjectURL(file),
        }));
      
      if (imageFiles.length > 0) {
        setImages((prev) => [...prev, ...imageFiles]);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    input.click();
  };

  // Show uploader if no images
  if (images.length === 0) {
    return (
      <div>
        {/* SEO Content Section */}
        <div className="bg-white/70 backdrop-blur-sm py-12 px-4 border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 pb-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent leading-tight">
              {pageData.h1}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              {pageData.description}
            </p>
          </div>
        </div>

        {/* File Uploader */}
        <FileUploader onFilesSelected={handleFilesSelected} />

        {/* Related Pages */}
        {pageData.relatedPages && pageData.relatedPages.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pageData.relatedPages.map((slug) => {
                const relatedPage = getProgrammaticPage(slug);
                if (!relatedPage) return null;
                return (
                  <a
                    key={slug}
                    href={`/tool/${slug}`}
                    className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border-2 border-gray-200 hover:border-blue-400 transition-all duration-200 hover:shadow-lg"
                  >
                    <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                      {relatedPage.h1}
                    </h3>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Show settings + grid layout
  return (
    <div>
      {/* SEO Content Section */}
      <div className="bg-white/70 backdrop-blur-sm py-8 px-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 pb-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent leading-tight">
            {pageData.h1}
          </h1>
          <p className="text-gray-700">
            {pageData.description}
          </p>
        </div>
      </div>

      {/* Tool Interface */}
      <div className="min-h-[calc(100vh-4rem)] py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <SettingsPanel
                settings={settings}
                onSettingsChange={setSettings}
                onResize={handleResize}
                isProcessing={isProcessing}
              />
            </div>

            <div className="lg:col-span-2">
              <ImageGrid images={images} onRemove={handleRemoveImage} />
              
              <button
                onClick={handleAddMoreImages}
                className="mt-6 w-full py-4 border-2 border-dashed border-blue-300 text-blue-600 font-semibold rounded-xl hover:border-cyan-500 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add More Images
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

