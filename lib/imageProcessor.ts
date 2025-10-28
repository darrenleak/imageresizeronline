import { ImageFile, ResizeSettings, OUTPUT_FORMATS } from "./types";

export class ImageProcessor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement("canvas");
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");
    this.ctx = ctx;
  }

  async processImage(
    imageFile: ImageFile,
    settings: ResizeSettings
  ): Promise<Blob> {
    const img = await this.loadImage(imageFile.file);
    const { width, height } = this.calculateDimensions(img, settings);

    // Apply rotation
    if (settings.rotation !== 0) {
      this.applyRotation(img, settings.rotation, width, height);
    } else {
      this.canvas.width = width;
      this.canvas.height = height;
      this.ctx.drawImage(img, 0, 0, width, height);
    }

    // Convert to blob
    return new Promise((resolve, reject) => {
      this.canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Failed to create blob"));
        },
        settings.outputFormat,
        settings.quality / 100
      );
    });
  }

  private loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private calculateDimensions(
    img: HTMLImageElement,
    settings: ResizeSettings
  ): { width: number; height: number } {
    if (settings.usePercentage && settings.percentage > 0) {
      return {
        width: Math.round(img.width * (settings.percentage / 100)),
        height: Math.round(img.height * (settings.percentage / 100)),
      };
    }

    let width = settings.width || 0;
    let height = settings.height || 0;

    // If no dimensions specified, use original
    if (width === 0 && height === 0) {
      return { width: img.width, height: img.height };
    }

    // Calculate based on aspect ratio
    if (width === 0) {
      const ratio = height / img.height;
      width = Math.round(img.width * ratio);
    } else if (height === 0) {
      const ratio = width / img.width;
      height = Math.round(img.height * ratio);
    }

    return { width, height };
  }

  private applyRotation(
    img: HTMLImageElement,
    rotation: number,
    width: number,
    height: number
  ) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    switch (rotation) {
      case 90:
        this.canvas.width = height;
        this.canvas.height = width;
        this.ctx.rotate((90 * Math.PI) / 180);
        this.ctx.drawImage(img, 0, -height, width, height);
        break;
      case 180:
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.rotate((180 * Math.PI) / 180);
        this.ctx.drawImage(img, -width, -height, width, height);
        break;
      case 270:
        this.canvas.width = height;
        this.canvas.height = width;
        this.ctx.rotate((270 * Math.PI) / 180);
        this.ctx.drawImage(img, -width, 0, width, height);
        break;
      default:
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.drawImage(img, 0, 0, width, height);
        break;
    }
  }

  static getFileExtension(format: string): string {
    const formatObj = OUTPUT_FORMATS.find((f) => f.value === format);
    return formatObj?.extension || "jpg";
  }

  static downloadBlob(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

