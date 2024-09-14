"use client";
import { CardProductProps } from "@/app/components/detail/DetailClient";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CardContextProps {
    productCartQty: number
    cartPrdcts: CardProductProps[] | null
    addToBasket: (product: CardProductProps) => void
    addToBasketIncrease: (product: CardProductProps) => void
    addToBasketDecrease: (product: CardProductProps) => void
    removeFromCart: (product: CardProductProps) => void
    removeCart: () => void
}

const CartContext = createContext<CardContextProps | null>(null)

interface Props {
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {
    const [productCartQty, setProductCartQty] = useState(0)
    const [cartPrdcts, setCartPrdcts] = useState<CardProductProps[] | null>(null)

    useEffect(() => {
        let getItem: any = localStorage.getItem('cart');
        let getItemParse: CardProductProps[] | null = JSON.parse(getItem);
        setCartPrdcts(getItemParse);
    }, [])

    const addToBasketIncrease = useCallback((product: CardProductProps) => {
        let updatedCart;
        if (product.quantity == 10) {
            return toast.error('Daha fazla ekleyemezsin...')
        }
        if (cartPrdcts) {
            updatedCart = [...cartPrdcts];
            const exisitgItem = cartPrdcts.findIndex(item => item.id === product.id)
            if (exisitgItem > -1) {
                updatedCart[exisitgItem].quantity = ++updatedCart[exisitgItem].quantity
            }
            setCartPrdcts(updatedCart)
            localStorage.setItem('cart', JSON.stringify(updatedCart))
        }
    }, [cartPrdcts])

    const addToBasketDecrease = useCallback((product: CardProductProps) => {
        let updatedCart;
        if (product.quantity == 1) {
            return toast.error('Daha az ekleyemezsin...')
        }
        if (cartPrdcts) {
            updatedCart = [...cartPrdcts];
            const exisitgItem = cartPrdcts.findIndex(item => item.id === product.id)
            if (exisitgItem > -1) {
                updatedCart[exisitgItem].quantity = --updatedCart[exisitgItem].quantity
            }
            setCartPrdcts(updatedCart)
            localStorage.setItem('cart', JSON.stringify(updatedCart))
        }
    }, [cartPrdcts])

    const removeCart = useCallback(() => {
        setCartPrdcts(null);
        toast.success('Sepet Temizlendi...')
        localStorage.setItem('cart', JSON.stringify(null))
    }, [])

    const addToBasket = useCallback((product: CardProductProps) => {
        setCartPrdcts(prev => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            toast.success('Ürününüz Sepete Eklendi...')
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            return updatedCart
        })
    }, [cartPrdcts])

    const removeFromCart = useCallback((product: CardProductProps) => {
        if (cartPrdcts) {
            const filteredProducts = cartPrdcts.filter(cart => cart.id !== product.id)
            setCartPrdcts(filteredProducts);
            toast.success('Ürün Sepetten Silindi...')
            localStorage.setItem('cart', JSON.stringify(filteredProducts))
        }


    }, [cartPrdcts])

    let value = {
        productCartQty,
        addToBasket,
        cartPrdcts,
        removeFromCart,
        removeCart,
        addToBasketIncrease,
        addToBasketDecrease
    }

    return (
        <CartContext.Provider value={value} {...props} />
    )
}


const UseCart = () => {

    const context = useContext(CartContext)
    if (context == null) {
        throw new Error('Bir hata durumu mevcut')
    } return context
}

export default UseCart


