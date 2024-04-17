
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function CategoryList({categoryList}) {
  return (
    <div className='mt-5 max-w-5xl mx-auto mb-auto' > 
      <h2 className='text-primary text-2xl font-bold text-center my-8'>
        Shop by Category
      </h2>
      <p className='mx-auto max-w-md text-gray-500 text-center mb-5'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
        dicta incidunt est ipsam.
      </p>
      <div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-5 mt-10 '>
        {categoryList?.map((category,id) => (

            <div key={id}>
               <Link href={'/products-category/'+category.attributes.name} 
                     className='flex flex-col items-center gap-2 p-3 rounded-lg group cursor-pointer '>
                    <Image 
                        src={category?.attributes?.icon.data.attributes.url}  
                        width={50} 
                        height={50} 
                        alt='icon'
                        className='group-hover:scale-125 transition-all ease-in-out'
                    
                    />
                    <h2 className='text-black group-hover:scale-125 transition-all ease-in-out'>
                        {category?.attributes?.name}
                    </h2>
                </Link>
            </div>

        ))}
      </div>
    </div>
  )
}

export default CategoryList
