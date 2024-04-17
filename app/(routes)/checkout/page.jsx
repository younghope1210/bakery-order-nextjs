"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import GlobalApi from '@/app/_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowBigRight } from 'lucide-react';
import { PayPalButtons } from '@paypal/react-paypal-js';
// import { getCookie } from 'cookies-next';

function Checkout() {

  const[subtotal,setSubTotal] = useState(0);
  const[totalCartItem, setTotalCartItem]  = useState(0);
  const[cartItemList, setCartItemList] = useState([]);


  const [username,setUsername]=useState();
  const [email,setEmail]=useState();
  const [phone,setPhone]=useState();
  const [zip,setZip]=useState();
  const [address,setAddress]=useState();

  const[totalAmount, setTotalAmount] = useState(0);

  const jwt = typeof window !== 'undefined' ? sessionStorage.getItem('jwt') : null;
  const user = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')) : null;

  // const jwt=getCookie('jwt');

  // let user = ''
    
  //   try{
        
  //       user=JSON.parse(getCookie('user'));

  //   }catch(e){

  //   }


  const router = useRouter();
  

  useEffect(() => {
    if(!jwt){

      router.push('/sign-in');

    }
    getCartItems();

},[])

useEffect(() => {

  let total = 0;
  cartItemList.forEach(element => {

      total = total + element.amount
      
  });
  setSubTotal(total)
},[cartItemList])
  

useEffect(()=>{
  let total = 0;
  cartItemList.forEach(element => {
      total = total + element.amount
  });
  setTotalAmount(total * 0.9 + 4000);
  setSubTotal(total);
},[cartItemList])
  
  //  장바구니 상품 불러오기

    const getCartItems = async () => {

      const cartList = await GlobalApi.getCartItems(user.id, jwt);
      console.log(cartList);
      setTotalCartItem(cartList.length);
      setCartItemList(cartList);
  }
  
  const calculateTatalAmount = () => {

    const totalAmount = subtotal * 0.9 + 4000;
 
    return totalAmount;
  }

  const onApprove = (data) => {
    console.log(data);

    const payload = {
      data:{
        paymentId:(data.paymentId).toString(),
        totalOrderAmount:totalAmount,
        username:username,
        email:email,
        phone:phone,
        zip:zip,
        address:address,
        orderItemList:cartItemList,
        userId:user.id 
      }
    }
    GlobalApi.createOrder(payload,jwt).then(res => {
      toast('Order Places Successfully!');

      cartItemList.forEach(item => {
      
        GlobalApi.deleteCartItem(item.id, jwt).then(res => {
          toast('장바구니 상품이 모두 결제되었습니다');
        
        })
      })
      
      window.location.replace('/order-confirmation');
    })
  }





  return (
    <div className=''>
       <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>
          Checkout
       </h2>
         <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8'>
            <div className='md:col-span-2 mx-20'>
              <h2 className='font-bold text-3xl'>
                Billing Details
              </h2>
              <div className='grid grid-cols-2 gap-10 mt-3'>
                  <Input placeholder='Name' onChange = {(e) => setUsername(e.target.value)} />
                  <Input placeholder='Email'onChange = {(e) => setEmail(e.target.value)}/>
              </div>
              <div className='grid grid-cols-2 gap-10 mt-3'>
                  <Input placeholder='Phone' onChange = {(e) => setPhone(e.target.value)} />
                  <Input placeholder='Zip' onChange = {(e) => setZip(e.target.value)}/>
              </div>
              <div className='mt-3'>
                  <Input placeholder='Address' onChange = {(e) => setAddress(e.target.value)} />
              </div>
            </div>
            <div className='mx-10 border'>
              <h2 className='p-3 bg-gray-200 font-old text-center'>
                Total Cart 
                (<span className='text-red-600'>{totalCartItem}</span>)
              </h2>
              <div className='p-4 flex flex-col gap-4'>
                <h2 className='font-bold flex justify-between'>
                  Subtotal : <span > {subtotal} (원)  </span>
                </h2>
                <hr></hr>
                <h2 className='flex justify-between'>
                  Delivery : <span> 4000(원) </span>
                </h2>
                <h2 className='flex justify-between'>
                  Tax (9%) : <span> {totalCartItem * 0.9} (원) </span>
                </h2>
                <hr></hr>
                <h2 className='font-bold flex justify-between item-center'>
                  Total: <span className='text-red-600 item-center'>{calculateTatalAmount()}(원)</span>
                </h2>
                  <Button className='item-center' onClick={() => onApprove({paymentId:123})}>
                    Payment <ArrowBigRight/>
                  </Button>
                  {totalAmount > 15 && <PayPalButtons 
             disabled={!(username && email && address && zip)}
             style={{ layout: "horizontal" }} 
                  onApprove={onApprove}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: totalAmount,
                              currency_code: 'USD'
                            }
                          }
                        ]
                      })
                    }}
                  
                  />}
                  
              </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout
