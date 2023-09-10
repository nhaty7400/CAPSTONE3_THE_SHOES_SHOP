import { useEffect } from "react";
import { getAllProduct } from "src/services/product.service";
import HomeCarousel from "./home-carousel";
import ProductFeature from "./product-feature";
import { axiosWithoutAuth } from "src/services/config.service";
import { useAppSelector } from "src/redux/config-store";

// useSelector: lấy store từ trên redux về
// useDispatch: set lại state trên redux
import { useSelector, useDispatch } from "react-redux";
import { setListProduct } from "src/redux/slices/product.slice";

function Home() {
  // call https://shop.cyberlearn.vn/api/Product
  const listProduct = useAppSelector((state) => {
    return state.productReducer.listProduct;
  });

  const dispatch = useDispatch();

  console.log({ listProduct });

  useEffect(() => {
    // getAllProduct().then((resp)=>{
    //   console.log(resp);
    // })

    // useEffect không cho sử dụng async trực tiếp mà nên tạo 1 hàm và gọi nó sau đó.
    // Cách 1: mong muốn sử dụng async await - tạo function

    // const get = async () => {
    //   const resp = await getAllProduct();
    //   console.log(resp);
    // };

    // getAllProduct là function async nên giá trị trả về luôn là một promise
    // get();

    // cách 2: mong muốn sử dụng async await - IIFE
    (async () => {
      const resp = await getAllProduct();

      const action = setListProduct(resp.content);

      dispatch(action);
    })();
  }, []);

  return (
    <div>
      <HomeCarousel />
      <ProductFeature />
    </div>
  );
}

export default Home;
