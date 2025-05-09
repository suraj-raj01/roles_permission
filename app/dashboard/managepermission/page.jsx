"use client";
import React from "react";

const page = () => {
  const [roles, setRoles] = React.useState("");

  const loadRoles = async () => {
    try {
      const res = await fetch("/api/roles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setRoles(data);
        console.log(roles);
      } else {
        alert("Failed to load roles");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  React.useEffect(() => {
    loadRoles();
  }, []);

  const setPermissions = async (roleId, permission) => {
    const data = { roleId, permission };
    console.log(data);
    try {
      const res = await fetch("/api/managepermission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("Permission set successfully");
      } else {
        alert("Failed to set permission");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  return (
    <>
      <div className="w-full px-4 sm:px-10 mt-10">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left">Role Name</th>
                <th className="p-3 text-left">Manage Admin</th>
                <th className="p-3 text-left">Manage Vendor</th>
                <th className="p-3 text-left">Manage Product</th>
                <th className="p-3 text-left">Manage Users</th>
                <th className="p-3 text-left">See Products</th>
              </tr>
            </thead>
            <tbody>
              {roles &&
                roles.map((role, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3">{role.role}</td>
                    <td className="p-3">
                      <input
                        type="checkbox"
                        value="ManageAdmin"
                        defaultChecked={role.permissions.includes("ManageAdmin")}
                        onChange={() => setPermissions(role.id, "ManageAdmin")}
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="checkbox"
                        value="ManageVendor"
                        defaultChecked={role.permissions.includes("ManageVendor")}
                        onChange={() => setPermissions(role.id, "ManageVendor")}
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="checkbox"
                        value="ManageProduct"
                        defaultChecked={role.permissions.includes("ManageProduct")}
                        onChange={() =>
                          setPermissions(role.id, "ManageProduct")
                        }
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="checkbox"
                        value="ManageUsers"
                        defaultChecked={role.permissions.includes("ManageUsers")}
                        onChange={() => setPermissions(role.id, "ManageUsers")}
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="checkbox"
                        value="seeproducts"
                        defaultChecked={role.permissions.includes("seeproducts")}
                        onChange={() => setPermissions(role.id, "seeproducts")}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200 text-gray-700">
                <td className="p-3" colSpan="6">
                  Total Roles: {roles ? roles.length : 0}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default page;
