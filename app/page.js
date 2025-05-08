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
        if(data.message === "Login successful") {
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <>
      <h1>Roles And Permissions</h1>
      <form
        onSubmit={handleSubmit}
        className="w-1/3 mx-auto shadow-2xl mt-5 flex flex-col p-5"
      >
        <label htmlFor="role" className="font-bold text-center text-2xl">Login</label>
        
        <label htmlFor="email">Email:</label>
        <input
          value={user.email}
          onChange={handleInput}
          className="p-2 border-1"
          required
          type="email"
          id="email"
          name="email"
        />
        <br />
        
        <label htmlFor="password">Password:</label>
        <input
          value={user.password}
          onChange={handleInput}
          className="p-2 border-1"
          required
          type="password"
          id="password"
          name="password"
        />
        
        <input
          type="submit"
          value="Login"
          className="bg-blue-500 text-white p-2 mt-5"
        />
        <br />
      </form>
    </>
  );
}
