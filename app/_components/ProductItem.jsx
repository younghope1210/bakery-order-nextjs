import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import ProductItemDetail from './ProductItemDetail'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"


function ProductItem({product}) {
    // const cookies = useCookies();
  return (
    <div className='p-4 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-105 jpver:shadow-lg transition-all ease-in-out cursor-pointer'>
       <Image src={product?.attributes?.images.data.attributes.url} 
         width={300}
         height={300}
         alt='상품이미지'   
         className='lg:w-[300px] md:h-[300px] object-cover'
       />
       <h2 className='font-bold text-lg'>
        {product.attributes.name}
       </h2>
       <div className='flex gap-3'>
          {product.attributes.sellingPrice&&
            <h2 className='font-bold text-lg text-red-600'>
                {product.attributes.sellingPrice} 
                <span className='text-black font-normal m-1 font-sm'>won</span>
            </h2>
          }
          <h2  className={`font-bold text-lg ${product.attributes.sellingPrice&&'line-through text-gray-500'}`}>
            {product?.attributes.mrp}
          </h2>
          
       </div>
       <Dialog>
        <DialogTrigger asChild>
        <Button variant="outline"
            className="text-primary hover:text-white hover:bg-primary"
            >Add to cart</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            
            <DialogDescription>
                <ProductItemDetail product={product} />
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default ProductItem
