"use server";

import { fetchWithToken } from "@/lib/fetch";

export const getEvent = async () => {
  try {
    const response = await fetchWithToken(
      `${process.env.STRAPI_API_URL}/the-event-banner`
    );
    const resJson = await response.json();
    return resJson.data;
  } catch (error) {
    console.error("Error fetching event data:", error);
    throw error;
  }
};

export const getAllRegistration = async () => {
  try {
    const response = await fetch(process.env.REGESTATION_DATA_API as string);
    const res = await response.json();
    const data = res.data;
    return data;
  } catch (error) {
    console.error("Error fetching registration data:", error);
    throw error;
  }
};

export const validateRegistration = async (name: string, email: string) => {
  try {
    const Data = await getAllRegistration();
    const user = Data.find(
      (item: any) =>
        item.Email.toUpperCase().trim() === email.toUpperCase().trim()
    );

    if (!user) {
      return {
        exists: false,
        nameMatch: false,
        paid: false,
        name: { status: false },
        payment: { status: false },
      };
    }

    return {
      exists: true,
      paid: user.Paid,
    };
  } catch (error) {
    console.error("Error validating registration:", error);
    throw error;
  }
};
