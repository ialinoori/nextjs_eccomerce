import Layout from "@/components/profile/Layout";
import Loaidng from "@/components/profile/Loaidng";
import axios from "axios";
import { handleError, numberFormat } from "lib/helper";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import Create from "@/components/profile/address/Create";
import Edit from "@/components/profile/address/Edit";
import Image from "next/image";

const ProfileOrderPage = () => {
  const [pageIndex,setPageIndex]= useState(0);
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/profile/orders?page=${pageIndex}`
  );
  console.log(data);

  if (error) {
    toast.error(handleError(error));
  }

  if (!data)
    return (
      <Layout>
        <Loaidng />
      </Layout>
    );

  return (
    <Layout>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>شماره سفارش</th>
              <th>آدرس</th>
              <th>وضعیت</th>
              <th>وضعیت پرداخت</th>
              <th>قیمت کل</th>
              <th>تاریخ</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map((order) => (
              <tr key={order.id}>
                <th>{order.id}</th>
                <td>{order.address_title}</td>
                <td>{order.status}</td>
                <td>
                  <span
                    className={
                      order.payment_status == "موفق"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {order.payment_status}{" "}
                  </span>
                </td>
                <td>{numberFormat(order.paying_amount)} تومان</td>
                <td>{order.created_at}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={`#modal-${order.id}`}
                  >
                    محصولات
                  </button>
                  <div className="modal fade" id={`modal-${order.id}`}>
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h6 className="modal-title">
                            محصولات سفارش شماره {order.id}
                          </h6>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <table className="table align-middle">
                            <thead>
                              <tr>
                                <th>محصول</th>
                                <th>نام</th>
                                <th>قیمت</th>
                                <th>تعداد</th>
                                <th>قیمت کل</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.order_items.map((item) => (
                                <tr key={item.id}>
                                  <th>
                                    <Image
                                      src={item.product_primary_image}
                                      layout="responsive"
                                      width={80}
                                      height={53}
                                      alt="primary"
                                    />
                                  </th>
                                  <td className="fw-bold">
                                    {item.product_name}
                                  </td>
                                  <td>{numberFormat(item.price)} تومان</td>
                                  <td>{item.quantity}</td>
                                  <td>{numberFormat(item.subtotal)} تومان</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="d-flex justify-content-center mt-5">
        <ul className="pagination">
          {
            data.meta.links.slice(1, -1).map((link, index) => (
              <li
                key={index}
                className={link.active ? "page-item active" : "page-item"}
              >
                <button
                onClick={()=>setPageIndex(link.label)}
                  
                  className="page-link"
                >
                  {link.label}
                </button>
              </li>
            ))}
        </ul>
      </nav>
    </Layout>
  );
};

export default ProfileOrderPage;
