export const fetchWithToken = async (url: string) => {
  return await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_AUTH}`,
    },
  });
};
