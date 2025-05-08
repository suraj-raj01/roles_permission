'use client'

import React, { useState } from 'react'

const Page = () => {
  const [role, setRole] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = { role }

    try {
      const res = await fetch('/api/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        alert('Role created successfully')
        setRole('')
        setPermissions('')
      } else {
        alert('Failed to create role')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold ml-10 mt-10">Create Role</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80 ml-10 mt-10">
        <input
          type="text"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role Name"
          className="border border-gray-300 p-2 rounded-md"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Create Role
        </button>
      </form>
    </div>
  )
}

export default Page
