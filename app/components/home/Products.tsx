import React from 'react'
import Heading from './../general/Heading';
import ProductCard from './ProductCard';
import { products } from '@/utils/Products';

const Products = () => {
    return (
        <div>
            <Heading text="Tüm Ürünler" />
            <div className='flex items-center gap-3 md:gap-10 flex-wrap px-3 md:px-10'>
                {
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default Products
