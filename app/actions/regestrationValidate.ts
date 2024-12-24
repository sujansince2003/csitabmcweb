"use server";
export const getAllRegestration = async () => {
  try {
    const response = await fetch(process.env.REGESTATION_DATA_API as string);
    const res = await response.json();
    const data = res.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const getRegestrationById = async (email: string) => {
  const data = await getAllRegestration();
  const regestrationDetails = data.find((item: any) => {
    if (item.Email === email) {
      return item;
    }
  });
  return regestrationDetails;
};

export const validateRegestration = async (name: string, email: string) => {
  try {
    const Data = await getAllRegestration();
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
      name: {
        status: nameMatch,
        message: nameMatch
          ? "Name verified successfully"
          : "Name does not match. If entered wrong during registration, email team@csitabmc.com",
      },
      payment: {
        status: isPaid,
        message: isPaid
          ? "Payment completed, you can now attend the event"
          : "Payment pending. Please complete the payment. Else you won't be able to attend the event.",
      },
    };
  } catch (error) {
    return { error: "Internal Server Error" };
  }
};
