"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRoles = async () => {
    try {
      const res = await fetch("/api/assignrole");
      if (!res.ok) throw new Error("Failed to load roles");
      const data = await res.json();
      console.log(data);
      // setUsers(data);
      const filterData = data.filter((item) => !item.roleId);
      setUsers(filterData);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await fetch("/api/roles/getroles");
      if (!res.ok) throw new Error("Failed to load roles");
      const data = await res.json();
      setRoles(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (userId, role) => {
    const data = {
      roleId: role,
      userId: userId,
    };

    try {
      const res = fetch("/api/assignrole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error assigning role:", error);
    }
  };

  useEffect(() => {
    loadRoles();
    loadUsers();
    handleChange();
  }, []);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-5">
        <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
          Assign Role
        </h2>

        {loading ? (
          <p>Loading roles...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="text-left px-6 py-3 border-b">Username</th>
                  <th className="text-left px-6 py-3 border-b">Assign Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">
                      <select
                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => handleChange(item.id, e.target.value)}
                      >
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.role}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
            Assigned Roles
          </h2>

          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="text-left px-6 py-3 border-b">USER NAME</th>
                  <th className="text-left px-6 py-3 border-b">Email</th>
                  <th className="text-left px-6 py-3 border-b">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((role) => (
                  <tr key={role.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{role.name}</td>
                    <td className="px-6 py-4">{role.email}</td>
                    <td className="px-6 py-4">{role.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
