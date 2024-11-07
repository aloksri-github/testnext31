"use client";
import React, {useState} from "react";
import InputFields from "./inputFields";

const PersonForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    // Here, you could send the data to a server, or perform any other action
    console.log("Form submitted with data:", {firstName, lastName, fatherName});
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Person Information</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full justify-between p-5 bg-slate-400"
      >
        {" "}
        {/* Responsive grid layout */}
        <InputFields
          label="First Name"
          name="firstName"
          value={firstName}
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputFields
          label="Last Name"
          name="lastName"
          value={lastName}
          type="text"
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputFields
          label="Father Name"
          name="fatherName"
          value={fatherName}
          type="text"
          onChange={(e) => setFatherName(e.target.value)}
        />
        <button
          type="submit"
          className="mt-4 col-span-2 bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600" // Button spans both columns
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PersonForm;
