import React from "react";
import InputForm from "./InputForm";

const page = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[20rem]">
        <h2 className="my-5 text-lg">Enter your Certificate ID</h2>
        <InputForm />
      </div>
    </>
  );
};

export default page;
