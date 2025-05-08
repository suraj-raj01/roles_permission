'use client'
import React from 'react'

const page = () => {
  const [Input, setInput] = React.useState({
    username: '',
    email: '',
    password: ''
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    setInput((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Input)
      })

      if (res.ok) {
        alert('User added successfully')
        console.log(Input)
        setInput({ username: '', email: '', password: '' }) // Reset state
      } else {
        alert('Failed to add user')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold ml-10 mt-10">Add User</h1>
      <form className="flex flex-col gap-3 w-80 ml-10 mt-10 m-auto"  onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={Input.username}
          placeholder="Username"
          onChange={handleInput}
          className="border border-gray-300 p-2 rounded-md"
          required
        />
        <input
          type="email"
          name="email"
          value={Input.email}
          placeholder="Email"
          onChange={handleInput}
          className="border border-gray-300 p-2 rounded-md"
          required
        />
        <input
          type="password"
          name="password"
          value={Input.password}
          placeholder="Password"
          onChange={handleInput}
          className="border border-gray-300 p-2 rounded-md"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add User
        </button>
      </form>
    </div>
  )
}

export default page
