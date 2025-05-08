'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = "/api/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    };

    fetch(apiUrl, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        console.log(data);
        setUser(data);
        alert("Login successful");
        if (data.message === "Login successful") {
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <>
      <h1 className="font-bold text-xl text-center mt-10">Roles And Permissions</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto shadow-2xl mt-15 flex flex-col p-6 bg-white rounded-md"
      >
        <label htmlFor="role" className="font-bold text-center text-3xl mb-6">Login</label>

        <label htmlFor="email" className="mb-1 font-medium">Email:</label>
        <input
          value={user.email}
          onChange={handleInput}
          className="p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          type="email"
          id="email"
          name="email"
        />

        <label htmlFor="password" className="mb-1 font-medium">Password:</label>
        <input
          value={user.password}
          onChange={handleInput}
          className="p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          type="password"
          id="password"
          name="password"
        />

        <input
          type="submit"
          value="Login"
          className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
        />
      </form>

    </>
  );
}
