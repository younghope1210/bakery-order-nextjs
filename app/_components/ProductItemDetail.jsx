"use client"
import { Button } from '@/components/ui/button'
import { LoaderCircle, ShoppingBasket } from 'lucide-react';
import Link from 'next/link'
import Image  from 'next/image'
import React,{ useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import GlobalApi from '../_utils/GlobalApi';
import { toast } from 'sonner';
import { UpdateCartContext } from '../_context/UpdateCartContext'
// import { getCookie } from 'cookies-next'

function ProductItemDetail({product}) {

  const {updateCart,setUpdateCart} = useContext(UpdateCartContext);

  const [quantity , setQuantity] = useState(1);
  const [loading , setLoading] = useState(false);
  const [productTotalPrice , setProductTotalPrice] = useState(
    product.attributes.sellingPrice?
    product.attributes.sellingPrice:
    product.attributes.mrp
);


const jwt = typeof window !== 'undefined' ? sessionStorage.getItem('jwt') : null;
const user = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')) : null;

// const jwt=getCookie('jwt');

// let user = ''

// try{
    
//     user=JSON.parse(getCookie('user'));

// }catch(e){

// }


// 장바구니에 상품 담기
const router=useRouter();

const addToCart = () => {

  setLoading(true)

  if(!jwt){
    router.push('/sign-in');
    setLoading(false);
    return;
  }
  const data = {
    data:{
      quantity : quantity,
      amount : quantity * productTotalPrice,
      products : product.id,
      users_permissions_users: user.id,
      userId : user.id
    }
  }
  console.log(data);
  
  GlobalApi.addToCart(data,jwt).then(res => {
    console.log(res);
    toast('added to cart');
    setUpdateCart(!updateCart);
    setLoading(false);
  },(e) => {
    toast('error while adding into cart');
    setLoading(false);
  })

}



  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-primary'>
      <Image 
        src={product?.attributes?.images.data.attributes.url}
        width={300}
        height={300}
        alt='상품 이미지'
      />
        <div className='flex flex-col gap-3'>
        <h2 className='text-2xl font-bold'>
          {product.attributes.name}
        </h2>
        <h2 className='text-sm text-gray-500'>
          {product.attributes.discription}
        </h2>
        <div className='flex gap-3 items-center'>
          <h2 className='font-bold text-2xl text-red-600 '>
             {product.attributes.sellingPrice}
            <span className='text-black font-normal m-1 font-sm'>won</span>
          </h2>

        <h2 className={`font-bold text-xl ${product.attributes.sellingPrice&&'line-through text-gray-500'}`}>
          {product.attributes.mrp}
          </h2>  
        </div>
        <h2 className='font-medium text-lg'>
          {product.attributes.itemQuantityType}
        </h2>
        <div className='flex flex-col items-baseline gap-3'>
          <div className='flex gap-3 items-center'>
            <div className='p-2 border flex gap-10 tiems-center px-5'>
              <button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity-1)}
              > 
                - 
              </button>
              <h2>
                {quantity}
              </h2>
              <button
                onClick={() => setQuantity(quantity+1)}
              >
                +
              </button>
            </div>
            <h2 className='text-2xl font-bold text-black'>
                = {(quantity*productTotalPrice)}
            </h2>
          </div>
          <Button className="flex gap-3"
            onClick = {() => addToCart() }
            disabled = {loading}
          >
            <ShoppingBasket />
            {loading
             ? <LoaderCircle className='animate-spin'/>
             :'Add to Cart' 
            }
          </Button>
        </div>
        <h2 className='font-bold'>
          <span className='mr-2'>
            Category : 
          </span>
          {/* <Link href={'/products-category/'+category.attributes.name}> */}
           {product.attributes.categories.data[0].attributes.name}
       
         
        </h2>
      </div>
    </div>
    
  )
}

export default ProductItemDetail
