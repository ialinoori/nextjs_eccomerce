import Product from "@/components/product/Product";
import axios from "axios";
import { handleError, numberFormat, salePercent } from "lib/helper";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductPage = ({ product, error,randomProduct }) => {
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    error && toast.error(error);
  }, []);
  return (
    <>
      {product && (
        <section className="single_page_section layout_padding">
          <div className="container">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <div className="row gy-5">
                  <div className="col-sm-12 col-lg-6">
                    <h3 className="fw-bold mb-4">{product.name} </h3>
                    <h5 className="mb-3">
                      {product.is_sale ? (
                        <>
                          <span>{numberFormat(product.sale_price)}</span>
                          <del className="me-1">
                            {numberFormat(product.price)}
                          </del>
                        </>
                      ) : (
                        <span>{numberFormat(product.price)}</span>
                      )}
                      <span>تومان</span>
                      {product.is_sale && (
                        <div className="text-danger fs-6">
                          {salePercent(product.price, product.sale_price)}
                        </div>
                      )}
                    </h5>
                    <p>{product.description}</p>

                    <div className="mt-5 d-flex">
                      <button className="btn-add">افزودن به سبد خرید</button>
                      <div className="input-counter ms-4">
                        <span
                          className="plus-btn"
                          onClick={() =>
                            quantity < product.quantity &&
                            setQuantity((preQty) => preQty + 1)
                          }
                        >
                          +
                        </span>
                        <div className="input-number">{quantity}</div>
                        <span
                          onClick={() =>
                            quantity > 1 && setQuantity((preQty) => preQty - 1)
                          }
                          className="minus-btn"
                        >
                          -
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-6">
                    <div
                      id="carouselExampleIndicators"
                      className="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-indicators">
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to="0"
                          className="active"
                          aria-current="true"
                          aria-label="Slide 1"
                        ></button>

                        {product.images.map((image, index) => (
                          <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={index + 1}
                            aria-label="Slide 2"
                          ></button>
                        ))}
                      </div>
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <Image
                            src={product.primary_image}
                            className="d-block w-100"
                            placeholder="blur"
                            blurDataURL={product.primary_image_blurDataURL}
                            width={464}
                            height={309}
                            layout="responsive"
                            alt="primary_iamge"
                            priority={true}
                          />
                        </div>
                        {product.images.map((image, index) => (
                          <div key={index} className="carousel-item">
                            <Image
                              src={image.image}
                              className="d-block w-100"
                              alt="img"
                              layout="responsive"
                              width={464}
                              height={309}
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <hr />

      {
        randomProduct &&   <section className="food_section my-5">
        <div className="container">
          <div className="row gx-3">
         {randomProduct.map((product,index)=>(
               <div key={index} className="col-sm-6 col-lg-3">
            <Product product={product}/>
             </div>

         ))}
          </div>
        </div>
      </section>
      }
    
    </>
  );
};

export default ProductPage;
export async function getServerSideProps({ query }) {
  try {
    const res = await axios.get(`/products/${encodeURI(query.slug)}`);

    const resRand = await axios.get("/random-products?count=4");

    return {
      props: {
        product: res.data.data,
        randomProduct:resRand.data.data
      },
    };
  } catch (err) {
    return {
      props: {
        error: handleError(err),
      },
    };
  }
}
