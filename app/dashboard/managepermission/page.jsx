'use client'
import React from 'react'

const page = () => {

    const [roles, setRoles] = React.useState('')

    const loadRoles = async () => {
        try {
            const res = await fetch('/api/roles', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                const data = await res.json()
                console.log(data)
                setRoles(data)
                console.log(roles);
            } else {
                alert('Failed to load roles')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('An error occurred')
        }
    }

    React.useEffect(() => {
        loadRoles()
    }, [])

    const setPermissions = async (roleId, permission) => {
        const data = { roleId, permission }
        console.log(data)
        try {
            const res = await fetch('/api/managepermission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                alert('Permission set successfully')
            } else {
                alert('Failed to set permission')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('An error occurred')
        }
    }

  return (
    <>
    <div className='flex flex-col gap-3 w-full ml-10 mt-10'>
            <table>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='p-2'>Role Name</th>
                        <th className='p-2'>Manage Admin</th>
                        <th className='p-2'>Manage Vendor</th>
                        <th className='p-2'>Manage Product</th>
                        <th className='p-2'>Manage Users</th>
                    </tr>
                </thead>
                <tbody>
                    {roles && roles.map((role,index) => (
                        <tr key={index}>
                            <td className='p-2'>{role.role}</td>
                            <td className='p-2'>
                                <input type="checkbox" onChange={()=>(setPermissions(role.id,"ManageAdmin"))}/>
                            </td>
                            <td className='p-2'>
                                <input type="checkbox" onChange={()=>(setPermissions(role.id,"ManageVendor"))}/>
                            </td>
                            <td className='p-2'>
                                <input type="checkbox" onChange={()=>(setPermissions(role.id,"ManageProduct"))}/>
                            </td>
                            <td className='p-2'>
                                <input type="checkbox" onChange={()=>(setPermissions(role.id,"ManageUsers"))}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
                    <tr className='bg-gray-200'>
                        <td className='p-2' colSpan="5">Total Roles: {roles ? roles.length : 0}</td>
                    </tr>
            </table>
    </div>
    </>
  )
}

export default page