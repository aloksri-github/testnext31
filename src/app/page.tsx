"use client";
import React, {useState} from "react";

import axios from "axios";

interface FormData {
  country: string;
  state: string;
  district: string;
  aliases: string[];
}

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    country: "",
    state: "",
    district: "",
    aliases: [],
  });

  const [aliasInput, setAliasInput] = useState<string>("");
  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);

  // Dummy data for dropdowns
  const countries = ["USA", "Canada", "India"];
  const countryStates = {
    USA: ["California", "Texas", "New York"],
    Canada: ["Ontario", "Quebec", "British Columbia"],
    India: ["Maharashtra", "Gujarat", "Rajasthan"],
  };
  const stateDistricts = {
    California: ["Los Angeles", "San Francisco"],
    Texas: ["Houston", "Dallas"],
    NewYork: ["Manhattan", "Brooklyn"],
    Ontario: ["Toronto", "Ottawa"],
    Quebec: ["Montreal", "Quebec City"],
    "British Columbia": ["Vancouver", "Victoria"],
    Maharashtra: ["Mumbai", "Pune"],
    Gujarat: ["Ahmedabad", "Surat"],
    Rajasthan: ["Jaipur", "Udaipur"],
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setFormData({
      ...formData,
      country: selectedCountry,
      state: "",
      district: "",
    });
    setStates(countryStates[selectedCountry] || []);
    setDistricts([]);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    setFormData({...formData, state: selectedState, district: ""});
    setDistricts(stateDistricts[selectedState] || []);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData, district: e.target.value});
  };

  const handleAliasInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAliasInput(e.target.value);
  };

  const handleAliasAdd = () => {
    if (aliasInput.trim()) {
      setFormData({
        ...formData,
        aliases: [...formData.aliases, aliasInput.trim()],
      });
      setAliasInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/submitForm", formData);
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <select
          value={formData.country}
          onChange={handleCountryChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {states.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <select
            value={formData.state}
            onChange={handleStateChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      )}

      {districts.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            District
          </label>
          <select
            value={formData.district}
            onChange={handleDistrictChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a district</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Alias</label>
        <div className="flex items-center">
          <input
            type="text"
            value={aliasInput}
            onChange={handleAliasInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <button type="button" onClick={handleAliasAdd} className="ml-2">
            Add
          </button>
        </div>
        <div className="mt-2">
          {formData.aliases.map((alias, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm mr-2 mb-2"
            >
              {alias}
            </span>
          ))}
        </div>
      </div>

      <button type="submit" className="mt-4">
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
