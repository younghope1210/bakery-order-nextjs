
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import Image from 'next/image'

function Slider({sliderList}) {
  return (
    <Carousel>
    <CarouselContent>
        {sliderList.map((slider,id) => (
             <CarouselItem key={id}>
                <Image src={slider.attributes?.image?.data[0]?.attributes?.url}
                width={1280}
                height={400}
                alt='slider'
                className='w-full h-[200px] md:h-[400px] object-cover rounded-2xl' />
             </CarouselItem>
        ))}
     
    
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  )
}

export default Slider
