"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button';

function CartItemList({cartItemList, onDeleteItem}) {


  return (
    <div>
        <div className='h-[700px] overflow-auto border'>
            {cartItemList?.map((cart, id) => (
                <div className='flex justify-between items-center p-2 mb-5'>
                    <div className='flex gap-6 items-center p-2 mb-5 '>
                        <Image 
                            src={cart.image} 
                            width={90} height={90} 
                            alt={cart.name} 
                            className='border p-2'
                        />
                         <div>
                            <h2 className='font-bold'>{cart.name}</h2>
                            <h2 className=''>Quantity {cart.quantity}</h2>
                            <h2 className='text-lg font-bold'>$ {cart.amount}</h2>
                        </div>
                   
                    </div>
                        <TrashIcon 
                            className='cursor-pointer'
                            onClick={() => onDeleteItem(cart.id)} 
                        />
                </div>
            ))}
        </div>
 
    </div>
  )
}

export default CartItemList
