import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import Features from "@/components/Features";
import ProductsTab from "@/components/product/ProductsTab";
import axios from "axios";
import { handleError } from "lib/helper";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "react-toastify";
import styles from "../styles/Home.module.css";

const Home = ({ productsTab, error }) => {
  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  return (
    <>
      <Features />
      {productsTab && <ProductsTab tabs={productsTab} />}
      <About/>
      <section className="book_section layout_padding">
        <div className="container">
            <div className="heading_container">
                <h2>
                    تماس با ما
                </h2>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form_container">
                       <ContactForm/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="map_container ">
                        {/* <div id="map" style="height: 345px;"></div> */}
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const res = await axios.get("/products/products-tabs");

    return {
      props: {
        productsTab: res.data.data,
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
