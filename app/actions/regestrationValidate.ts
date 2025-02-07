"use server";

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

    console.log("User:", {
      exists: true,
      paid: user.Paid,
    });

    return {
      exists: true,
      paid: user.Paid,
    };
  } catch (error) {
    console.error("Error validating registration:", error);
    throw error;
  }
};
