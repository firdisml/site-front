import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/layout.dashboard";
import { CheckIcon } from "@heroicons/react/solid";
import axios from "axios";
import Skeleton from "./component/skeleton";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import { fetcher } from "../../utils/fetcher/fetcher";
import Router from "next/router";

function Index() {
  const [products, setProducts] = useState<any>();
  useEffect(() => {
    const fetch_product = async () => {
      const product = await axios.get(
        "http://localhost:3000/product/employer/product",
        { withCredentials: true }
      );
      console.log(product.data);
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
    product_description: string,
    product_features: string[]
  ) {
    const buy: any = await axios.post(
      "http://localhost:3000/payment/employer/checkout",
      {
        product_name: product_name,
        product_id: product_id,
        product_api: product_api,
        product_price: product_price,
        product_credit_value: product_credit_value,
        product_description: product_description,
        product_features: product_features,
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
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  {product.name}
                </h2>
                <p className="mt-4 text-sm text-gray-500">
                  {product.product_description}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    RM {parseFloat(product.product_price).toFixed(2)}
                  </span>{" "}
                  <span className="text-base font-medium text-gray-500">
                    /mo
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
                      product.product_description,
                      product.product_features
                    )
                  }
                  className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                >
                  Buy {product.name}
                </a>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                  {/* eslint-disable-next-line react/no-unescaped-entities*/}
                  What's included
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {product.product_features.map((feature: any) => (
                    <li key={feature} className="flex space-x-3">
                      <CheckIcon
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
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
