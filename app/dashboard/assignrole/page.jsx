'use client';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadRoles = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/assignrole');
            if (!res.ok) throw new Error('Failed to load roles');
            const data = await res.json();
            console.log(data);
            // setUsers(data);
            const filterData = data.filter((item) =>!item.roleId);
            setUsers(filterData);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch roles');
        } finally {
            setLoading(false);
        }
    };

    const loadUsers = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/roles/getroles');
            if (!res.ok) throw new Error('Failed to load roles');
            const data = await res.json();
            setRoles(data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch roles');
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (userId,role) => {
        const data = {
            roleId: role,
            userId: userId,
        };

        try {
            const res = fetch('http://localhost:3000/api/assignrole', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.error('Error assigning role:', error);
        }
    };

    useEffect(() => {
        loadRoles();
        loadUsers();
        handleChange();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Assign Role</h1>

            {loading ? (
                <p>Loading roles...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto w-90">
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
                                        <select className="border rounded-md p-2 w-full"
                                        onChange={(e)=>{handleChange(item.id, e.target.value)}}
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
        </div>
    );
};

export default Page;
