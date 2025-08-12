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
