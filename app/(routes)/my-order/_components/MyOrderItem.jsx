import Image from 'next/image'
import React from 'react'

function MyOrderItem({orderItem}) {
  return (
    <div>

    <div className='grid grid-cols-5  mt-3 items-center'>
        <Image src={orderItem.product.data.attributes.images.data.attributes.url}
        width={80}
        height={80}
        alt='image'
        className='bg-gray-100 p-5 rounded-md border'
        />
        <div className='col-span-2'>
            <h2>{orderItem.product.data.attributes.name}</h2>
            <h2>Item Price: {orderItem.product.data.attributes.mrp}</h2>
        </div>
        <h2 className=''>Quantity:{orderItem.quantity}</h2>
        <h2>Price:{orderItem.amount}</h2>
       
      
    </div>
    <hr className='mt-3'></hr>
    </div>
  )
}

export default MyOrderItem
