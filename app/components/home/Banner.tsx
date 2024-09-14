import React from 'react'
import Image from 'next/image';

const Banner = () => {
    return (
        <div className='h-[350px] bg-blue-900 flex items-center justify-center'>
            <div className='h-[300px] relative w-2/3 object-cover flex items-center justify-center rounded-md'>
                <Image src={"/hpsi.png"} fill alt="" className='object-cover rounded-md' sizes="1" priority />
            </div>
        </div>
    )
}

export default Banner
