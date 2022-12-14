import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/layout.dashboard";
import { CheckIcon } from "@heroicons/react/solid";
import axios from "axios";
import Skeleton from "./component/skeleton";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import { fetcher } from "../../utils/fetcher/fetcher";
import Router from "next/router";

function Index({user}:any) {
  const [products, setProducts] = useState<any>();
  useEffect(() => {
    const fetch_product = async () => {
      const product = await axios.get(
        "http://localhost:3000/product/employer/product",
        { withCredentials: true }
      );
      setProducts(product.data);
    };
    fetch_product();
  }, []);

  async function handleBuy(
    product_id:string,
    product_name: string,
    product_api: string,
    product_price: string,
    product_credit_value: string,
  ) {
    const buy: any = await axios.post(
      "http://localhost:3000/payment/employer/checkout",
      {
        employer_profile_id: user.employer_profile.id,
        user_email: user.email,
        product_id: product_id,
        product_name: product_name,
        product_api: product_api,
        product_price: product_price,
        product_credit_value: product_credit_value,
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      }
    );

    Router.push(buy.data.checkout)
  }
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
        {products ? (
          products.map((product: any) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200"
            >
              <div className="p-6">
                <p className="text-sm text-gray-500">
                  {product.product_description}
                </p>
                <p>
                  <span className="text-4xl font-extrabold text-gray-900">
                    RM {parseFloat(product.product_price).toFixed(2)}
                  </span>
                </p>
                <a
                  onClick={() =>
                    handleBuy(
                      product.id,
                      product.name,
                      product.product_api,
                      product.product_price,
                      product.product_credit_value,
                    )
                  }
                  className="cursor-pointer mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                >
                  Buy {product.name}
                </a>
              </div>
            </div>
          ))
        ) : (
          <Skeleton />
        )}
      </div>
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

  if (!user) return { redirect: { statusCode: 307, destination: "/signin" } };

  return { props: { user } };
};
