"use client"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import React, { useEffect } from 'react'
import AuthContainer from '../containers/AuthContainer'
import Heading from '../general/Heading'
import Input from '../general/Input'
import Button from '../general/Button'
import { FaGoogle } from "react-icons/fa";
import Link from "next/link"
import axios from "axios"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { User } from "@prisma/client"

interface RegisterClientProps {
    currentUser: User | null | undefined
}

const RegisterClient: React.FC<RegisterClientProps> = ({ currentUser }) => {

    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        axios.post('/api/register', data).then(() => {
            toast.success("Kullanıcı Oluşturuldu...")
            return signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })
        }).then((callback) => {
            if (callback?.ok) {
                router.push("/cart")
                router.refresh()
                toast.success('Login işlemi başarılı...')
            }

            if (callback?.error) {
                toast.error(callback.error)
            }
        })

    }

    useEffect(() => {
        if (currentUser) {
            router.push(('/cart'))
            router.refresh()
        }
    }, [])

    return (
        <AuthContainer>
            <div className='w-full md:w-[500px] p-3 shadow-lg rounded-md'>
                <Heading text="Register" center />
                <Input placeholder='Ad' type="text" id="name" register={register} errors={errors} required />
                <Input placeholder='Email' type="text" id="email" register={register} errors={errors} required />
                <Input placeholder='Parola' type="password" id="password" register={register} errors={errors} required />
                <Button text="Kayıt Ol" onClick={handleSubmit(onSubmit)} />
                <div className='text-center my-2 text-sm text-red-500'>Daha Önce Kaydınız Varsa <Link className='underline' href="/login">Buraya Tıkla</Link></div>
                <div className='text-center my-2 font-bold text-lg'>OR</div>
                <Button text="Google ile üye ol" icon={FaGoogle} outline onClick={() => signIn('google')} />
            </div>
        </AuthContainer>
    )
}

export default RegisterClient
