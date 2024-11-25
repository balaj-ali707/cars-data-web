"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [filters, setFilters] = useState({
    displacement: "",
    cylinders: "",
    horsepower: "",
    year: "",
  });

  const [results, setResults] = useState([]);

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

  const fetchResults = async () => {
    try {
      const baseUrl = "/api/Cars";

      const queryParams = new URLSearchParams();

      if (filters.displacement)
        queryParams.append("displacement", filters.displacement);
      if (filters.cylinders) queryParams.append("cylinders", filters.cylinders);
      if (filters.horsepower)
        queryParams.append("horsepower", filters.horsepower);
      if (filters.year) queryParams.append("year", filters.year);

      const url = `${
        queryParams.size > 0
          ? `${baseUrl}?${queryParams.toString()}`
          : `${baseUrl}`
      } `;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      const response = await res.json();
      if (res.ok) {
        setResults(response.body);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("Internal Server Error. Check console for details.");
    }
  };

  useEffect(() => {
    fetchResults();
  }, [filters]);

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
