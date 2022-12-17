import React from "react";
import DashboardLayout from "../../layout/layout.dashboard";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import axios from "axios";
import { fetcher } from "../../utils/fetcher/fetcher";
import { useQuery } from "react-query";

function Index({ user }: any) {
  console.log(user);

  return (
    <DashboardLayout user={user}>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 text-center">
                <div>
                  <label
                    htmlFor="company_name"
                    className="mb-3 block text-sm font-medium text-gray-700"
                  >
                    Company Logo
                  </label>
                  <picture>
                    <img
                      className="p-1 w-28 h-28 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mx-auto object-center"
                      src={user.employer_profile.employer_file.employer_picture}
                      alt="Bordered avatar"
                    />
                  </picture>
                </div>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="company_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  disabled
                  name="company_name"
                  id="company_name"
                  value={user.employer_profile.employer_name}
                  autoComplete="company_name"
                  className="mt-1 bg-gray-50  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="company_website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Website
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    https://
                  </span>
                  <input
                    type="text"
                    name="company_website"
                    disabled
                    value={user.employer_profile.employer_website}
                    id="company_website"
                    className="bg-gray-50  flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="www.example.com"
                  />
                </div>
              </div>

              <div className="col-span-6 text-center">
                <div className="mb-6">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="employer_banner_picture"
                      style={{
                        backgroundImage: `url('${user.employer_profile.employer_file.employer_banner_picture}')`,
                      }}
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300  rounded-lg cursor-pointer bg-cover"
                    ></label>
                  </div>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="company_address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Size
                </label>
                <input
                  type="text"
                  name="company_address"
                  id="company_address"
                  value={user.employer_profile.employer_size}
                  autoComplete="company_address"
                  disabled
                  className="mt-1 bg-gray-50  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="company_address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Industry
                </label>
                <input
                  type="text"
                  name="company_address"
                  id="company_address"
                  value={user.employer_profile.employer_size}
                  autoComplete="company_address"
                  disabled
                  className="mt-1 bg-gray-50  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="company_registration_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Registration Number
                </label>
                <input
                  type="text"
                  name="company_registration_number"
                  value={user.employer_profile.employer_register_number}
                  id="company_registration_number"
                  autoComplete="company_registration_number"
                  disabled
                  className="mt-1 bg-gray-50  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="company_address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Type
                </label>
                <input
                  type="text"
                  name="company_address"
                  id="company_address"
                  value={user.employer_profile.employer_type}
                  autoComplete="company_address"
                  disabled
                  className="mt-1 bg-gray-50  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="company_document"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Document
                </label>
                <button
                  type="button"
                  onClick={(event: any) => {
                    event.preventDefault();
                    window.open(user.employer_profile.employer_file.employer_document);
                  }}
                  className="w-full items-center mt-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View Document
                </button>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="company_address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Address
                </label>
                <input
                  type="text"
                  name="company_address"
                  id="company_address"
                  value={
                    user.employer_profile.employer_address.employer_address
                  }
                  autoComplete="company_address"
                  disabled
                  className="mt-1 bg-gray-50  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="employer_postal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal
                </label>
                <input
                  type="text"
                  name="employer_postal"
                  id="employer_postal"
                  value={user.employer_profile.employer_address.employer_postal}
                  autoComplete="employer_postal"
                  disabled
                  className="mt-1 bg-gray-50  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="company_city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  name="company_city"
                  id="company_city"
                  value={
                    user.employer_profile.employer_address.employer_address
                  }
                  autoComplete="company_city"
                  disabled
                  className="mt-1 bg-gray-50  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="company_city"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  name="company_city"
                  id="company_city"
                  autoComplete="company_city"
                  disabled
                  value={user.employer_profile.employer_address.employer_state}
                  className="mt-1 bg-gray-50  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="company_city"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <input
                  type="text"
                  name="company_city"
                  id="company_city"
                  value={
                    user.employer_profile.employer_address.employer_country
                  }
                  autoComplete="company_city"
                  disabled
                  className="mt-1 bg-gray-50  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        <div></div>
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
  const [error, user]: any = await fetcher(
    req,
    res,
    "http://localhost:3000/user/fetch"
  );

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  if (!user) return { redirect: { statusCode: 307, destination: "/signin" } };

  if (!user.verification_submission) return { redirect: { statusCode: 307, destination: "/verification/submit" } };

  return { props: { user: user, page: +page } };
};
