import axios from "axios";
import { handleError } from "lib/helper";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";





const Create = ({ provinces, cities }) => {
  const [loading, setLoading] = useState();
  const {mutate}=useSWRConfig();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/profile/addresses/create`,
        {
          data,
        }
      );

      toast.success("ایجاد ادرس جدید با موفقیت انجام شد");
      mutate(`${process.env.NEXT_PUBLIC_APP_API_URL}/profile/addresses/create`)
     
    } catch (err) {
      toast.error(handleError(err));
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        ایجاد آدرس جدید
      </button>
      <div className="collapse mt-3" id="collapseExample">
        <form onSubmit={handleSubmit(onSubmit)} className="card card-body">
          <div className="row g-4">
            <div className="col col-md-6">
              <label className="form-label">عنوان</label>
              <input
                {...register("title", { required: "عنوان الزامی است" })}
                type="text"
                className="form-control"
              />
              <div className="form-text text-danger">
                {errors.title?.message}
              </div>
            </div>
            <div className="col col-md-6">
              <label className="form-label">شماره تماس</label>
              <input
                {...register("cellphone", {
                  required: "شماره تماس الزامی است",
                  pattern: {
                    value: /^(\+98|0)?9\d{9}$/i,
                    message: "شماره تماس معتبر نمیباشد",
                  },
                })}
                type="text"
                className="form-control"
              />
              <div className="form-text text-danger">
                {errors.cellphone?.message}
              </div>
            </div>
            <div className="col col-md-6">
              <label className="form-label">کد پستی</label>
              <input
                {...register("postal_code", {
                  required: " کد پستی الزامی است",
                  pattern: {
                    value: /^\d{5}[ -]?\d{5}$/i,
                    message: " کد پستی معتبر نمیباشد",
                  },
                })}
                type="text"
                className="form-control"
              />
              <div className="form-text text-danger">
                {errors.postal_code?.message}
              </div>
              <div className="col col-md-6">
                <label className="form-label">استان</label>
                <select
                  {...register("province_id", { required: "استان الزامی است" })}
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue=""
                >
                  <option disabled value="">
                    انتخاب استان
                  </option>
                  {provinces.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="form-text text-danger">
                  {errors.province_id?.message}
                </div>
                <div className="col col-md-6">
                  <label className="form-label">شهر</label>
                  <select
                    {...register("city_id", { required: "شهر الزامی است" })}
                    defaultValue=""
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option disabled value="">
                      انتخاب شهر
                    </option>
                    {cities
                      .filter(
                        (item) => item.province_id == watch("province_id")
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  <div className="form-text text-danger">
                    {errors.city_id?.message}
                  </div>
                </div>
                <div className="col col-md-12">
                  <label className="form-label">آدرس</label>
                  <textarea
                    {...register("address", { required: "ادرس  الزامی است" })}
                    type="text"
                    rows="5"
                    className="form-control"
                  ></textarea>
                  <div className="form-text text-danger">
                    {errors.address?.message}
                  </div>
                </div>
              </div>
              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-primary mt-4"
                >
                  ایجاد
                  {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
