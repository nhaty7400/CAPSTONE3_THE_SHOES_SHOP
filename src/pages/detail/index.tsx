import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "src/services/product.service";
import { IProduct } from "./detail.type";
import ListCard from "src/components/list-card";
import css from "./detail.module.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "src/redux/slices/product.slice";
import SizeButton from "./size-button";
import { checkLocalStorage } from "src/utils";
import { ACCESS_TOKEN } from "src/constants";

type TParams = {
  productId: string;
};


function Detail() {
  const params = useParams<TParams>();
  const [productItem, setProductItem] = useState<IProduct>();
  const navigate=useNavigate();

  

  useEffect(() => {
    if (!params.productId) return;

    getProductById(params.productId)
      .then((resp) => {
        setProductItem(resp.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.productId]);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [params.productId]);

  const dispatch = useDispatch();

  return (
    <div>
      <div className={css["container"]}>
        
          <img className={css["product-img"]}
            src={productItem?.image}
            alt=""
          />
        
        <div className={css["product-content"]}>
          <p className={css["product-title"]}>{productItem?.name}</p>
          <p className={css["product-desc"]}>{productItem?.description}</p>
          <span className={css["text"]}>Available size</span>
          <div className={css["product-size-group"]}>
            {productItem?.size.map((size,index)=>{
              return <SizeButton key={index} size={size}/>
            })}
          </div>
          <p className={css["product-price"]}>{productItem?.price}$</p>
          <button
            onClick={() => {
              const item={
                id:productItem?.id,
                name:productItem?.name,
                img:productItem?.image,
                price:productItem?.price,
                quantity:1,
              }
              const action = addToCart(item);
              dispatch(action);
            }}
            className={css["product-action-add"]}
          >
            Add to cart
          </button>
        </div>
      </div>
      <div className={css["related-product"]}>
        <h2 className={css["title"]}>- Related Products -</h2>
        <div className={css["container"]}>
          {productItem?.relatedProducts && (
            <ListCard list={productItem.relatedProducts} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
