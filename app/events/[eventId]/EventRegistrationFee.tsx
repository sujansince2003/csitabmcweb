import React from "react";

const EventRegistrationFee = ({
  registrationFee,
  registrationFeeBMC,
}: {
  registrationFeeBMC: number | null;
  registrationFee: number | null;
}) => {
  if (!registrationFeeBMC || !registrationFee) {
    return (
      <div className="flex items-center">
        <div className="font-bold text-2xl">Free</div>
      </div>
    );
  }

  if (registrationFeeBMC === registrationFee) {
    return (
      <div className="flex items-center">
        <span>
          Registration Fee:{" "}
          <span className="font-medium">Rs.{`${registrationFee}`} </span>
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center">
        <span>
          BMC Student Fee:{" "}
          <span className="font-medium">Rs.{`${registrationFeeBMC}`} </span>
        </span>
      </div>
      <div className="flex items-center">
        <span>
          General Fee:{" "}
          <span className="font-medium">Rs.{`${registrationFee}`} </span>
        </span>
      </div>
    </>
  );
};

export default EventRegistrationFee;
