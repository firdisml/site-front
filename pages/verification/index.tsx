import React, { useState } from "react";
import DashboardLayout from "../../layout/layout.dashboard";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import axios from "axios";
import { fetcher } from "../../utils/fetcher/fetcher";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { PersistFormikValues } from "formik-persist-values";
import Image from "next/image";
import { useRouter } from "next/router";

function Index({ user }: any) {
  const router = useRouter();
  const [is_submitting, set_is_submitting] = useState(false);

  console.log(user)

  return (
    <DashboardLayout user={user}>
        Test
    </DashboardLayout>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { req, res } = ctx;
  const [error, user] = await fetcher(
    req,
    res,
    "http://localhost:3000/user/fetch"
  );

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  if (!user) return { redirect: { statusCode: 307, destination: "/signin" } };

  console.log(user);

  return { props: { user } };
};
