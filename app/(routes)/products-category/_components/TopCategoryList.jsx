import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function TopCategoryList({categoryList }) {
  return (
    <div className='flex justify-center mt-20 m-auto'>
      <div className='flex flex-row flex-wrap'>
        {categoryList?.map((category,id) => (

            <div key={id}>
               <Link href={'/products-category/'+category.attributes.name} 
                     className='flex flex-col items-center gap-2 p-3 rounded-lg group cursor-pointer w-[150px] min-w-[100px]'>
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

export default TopCategoryList
