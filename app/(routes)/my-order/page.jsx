"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MyOrderItem from './_components/MyOrderItem';
import moment from 'moment';
// import { getCookie } from 'cookies-next';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"



function MyOrder() {

  const [orderList,setOrderList]=useState([]);


    const jwt = typeof window !== 'undefined' ? sessionStorage.getItem('jwt') : null;
    const user = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')): null;

  // const jwt=getCookie('jwt');
    
  // let user = ''
  
  // try{
      
  //     user=JSON.parse(getCookie('user'));

  // }catch(e){

  // }
 
  const router = useRouter();

  useEffect(() => {

    if(!jwt){
      router.replace('/');
    };
    getMyOrder();

  }, []);

  const getMyOrder = async() => {

    const orderLists = await GlobalApi.getMyOrder(user.id, jwt);
    console.log(orderLists);
    setOrderList(orderLists);
  }

  return (
    <div>
          <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>My Order</h2>
            <div className='py-8 mx-7 md:mx-20'>
                <h2 className='text-3xl font-bold text-primary'>Order History</h2>
               <div className='mt-10 w-[80%] '>

              {orderList.map((item,index)=>(
                <Collapsible key={index}>
                <CollapsibleTrigger className='w-full'>
                    <div className='border p-2 bg-slate-100 gap-24 flex '>
                        <h2><span className='font-bold mr-2'>Order Date: </span>{moment(item?.attributes?.createdAt).format('DD/MMM/yyy')}</h2>
                        <h2><span className='font-bold mr-2'>Total Amount:</span> {item?.totalOrderAmount}</h2>
                        <h2><span className='font-bold mr-2'>Status:</span> {item?.status}</h2>
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                   {item.orderItemList.map((order,id)=>(
                    <MyOrderItem orderItem={order} key={id} />
                   ))}
                </CollapsibleContent>
                </Collapsible>
              ))}
               
                </div>
            </div>
    </div>
  )
}

export default MyOrder
