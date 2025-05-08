"use client";
import React from "react";

const Page = () => {
  const [Input, setInput] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Input),
      });

      if (res.ok) {
        alert("User added successfully");
        console.log(Input);
        setInput({ username: "", email: "", password: "" });
      } else {
        alert("Failed to add user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Add User</h1>
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <input
          type="text"
          name="username"
          value={Input.username}
          placeholder="Username"
          onChange={handleInput}
          className="border border-gray-300 p-3 rounded-md w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={Input.email}
          placeholder="Email"
          onChange={handleInput}
          className="border border-gray-300 p-3 rounded-md w-full"
          required
        />
        <input
          type="password"
          name="password"
          value={Input.password}
          placeholder="Password"
          onChange={handleInput}
          className="border border-gray-300 p-3 rounded-md w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors w-full"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default Page;
