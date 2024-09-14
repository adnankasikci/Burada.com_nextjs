"use client"

import type { User } from "@prisma/client";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { AiOutlineUser } from "react-icons/ai";



interface UserProps {
    currentUser: User | null | undefined
}

const User: React.FC<UserProps> = ({ currentUser }) => {

    const router = useRouter()
    const [openMenu, setOpenMenu] = useState(false);

    const menuFunc = (type: any) => {
        if (type == "logout") {
            signOut();
        }
        setOpenMenu(false)
        router.push(`/${type}`);

    }

    // console.log(currentUser)
    return (
        <div className='hidden md:flex relative'>
            <div onClick={() => setOpenMenu(!openMenu)} className='flex items-center gap-1 cursor-pointer'>
                <AiOutlineUser size={25} />
                <div>{currentUser ? currentUser.name : "User"}</div>
            </div>
            {
                openMenu && (
                    <div className='absolute w-[200px] top-10 bg-white shadow-lg rounded-md right-0 p-2'>
                        {
                            currentUser ? (
                                <div className='space-y-1'>
                                    <div onClick={() => menuFunc("admin")} className='text-slate-600'>Admin</div>
                                    <div onClick={() => menuFunc("logout")} className='text-slate-600'>Logout</div>
                                </div>
                            ) :
                                (
                                    <div>
                                        <div onClick={() => menuFunc("register")} className='text-slate-600'>Register</div>
                                        <div onClick={() => menuFunc("login")} className='text-slate-600'>Login</div>
                                    </div>
                                )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default User
