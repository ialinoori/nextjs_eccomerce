import axios from "axios";
import { handleError } from "lib/helper";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";





const Delete = ({id }) => {
  const [loading, setLoading] = useState();
  const {mutate}=useSWRConfig();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/profile/addresses/delete`,
        {
          address_id:id
        }
      );

      toast.success("حذف ادرس با موفقیت انجام شد");
      mutate(`${process.env.NEXT_PUBLIC_APP_API_URL}/profile/addresses`)
     
    } catch (err) {
      toast.error(handleError(err));
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
              <button
                disabled={loading}
                onClick={handleDelete}
                className="btn btn-dark "
              >
               حذف
                {loading && (
                  <div className="spinner-border spinner-border-sm ms-2"></div>
                )}
              </button>
 
    </>
  );
};

export default Delete;
