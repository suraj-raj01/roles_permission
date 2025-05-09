'use client'
import React from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiFillDashboard } from "react-icons/ai";
import { RiInsertColumnRight } from "react-icons/ri";
import { FaDisplay } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { defineAbilitiesFor } from '../lib/casl/ability';
import { createContextualCan } from '@casl/react';
import { createContext, useState, useEffect } from 'react';
const AbilityContext = createContext();

export default function LayOut({ children }) {
    const [ability, setAbility] = useState(null);

    const sidebar = () => {
        document.getElementById("vendordashboard").style.display = 'block'
        document.getElementById("menu").style.display = 'none'
        document.getElementById("cancelbtn").style.display = 'block'
    }

    const cancelbtn = () => {
        document.getElementById("vendordashboard").style.display = 'none'
        document.getElementById("menu").style.display = 'block'
        document.getElementById("cancelbtn").style.display = 'none'
    }

    const router = useRouter();

    const logout = () => {
        router.push('/');
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return;

        const user = JSON.parse(storedUser);
        console.log(user);
        console.log('User Role:', user?.user?.role?.role);
        console.log('User Permissions:', user?.user?.role?.permissions);
        const abilityInstance = defineAbilitiesFor(user);
        setAbility(abilityInstance);
    }, []);

    const CanComponent = createContextualCan(AbilityContext.Consumer);
    if (!ability) return null;
    console.log(ability);
    return <main>
        <AbilityContext.Provider value={ability}>
            <header id="vendor-nav">
                <div className="flex items-center content-center gap-3">
                    <FaBars onClick={sidebar} id="menu" /> <ImCancelCircle id="cancelbtn" onClick={cancelbtn} />
                    DASHBOARD
                </div>
                <div>
                    <FaRegCircleUser onClick={logout} />
                </div>
            </header>
            <div id="vendor-main">

                <div id="vendordashboard">
                    <Link href='#' className="flex items-center gap-3 text-2xs"><AiFillDashboard />Dashboard</Link>
                    <CanComponent I="manage" a="Admin"><Link href='/dashboard/createrole' className="flex items-center gap-3 text-2xs"><RiInsertColumnRight />Create Role</Link></CanComponent>
                    <CanComponent I="manage" a="Product"><Link href='/dashboard/adduser' className="flex items-center gap-3 text-2xs"><FaDisplay />Add User</Link></CanComponent>
                    <CanComponent I="manage" a="Vendor"><Link href='/dashboard/managepermission' className="flex items-center gap-3 text-2xs"><FaEdit />Manage Permission</Link></CanComponent>
                    <CanComponent I="manage" a="User"><Link href='/dashboard/assignrole' className="flex items-center gap-3 text-2xs"><RiLogoutBoxLine />Assign Role</Link></CanComponent>
                    <CanComponent I="read" a="Product"><Link href='/dashboard/displayproduct' className="flex items-center gap-3 text-2xs"><RiLogoutBoxLine />Display Products</Link></CanComponent>
                
                
                    {/* <Link href='/dashboard/createrole' className="flex items-center gap-3 text-2xs"><RiInsertColumnRight />Create Role</Link>
                    <Link href='/dashboard/adduser' className="flex items-center gap-3 text-2xs"><FaDisplay />Add User</Link>
                    <Link href='/dashboard/managepermission' className="flex items-center gap-3 text-2xs"><FaEdit />Manage Permission</Link>
                    <Link href='/dashboard/assignrole' className="flex items-center gap-3 text-2xs"><RiLogoutBoxLine />Assign Role</Link> */}
                </div>
                {children}
            </div>
        </AbilityContext.Provider>
    </main>
}