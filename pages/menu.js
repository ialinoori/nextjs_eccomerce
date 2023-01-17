import Product from "@/components/product/Product";
import axios from "axios";
import { handleError } from "lib/helper";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const MenuPage = ({ products, categories, error }) => {
  const [productList, setProductList] = useState(products);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleFilter = async (value) => {
    console.log(value);
    try {
      setLoading(true);
      const res = await axios.get(
        `/menu?${new URLSearchParams(value).toString()}`
      );
      setProductList(res.data.data);
      router.push( `/menu?${new URLSearchParams(value).toString()}`,undefined,{shallow:true})
    } catch (err) {
      toast.error(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="food_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <div>
              <label className="form-label">جستجو</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="نام محصول ..."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <a href="#" className="input-group-text" id="basic-addon2">
                  <i className="bi bi-search"></i>
                </a>
              </div>
            </div>
            <hr />
            <div className="filter-list">
              <div className="form-label">دسته بندی</div>
              <ul>
                {categories?.map((category, index) => (
                  <li key={index} className="my-2 cursor-pointer ">
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div>
              <label className="form-label">مرتب سازی</label>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label
                  className="form-check-label cursor-pointer"
                  for="flexRadioDefault1"
                >
                  بیشترین قیمت
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="flexRadioDefault2"
                >
                  کمترین قیمت
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault3"
                  checked
                />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="flexRadioDefault3"
                >
                  پرفروش ترین
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault4"
                  checked
                />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="flexRadioDefault4"
                >
                  با تخفیف
                </label>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="col-sm-12 col-lg-9">
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="spinner-border"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="col-sm-12 col-lg-9">
                <div className="row gx-3">
                  {productList.products.map((product, index) => (
                    <div key={index} className="col-sm-6 col-lg-4">
                      <Product product={product} />
                    </div>
                  ))}
                </div>
                <nav className="d-flex justify-content-center mt-5">
                  <ul className="pagination">
                    {products.meta.links.slice(1, -1).map((link, index) => (
                      <li
                        key={index}
                        className={
                          link.active ? "page-item active" : "page-item"
                        }
                      >
                        <button
                          onClick={() => handleFilter({ page: link.label })}
                          className="page-link"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuPage;

export async function getServerSideProps({resolvedUrl}) {
  try {
    const res = await axios.get(`${resolvedUrl}`);
    const resCate = await axios.get("categories");

    return {
      props: {
        products: res.data.data,
        categories: resCate.data.data,
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
