export const thumbnail = (originalUrl: string) => {
  const parts = originalUrl.split("/");
  const filenameIndex = parts.length - 1;
  parts[filenameIndex] = `thumbnail_${parts[filenameIndex]}`;
  return parts.join("/");
};
