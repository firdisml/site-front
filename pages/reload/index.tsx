import DashboardLayout from "../../layout/layout.dashboard";
import axios from "axios";
import Skeleton from "./component/skeleton";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import { fetcher } from "../../utils/fetcher/fetcher";
import Router from "next/router";
import { useQuery } from "react-query";

const fetch_employer_products = async (employer_profile_id: string) => {
  if (employer_profile_id === null) {
    return [];
  } else {
    const products = await axios.get("http://localhost:3000/product/employer", {
      withCredentials: true,
    });

    return products.data;
  }
};

const fetch_employer_products_count = async (employer_profile_id: string) => {
  if (employer_profile_id === null) {
    return 0;
  } else {
    const products_count = await axios.get(
      "http://localhost:3000/product/employer/count",
      { withCredentials: true }
    );

    return products_count.data;
  }
};

function Index({ user }: any) {
  const employer_profile_id = user.employer_profile
    ? user.employer_profile.id
    : null;

  const products = useQuery(["products", employer_profile_id], () =>
    fetch_employer_products(employer_profile_id)
  );

  const products_count = useQuery(["products_count", employer_profile_id], () =>
    fetch_employer_products_count(employer_profile_id)
  );


  async function handleBuy(
    product_id: string,
    product_name: string,
    product_api: string,
    product_price: string,
    product_credit_value: string
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

    Router.push(buy.data.checkout);
  }
  return (
    <DashboardLayout user={user}>
      <div className="p-6 space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
        {products.data && products_count.data ? (
          products.data.map((product: any) => (
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
                      product.product_credit_value
                    )
                  }
                  className="cursor-pointer mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                >
                  Buy {product.name}
                </a>
              </div>
            </div>
          ))
        ) : products.data && !products_count.data ? (
          <a>Test</a>
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
  const {
    req,
    res,
    query: { page = 1 },
  } = ctx;
  const [error, user] = await fetcher(
    req,
    res,
    "http://localhost:3000/user/fetch"
  );

  const user_profile: any = user;

  if (!user_profile)
    return { redirect: { statusCode: 307, destination: "/signin" } };

  if (!user_profile.employer_profile)
    return { redirect: { statusCode: 307, destination: "/verification" } };

  return { props: { user: user, page: +page } };
};
