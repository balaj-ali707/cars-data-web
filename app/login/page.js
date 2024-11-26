"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        email,
        password,
      };
      const res = await fetch("/api/Users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json()
      if(res.ok) {
        localStorage.setItem("userDetails", response.user)
        router.push("/")
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center">
      <form onSubmit={handleSubmit} className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
          Login
        </h2>
        <div className="relative mb-4">
          <label
            htmlFor="full-name"
            className="leading-7 text-sm text-gray-600"
          >
            Email
          </label>
          <input
            type="text"
            id="full-name"
            name="full-name"
            value={email}
            onChange={({target}) => setEmail(target.value)}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={({target}) => setPassword(target.value)}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <span
            onClick={handleShowPassword}
            className="absolute inset-y-10 right-0 mt-[3px] px-5 text-[#676767] font-semibold focus:outline-none cursor-pointer z-20"
          >
            {!showPassword ? <IoMdEyeOff /> : <IoMdEye />}
          </span>
        </div>
        <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
