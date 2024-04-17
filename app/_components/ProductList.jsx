import React from 'react'
import ProductItem from './ProductItem'

function ProductList({productList}) {
  return (
    <div className='mt-5 max-w-7xl mx-auto mb-auto px-5 md:px-0'> 
      <h2 className='text-primary text-2xl font-bold text-center my-[35px]'>
        Our Popular Products
      </h2>
      <p className='mx-auto max-w-md text-gray-500 text-center my-3'>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
        dicta incidunt est ipsam.
      </p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10' >
        {productList?.map((product, id) => id < 12 &&(
            <div key={id}>
                 <ProductItem product={product} />
            </div>
        ))}
      </div>
      
    </div>
  )
}

export default ProductList
