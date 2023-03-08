import React from "react";
import Image from "next/image";
import { numberFormat } from "lib/helper";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/cart/action";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(removeFromCart(product.id));
    dispatch(addToCart(product, 1));
    toast.success("محصول با موفقیت به سبد خرید افزوده شد");
  };
  return (
    <div className="box">
      <div>
        <div className="img-box">
          <Image
            className="img-fluid"
            src={product.primary_image}
            width={366}
            height={244}
            placeholder="blur"
            blurDataURL={product.primary_image_blurDataURL}
            layout="responsive"
            alt="img"
          />
        </div>
        <div className="detail-box">
          <h5>
            <Link href={`/products/${product.slug}`}>{product.name} </Link>{" "}
          </h5>
          <p>{product.description}</p>
          <div className="options">
            <h6>
              {product.is_sale ? (
                <>
                  <span>{numberFormat(product.sale_price)}</span>
                  <del className="me-1">{numberFormat(product.price)}</del>
                </>
              ) : (
                <span>{numberFormat(product.price)}</span>
              )}
            </h6>
            <button onClick={handleAddToCart}>
              <i className="bi bi-cart-fill text-white fs-5"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
