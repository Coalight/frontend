/**
 * Validates if a string is a valid URL
 * @param urlString - The URL string to validate
 * @returns boolean indicating if the URL is valid
 */
export const isValidUrl = (urlString: string): boolean => {
  if (!urlString) return true;
  const pattern = new RegExp(
    "^(https?://)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(urlString);
};

/**
 * Gets today's date in YYYY-MM-DD format
 * @returns string representation of today's date
 */
export const getDefaultDate = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

/**
 * Gets current time rounded to the nearest 15 minutes in HH:MM format
 * @returns string representation of the current time
 */
export const getDefaultTime = (): string => {
  const now = new Date();
  // Round to nearest 15 minutes
  const minutes = Math.ceil(now.getMinutes() / 15) * 15;
  now.setMinutes(minutes);
  // Format as HH:MM
  return `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Formats file size in bytes to human readable format
 * @param bytes - File size in bytes
 * @returns Formatted file size string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Validates file type against accepted file extensions
 * @param file - File to validate
 * @param acceptedFiles - Array of accepted file extensions
 * @returns boolean indicating if file type is valid
 */
export const validateFileType = (
  file: File,
  acceptedFiles: string[]
): boolean => {
  if (acceptedFiles.includes("*/*")) return true;

  const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
  return acceptedFiles.some((ext) => ext.toLowerCase() === fileExtension);
};

/**
 * Gets file extension icon based on file type
 * @param fileName - Name of the file
 * @returns string representing the file type category
 */
export const getFileCategory = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  const categories: Record<string, string> = {
    pdf: "document",
    doc: "document",
    docx: "document",
    txt: "document",
    rtf: "document",
    ppt: "presentation",
    pptx: "presentation",
    key: "presentation",
    xls: "spreadsheet",
    xlsx: "spreadsheet",
    csv: "spreadsheet",
    ods: "spreadsheet",
    mp4: "video",
    avi: "video",
    mov: "video",
    wmv: "video",
    flv: "video",
    webm: "video",
    mp3: "audio",
    wav: "audio",
    aac: "audio",
    flac: "audio",
    ogg: "audio",
    jpg: "image",
    jpeg: "image",
    png: "image",
    gif: "image",
    svg: "image",
    webp: "image",
  };

  return categories[extension || ""] || "file";
};
