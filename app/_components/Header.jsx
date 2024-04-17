"use client"
import { Button } from '@/components/ui/button'
import {  CircleUserRoundIcon, LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UpdateCartContext } from '../_context/UpdateCartContext'
import CartItemList from './CartItemList'
import { toast } from 'sonner'
import { deleteCookie, getCookie } from 'cookies-next'

// dropdown

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"


function Header() {


    const[subtotal,setSubTotal] = useState(0);
    const[categoryList, setCategoryList] = useState([]);
    const[totalCartItem, setTotalCartItem]  = useState(0);
    const[cartItemList, setCartItemList] = useState([]);

    const isLogin = typeof window !== 'undefined' ? sessionStorage.getItem('jwt') : null;
    const jwt = typeof window !== 'undefined' ? sessionStorage.getItem('jwt') : null;
    const user = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')): null;
  
    
    // const isLogin = getCookie('jwt') ? true : false;
    // const jwt=getCookie('jwt');
    
    // let user = ''
    
    // try{
        
    //     user=JSON.parse(getCookie('user'));

    // }catch(e){

    // }

   
    const {updateCart,setUpdateCart} = useContext(UpdateCartContext);


    const router = useRouter();
    
    // cart 리스트 가져오기
    useEffect(() => {

        GetCategoryList();
    
    },[])
    
    // 
    useEffect(() => {
       
        getCartItems();
    
    },[updateCart])

    useEffect(() => {

        let total = 0;
        cartItemList.forEach(element => {

            total = total + element.amount
            
        });
        setSubTotal(total)
    },[cartItemList])

// 카테고리 리스트 불러오기
    const GetCategoryList = () => {

        GlobalApi.getCategory().then(res => {
            console.log("categoryList:",res.data.data);
            setCategoryList(res.data.data);
        })

    }



    const getCartItems = async() => {
       
        const shopBasketInfo = await GlobalApi.getCartItems(user?.id,jwt);
        console.log('shopBasketInfo:', shopBasketInfo);
        setTotalCartItem(shopBasketInfo.length);
        setCartItemList(shopBasketInfo);
    }

    const onSignOut = () => {
        
        // sessionStorage.clear('jwt');
        // sessionStorage.clear('user');

        deleteCookie('jwt')
        deleteCookie('user')

        router.push('/sign-in')

   
    }

    //장바구니 상품 삭제

    const onDeleteItem = (id) => {
        GlobalApi.deleteCartItem(id, jwt).then(res => {
            toast('담긴 상품이 삭제되었습니다');
            getCartItems();
        })
    }

  return (
    <div className='p-5 shadow-sm flex justify-between '>
         {/* left menu */}
        <div className='flex items-center gap-8 '>
            {/*  스토어 로고 */}
            <Link href={'/'} >
              <h1 className='text-2xl text-primary font-bold cursor-pointer'>BROWN BAKERY</h1>
           </Link>
           

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <h2 className='hidden md:flex gap-2 items-center border rounded-full p-2 px-10  cursor-pointer'>
                    <LayoutGrid className='h-5 w-5'/> 
                    Category
                </h2>

                </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel className=" text-center">Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                            {categoryList?.map((category, id) => (
                            <Link href={'/products-category/'+category.attributes.name} key={id}>
                                <DropdownMenuItem  className="flex gap-4 items-center cursor-pointer px-4 py-2"> 
                                
                                        <Image src={category?.attributes?.icon.data.attributes.url} 
                                        alt='icon'
                                        width={20}
                                        height={20}
                                        />
                                        <h2>
                                            {category?.attributes?.name}
                                        </h2>
                                    
                                </DropdownMenuItem>
                             </Link>  
                           ))}

                    </DropdownMenuContent>
            </DropdownMenu>

            <div className=' md:flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
                <Search />
                <input 
                  type='text' 
                  placeholder='Search...' 
                  className='outline-none'    
                />
            </div>
        </div> 

        {/* right menu */}
        <div className='flex gap-5 items-center justify-end'>

            {/* 장바구니  */}

            <Sheet>
                <SheetTrigger>

                    <h2 className='flex gap-2 items-center text-lg'>
                        <ShoppingBag className='h-7 w-7' />
                        <span
                            className='bg-primary text-white px-2 rounded-full'
                        >
                            {totalCartItem}
                        </span>
                    </h2>

                    </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle
                        className=" mt-5 bg-primary text-white font-bold text-lg p-2">
                            My Cart
                        </SheetTitle>
                    </SheetHeader>
                    {/* 장바구니 리스트 출력 */}
                    <SheetDescription className="">
                        <CartItemList 
                            cartItemList={cartItemList} 
                            onDeleteItem={onDeleteItem}
                        />
                    </SheetDescription>
                    <SheetClose asChild>
                        <div className='absolute w-[90%] bottom-6 flex flex-col'>
                            <h2 className='text-lg font-bold flex justify-between'>Subtotal 
                            <span>${subtotal}</span></h2>
                            <Button 
                            disabled={cartItemList.length==0}
                            onClick={() => router.push(jwt?'/checkout':'/sign-in')}>Checkout</Button>
                        </div>
                    </SheetClose>
                    </SheetContent>
            </Sheet>

            {/* 로그인 로그아웃 */}
            {!isLogin
                ? <Link href={'/sign-in'}> 
                    <Button > Login </Button>
                </Link>
                :
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <CircleUserRoundIcon className='h-8 w-8 bg-green-100  rounded-full cursor-pointer'/>
                    </DropdownMenuTrigger> 
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            My Account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem>
                            Profile
                        </DropdownMenuItem> */}
                    <Link href={'/my-order'} >
                        <DropdownMenuItem className='cursor-pointer'>
                            My Order
                        </DropdownMenuItem>
                    </Link>
                        <DropdownMenuItem onClick={() => onSignOut()} className='cursor-pointer'>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>       
            }   
            
        </div>
    
    </div>
    
  )
}

export default Header
