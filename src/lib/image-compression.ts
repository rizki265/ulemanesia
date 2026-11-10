/**
 * Client-side WebP image compressor.
 * Compresses uploaded images to ~300KB WebP format (FR-13, Non-Functional Performance).
 */
export async function compressImageToWebP(
  file: File,
  targetSizeKB: number = 300,
  maxDimension: number = 1600
): Promise<File> {
  // If not running in browser (SSR), return file as is
  if (typeof window === "undefined") return file;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Resize if larger than max dimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve(file);
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Iterative compression starting at quality 0.82
        let quality = 0.82;
        const tryCompress = (q: number) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                return resolve(file);
              }

              const sizeKB = blob.size / 1024;

              // If size is still significantly above target and quality > 0.4, compress more
              if (sizeKB > targetSizeKB * 1.25 && q > 0.4) {
                tryCompress(q - 0.12);
              } else {
                const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
                const compressedFile = new File([blob], newFileName, {
                  type: "image/webp",
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              }
            },
            "image/webp",
            q
          );
        };

        tryCompress(quality);
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
  });
}

