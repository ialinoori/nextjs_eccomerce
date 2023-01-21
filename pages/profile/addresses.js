import Layout from "@/components/profile/Layout";
import Loaidng from "@/components/profile/Loaidng";
import axios from "axios";
import { handleError } from "lib/helper";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import Create from "@/components/profile/address/Create";
import Edit from "@/components/profile/address/Edit";

const ProfileAddressPage = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/profile/addresses`
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
      <Create provinces={data.provinces} cities={data.cities} />
      <hr />
      {data.addresses.map((address,index)=>(
        <Edit key={index} address={address} provinces={data.provinces} cities={data.cities}  />

      ))}
      
    </Layout>
  );
};

export default ProfileAddressPage;
