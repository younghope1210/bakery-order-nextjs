import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Collection from "./_components/Collection";


export default async function Home() {

  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProudcts();


  return (
    
    <div className="p-10 px-5 md:px-16">
      {/* 슬라이더 */}
      <Slider sliderList={sliderList} />
      {/* 카테고리 리스트 */}
      <CategoryList categoryList={categoryList} />
      {/* 인기상품 노출 */}
      <ProductList productList={productList} />
      {/* 상품 컬렉션 */}
      <Collection productList={productList} />
     
    </div>

  );
}
