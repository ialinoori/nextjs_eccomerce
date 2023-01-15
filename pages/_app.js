import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css"
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Footer from "@/components/layout/Footer";
import Router from "next/router";
import nProgress from "nprogress";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;


Router.events.on("routeChangeComplete",()=>nProgress.start());
Router.events.on("routeChangeComplete",()=>nProgress.done());

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap.bundle.js")

  },[])
  return (
    <>
    <Header/>
    <Component {...pageProps} />
    <Footer/>
    <ToastContainer/>

    </>
  )
}

export default MyApp
