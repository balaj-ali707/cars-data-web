"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

  function processDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <div className="absolute top-5 right-0">
        {isLoggedIn ? (
          <button
            type="button"
            onClick={() => { router.push("/admin")}}
            className="border-2 border-blue-500 text-blue-700 hover:bg-blue-500 hover:text-white bg-transparent text-xl px-7 py-2 mx-5 rounded-lg"
          >
            {JSON.parse(localStorage.getItem("userDetails")).name}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => { router.push("/login")}}
            className="border-2 border-blue-500 text-blue-700 hover:bg-blue-500 hover:text-white bg-transparent text-xl px-7 py-2 mx-5 rounded-lg"
          >
            Login
          </button>
        )}
      </div>
      <div className="container h-full bg-white mx-auto my-20">
        <h1 className="text-4xl text-center font-bold">Cars App</h1>

        <div className="my-20 space-y-3">
          <h2 className="text-xl text-center">Filters</h2>
          <ul className="flex lg:flex-row flex-col items-center justify-center">
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
                  className="lg:w-52 w-96 border-2 border-[#e9e9e9] outline-none text-xl uppercase px-5 py-2 mx-3 lg:mt-0 mt-7 rounded"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="my-20 flex flex-wrap items-center justify-center gap-4">
          {results.length > 0 ? (
            results.map((item, index) => (
              <div
                key={index}
                className="w-96 border border-gray-300 rounded-lg p-4 shadow-md bg-white"
              >
                <h3 className="font-bold text-lg mb-2 capitalize">
                  {item.Name || "Unknown Car"}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <strong>Displacement:</strong> {item.Displacement}
                  </li>
                  <li>
                    <strong>Miles per Gallon:</strong>{" "}
                    {item.Miles_per_Gallon || "N/A"}
                  </li>
                  <li>
                    <strong>Cylinders:</strong> {item.Cylinders}
                  </li>
                  <li>
                    <strong>Horsepower:</strong> {item.Horsepower}
                  </li>
                  <li>
                    <strong>Weight (lbs):</strong> {item.Weight_in_lbs}
                  </li>
                  <li>
                    <strong>Acceleration:</strong> {item.Acceleration}
                  </li>
                  <li>
                    <strong>Year:</strong> {processDate(new Date(item.Year))}
                  </li>
                  <li>
                    <strong>Origin:</strong> {item.Origin}
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <div className="my-20">
              <h3 className="font-bold text-lg mb-2 capitalize">
                No Cars data available.
              </h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
