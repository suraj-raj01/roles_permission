"use client";

import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const Page = () => {
  const [role, setRole] = useState("");
  const [loadrole, setRoles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { role };

    try {
      const res = await fetch("/api/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Role created successfully");
        setRole("");
        loadRoles(); // Refresh list
      } else {
        alert("Failed to create role");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  const loadRoles = () => {
    fetch("/api/roles")
      .then((response) => response.json())
      .then((data) => setRoles(data))
      .catch((error) => console.error("Error fetching roles:", error));
  };

  useEffect(() => {
    loadRoles();
  }, []);

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      {/* Create Role Section */}
      <h1 className="text-2xl font-bold mb-6">Create Role</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-10"
      >
        <input
          type="text"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role Name"
          className="border border-gray-300 p-3 rounded-md w-full sm:w-auto flex-1"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Create Role
        </button>
      </form>

      {/* Created Roles Section */}
      <h1 className="text-2xl font-bold mb-4">Created Roles</h1>
      <div className="space-y-3">
        {loadrole.length === 0 ? (
          <p className="text-gray-500">No roles found.</p>
        ) : (
          loadrole.map((role) => (
            <div
              key={role.id}
              className="flex justify-between items-center border border-gray-300 p-4 rounded-md bg-white shadow-sm"
            >
              <span className="text-lg">{role.role}</span>
              <div className="flex items-center gap-4 text-gray-600 text-xl">
                <FaEdit
                  className="cursor-pointer hover:text-blue-600"
                  title="Edit"
                />
                <AiFillDelete
                  className="cursor-pointer hover:text-red-600"
                  title="Delete"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
