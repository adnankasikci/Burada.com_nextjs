import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'

interface AdminSidebarItem {
    selected?: boolean
    name: string
    icon: IconType
    url: string
}

const AdminSidebarItem: React.FC<AdminSidebarItem> = ({ selected, name, icon: Icon, url }) => {

    return (
        <Link className={`cursor-pointer flex items-center gap-2 p-2 text-blue-500 border ${selected ? "font-bold border-blue-500" : "opacity-50 font-medium border-transparent"}`} href={url}>
            <Icon size={25} />
            <div>{name}</div>
        </Link>
    )
}

export default AdminSidebarItem
