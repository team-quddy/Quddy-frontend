import imageCompression from "browser-image-compression";

/** 이미지 압축 함수 */
export async function compressImage(file: File): Promise<File> {
  return await imageCompression(file, { maxSizeMB: 0.1, maxWidthOrHeight: 1280 });
}
