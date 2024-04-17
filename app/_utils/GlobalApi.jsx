const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY

const axiosClient = axios.create({
   
    baseURL:'https://bakery-app-backend-admin.onrender.com/api',
    headers:{
      'Authorization':`Bearer ${API_KEY}`
    }
  })

  // 상단 카테고리 메뉴 불러오기 

  const getCategory= () => axiosClient.get('/categories?populate=*');

  //  메인 슬라이드 이미지 불러오기 
  const getSliders = () => axiosClient.get('/sliders?populate=*').then( res => {
    
    return res.data.data;
});

//  메인 섹션 카테고리 아이콘 불러오기
const getCategoryList= () => axiosClient.get('/categories?populate=*').then(res => {
  return res.data.data;
});

// 메인 섹션 인기 상품 가져오기

const getAllProudcts = () => axiosClient.get('/products?populate=*').then(res => {
  return res.data.data;
});


// 카테고리별 페이지 불러오기

const getProductsByCategory = (category) => axiosClient.get('/products?filters[categories][name][$in]='+category+'&populate=*')
.then(res => {
  return res.data.data
});

// 로그인

const registerUser = (username,email,password) => axiosClient.post('/auth/local/register',{
  
  username:username,
  email:email,
  password:password

});

const SignIn = (email,password) => axiosClient.post('/auth/local', {
  
  identifier:email,
  password:password

});

const addToCart = (data, jwt) => axiosClient.post('/usercarts', data, {
  headers:{
    Authorization : 'Bearer' + jwt
  }
});

// usercarts?fillters[usedrId][$eq]=8&populate=*
// /usercarts?fillters[usedrId][$eq]='+userId+'&populate=*


const getCartItems = (userId, jwt) => axiosClient.get('/usercarts?fillters[usedrId][$eq]='+userId+'&[populate][products][populate][images][populate][0]=url',
{
    headers:{
        Authorization:'Bearer' + jwt
    }
}).then(res => {
    const data = res.data.data;
    const cartItemsList = data.map((item,index)=>({
      name:item.attributes.products?.data[0].attributes.name,
      quantity:item.attributes?.quantity,
      amount:item.attributes?.amount,
      image:item.attributes?.products?.data[0].attributes.images.data.attributes.url,
      actualPrice:item.attributes?.products?.data[0].attributes.mrp,
      id:item.id,
      product:item.attributes?.products?.data[0].id
    }))
    
    console.log('data**:', data);
    return cartItemsList;
});




const deleteCartItem = (id, jwt) => axiosClient.delete('/usercarts/' + id, {
  headers:{
      Authorization:'Bearer '+ jwt
  }
});


const createOrder = (data,jwt) => axiosClient.post('/orders',data,{
  headers:{
      Authorization:'Bearer '+ jwt
  }
});

const getMyOrder = (userId,jwt) => axiosClient.get('/orders?filters[userId][$eq]='+userId+'&populate[orderItemList][populate][product][populate][images]=url')
.then(res => {
    const responce = res.data.data;
    const orderList = responce.map(item => ({
      id:item.id,
      totalOrderAmount:item.attributes.totalOrderAmount,
      paymentId:item.attributes.paymentId,
      orderItemList:item.attributes.orderItemList,
      createdAt:item.attributes.createdAt,
      status:item.attributes.Status
    }));

    return orderList;
})


  export default{
    getCategory,
    getSliders,
    getCategoryList,
    getAllProudcts,
    getProductsByCategory,
    registerUser,
    SignIn,
    addToCart,
    getCartItems,
    deleteCartItem,
    createOrder,
    getMyOrder,
}
