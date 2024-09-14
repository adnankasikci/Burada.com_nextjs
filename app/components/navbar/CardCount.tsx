"use client"
import { MdShoppingBasket } from "react-icons/md";
import React from 'react'
import UseCart from "@/hooks/useCart";
import Link from "next/link"

const CardCount = () => {

    const { cartPrdcts } = UseCart()

    return (
        <Link href="/cart" className='hidden md:flex relative'>
            <MdShoppingBasket size="25" />
            <div className='absolute -top-2 -right-2 text-xs bg-blue-900 w-5 h-5 flex items-center justify-center rounded-full'>{cartPrdcts?.length}</div>
        </Link>
    )
}

export default CardCount
