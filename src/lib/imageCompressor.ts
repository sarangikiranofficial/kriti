import { APP_CONFIG } from '../config/appConfig';

export interface CompressionResult {
  file: File;
  previewUrl: string;
  originalSizeBytes: number;
  compressedSizeBytes: number;
}

/**
 * Validates and compresses an image in the browser using HTML5 Canvas.
 * Ensures the image conforms to allowed types and size limits <= 5MB.
 */
export async function compressImage(
  file: File,
  maxDimension = 1600,
  quality = 0.82
): Promise<CompressionResult> {
  // 1. Validate file type
  if (!APP_CONFIG.acceptedImageTypes.includes(file.type)) {
    throw new Error('Please upload a valid image file (JPG, PNG, or WebP).');
  }

  // 2. Validate maximum raw upload size
  if (file.size > APP_CONFIG.maxUploadSizeBytes) {
    throw new Error(
      `Image size exceeds ${APP_CONFIG.maxUploadSizeBytes / (1024 * 1024)}MB. Please choose a smaller image.`
    );
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read image file.'));

    reader.onload = (event) => {
      const img = new Image();

      img.onerror = () => reject(new Error('Failed to load image for compression.'));

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate scaled dimensions while preserving aspect ratio
        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Unable to create canvas context for compression.'));
        }

        // Draw image smoothly
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Determine output type: prefer webp if supported, otherwise jpeg
        const outputMime = file.type === 'image/png' ? 'image/png' : 'image/webp';

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error('Failed to compress image into blob.'));
            }

            const cleanFileName = file.name.replace(/\.[^/.]+$/, '') + (outputMime === 'image/webp' ? '.webp' : '.jpg');
            const compressedFile = new File([blob], cleanFileName, {
              type: blob.type,
              lastModified: Date.now(),
            });

            const previewUrl = URL.createObjectURL(blob);

            resolve({
              file: compressedFile,
              previewUrl,
              originalSizeBytes: file.size,
              compressedSizeBytes: compressedFile.size,
            });
          },
          outputMime,
          quality
        );
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
