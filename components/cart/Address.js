import { handleError } from "lib/helper";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import Loaidng from "../profile/Loaidng";

const Address = ({setAddressId}) => {
  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/cart/address`
  );

  if (error) {
    toast.error(handleError(error));
  }

  if (!data)
    return <div className="spinner-border spinner-border-sm ms-2"></div>;

  return (
    <>
   
     {
        data.length != 0 ? (
            <>
            <div>انتخاب آدرس</div>
            <select
            onChange={(e)=>setAddressId(e.target.value)}
              style={{ width: "200px" }}
              className="form-select ms-3"
              aria-label="Default select example"
              defaultValue=""
            >
              <option value="">انتخاب ادرس</option>
              {data.map((item) =>(
       <option key={item.id} value={item.id}>{item.title}</option>
              ))}
             
             
            </select>
       
            </>
        
        ) :(
            <Link href="/profile/addresses" className="btn btn-primary">
            ایجاد آدرس
          </Link>
        )
     }
     </>
   
  );
};

export default Address;
