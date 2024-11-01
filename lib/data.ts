export const getLocalDate = (isoDate: Date) => {
  const date = new Date(isoDate);

  const normalDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return normalDate;
};
