"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import axios from "axios";

const Page = () => {

  const router = useRouter()
  useEffect(() => {

    const userDetails = JSON.parse(localStorage.getItem("userDetails"))
    if(!userDetails)
      router.push("/")

  }, []);

  const [formData, setFormData] = useState({
    Name: "",
    Miles_per_Gallon: "",
    Cylinders: "",
    Displacement: "",
    Horsepower: "",
    Weight_in_lbs: "",
    Acceleration: "",
    Year: "",
    Origin: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/Cars`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const response = await res.json();
      if (res.ok) {
        setMessage("Car added successfully!");
        setFormData({
          Name: "",
          Miles_per_Gallon: "",
          Cylinders: "",
          Displacement: "",
          Horsepower: "",
          Weight_in_lbs: "",
          Acceleration: "",
          Year: "",
          Origin: "",
        });
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      console.error("Error adding car:", error);
      setMessage("Failed to add car. Please try again.");
    }
  };

  return (
    <>
      <div className="absolute top-5 right-0">
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("userDetails")
            router.push("/");
          }}
          className="border-2 border-blue-500 text-blue-700 hover:bg-blue-500 hover:text-white bg-transparent md:text-xl text-base px-7 py-2 mx-5 rounded-lg"
        >
          Logout
        </button>
      </div>
      <div className="container h-screen bg-white mx-auto my-20">
        <h1 className="text-4xl text-center font-bold">Add Car Details</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center mt-5"
        >
          <div className="relative mb-4 flex flex-col">
            <label htmlFor="Name">Name:</label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
              className="lg:w-[500px] md:w-[400px] w-[300px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4 flex flex-col">
            <label htmlFor="Miles_per_Gallon">Miles per Gallon:</label>
            <input
              type="number"
              id="Miles_per_Gallon"
              name="Miles_per_Gallon"
              value={formData.Miles_per_Gallon}
              onChange={handleChange}
              required
              className="lg:w-[500px] md:w-[400px] w-[300px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4 flex flex-col">
            <label htmlFor="Cylinders">Cylinders:</label>
            <input
              type="number"
              id="Cylinders"
              name="Cylinders"
              value={formData.Cylinders}
              onChange={handleChange}
              required
              className="lg:w-[500px] md:w-[400px] w-[300px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4 flex flex-col">
            <label htmlFor="Displacement">Displacement:</label>
            <input
              type="number"
              id="Displacement"
              name="Displacement"
              value={formData.Displacement}
              onChange={handleChange}
              required
              className="lg:w-[500px] md:w-[400px] w-[300px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4 flex flex-col">
            <label htmlFor="Horsepower">Horsepower:</label>
            <input
              type="number"
              id="Horsepower"
              name="Horsepower"
              value={formData.Horsepower}
              onChange={handleChange}
              required
              className="lg:w-[500px] md:w-[400px] w-[300px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4 flex flex-col">
            <label htmlFor="Weight_in_lbs">Weight (lbs):</label>
            <input
              type="number"
              id="Weight_in_lbs"
              name="Weight_in_lbs"
              value={formData.Weight_in_lbs}
              onChange={handleChange}
              required
              className="lg:w-[500px] md:w-[400px] w-[300px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4 flex flex-col">
            <label htmlFor="Acceleration">Acceleration:</label>
            <input
              type="number"
              id="Acceleration"
              name="Acceleration"
              value={formData.Acceleration}
              onChange={handleChange}
              required
              className="lg:w-[500px] md:w-[400px] w-[300px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4 flex flex-col">
            <label htmlFor="Year">Year:</label>
            <input
              type="date"
              id="Year"
              name="Year"
              value={formData.Year}
              onChange={handleChange}
              required
              className="lg:w-[500px] md:w-[400px] w-[300px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4 flex flex-col">
            <label htmlFor="Origin">Origin:</label>
            <input
              type="text"
              id="Origin"
              name="Origin"
              value={formData.Origin}
              onChange={handleChange}
              required
              className="lg:w-[500px] md:w-[400px] w-[300px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="lg:w-[500px] md:w-[400px] w-[300px] border-2 border-blue-500 text-blue-700 hover:bg-blue-500 hover:text-white bg-transparent text-xl px-7 py-2 mx-5 rounded-lg"
          >
            Add Car
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default Page;
