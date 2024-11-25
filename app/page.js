"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [filters, setFilters] = useState({
    displacement: "",
    cylinders: "",
    horsepower: "",
    year: "",
  });

  const onFilterValueChnage = (filter, value) => {
    setFilters((prevDetails) => {
      const newDetails = { ...prevDetails };
      if (filter === "year") {
        const date = new Date(value);
        newDetails[
          "year"
        ] = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      } else {
        newDetails[filter] = value;
      }
      return newDetails;
    });
  };

  return (
    <div className="container h-screen bg-white mx-auto my-20">
      <h1 className="text-4xl text-center font-bold">Cars App</h1>

      <div className="my-20 space-y-3">
        <h2 className="text-xl text-center">Filters</h2>
        <ul className="flex items-center justify-center">
          {Object.keys(filters).map((filter, index) => (
            <li key={index}>
              <input
                type={filter === "year" ? "date" : "number"}
                name={filter}
                value={filters[filter]}
                placeholder={filter}
                onChange={({ target }) =>
                  onFilterValueChnage(filter, target.value)
                }
                className="w-52 border-2 border-[#e9e9e9] outline-none text-xl uppercase px-5 py-2 mx-3 rounded"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
