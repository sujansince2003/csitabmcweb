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
        message: "No registration found with this email.",
        name: {
          status: false,
          message: "No registration found",
        },
        payment: {
          status: false,
          message: "No registration found",
        },
      };
    }

    const nameMatch =
      user["Full Name"].toUpperCase().trim() === name.toUpperCase().trim();
    const isPaid = user.Paid;

    return {
      exists: true,
      nameMatch,
      paid: isPaid,
      message:
        nameMatch && isPaid
          ? "Your registration has been verified successfully."
          : "Please check the status details below:",

      payment: {
        status: isPaid,
        message: isPaid
          ? "Payment completed, you can now attend the event"
          : "Payment is currently pending. Please complete the payment at the earliest to secure your spot as seats are limited and ensure your participation in the event.",
      },
    };
  } catch (error) {
    console.error("Error validating registration:", error);
    throw error;
  }
};
