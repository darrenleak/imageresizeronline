export interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

export type OutputFormat = "image/jpeg" | "image/png" | "image/gif" | "image/webp" | "image/tiff";

export type Rotation = 0 | 90 | 180 | 270;

export interface ResizeSettings {
  width: number;
  height: number;
  usePercentage: boolean;
  percentage: number;
  rotation: Rotation;
  outputFormat: OutputFormat;
  quality: number;
  outputName: string;
}

export const OUTPUT_FORMATS: { value: OutputFormat; label: string; extension: string }[] = [
  { value: "image/jpeg", label: "JPG", extension: "jpg" },
  { value: "image/png", label: "PNG", extension: "png" },
  { value: "image/gif", label: "GIF", extension: "gif" },
  { value: "image/webp", label: "WebP", extension: "webp" },
  { value: "image/tiff", label: "TIFF", extension: "tiff" },
];

export const ROTATION_OPTIONS: { value: Rotation; label: string }[] = [
  { value: 0, label: "No rotation" },
  { value: 90, label: "90° CW" },
  { value: 180, label: "180°" },
  { value: 270, label: "90° CCW" },
];

