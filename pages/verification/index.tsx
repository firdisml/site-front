import React from "react";
import DashboardLayout from "../../layout/layout.dashboard";
import { useRef, useState } from "react";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import axios from "axios";
import { fetcher } from "../../utils/fetcher/fetcher";

function Index() {
  const [companyLogo, setCompanyLogo] = useState<any>();
  const [companyDocument, setCompanyDocument] = useState<any>();
  const company_name = useRef<any>();
  const company_size = useRef<any>();
  const company_industry = useRef<any>();
  const company_register_number = useRef<any>();
  const company_type = useRef<any>();
  const company_website = useRef<any>();
  const company_address = useRef<any>();
  const company_postal = useRef<any>();
  const company_city = useRef<any>();
  const company_state = useRef<any>();
  const company_country = useRef<any>();

  const companyLogoHandler = (e: any) => {
    setCompanyLogo(e.target.files[0]);
  };

  const companyDocumentHandler = (e: any) => {
    setCompanyDocument(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const post = await axios.post(
        "http://localhost:3000/verification/employer/submission",
        {
          employer_picture: companyLogo,
          employer_document: companyDocument,
          employer_name: company_name.current.value,
          employer_size: company_size.current.value,
          employer_industry: company_industry.current.value,
          employer_register_number: company_register_number.current.value,
          employer_type: company_type.current.value,
          employer_website: company_website.current.value,
          employer_address: company_address.current.value,
          employer_postal: company_postal.current.value,
          employer_city: company_city.current.value,
          employer_state: company_state.current.value,
          employer_country: company_country.current.value,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
    } catch (error) {}
  };

  return (
    <DashboardLayout>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST" onSubmit={handleSubmit}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 text-center">
                  <div className="mb-6">
                    <picture>
                      <img
                        className="p-1 w-20 h-20 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mx-auto object-center"
                        src={
                          companyLogo
                            ? URL.createObjectURL(companyLogo)
                            : "https://dummyimage.com/300.png/09f/fff"
                        }
                        alt="Bordered avatar"
                      />
                    </picture>
                  </div>
                  <label className="cursor-pointer mt-6">
                    <span className="mx-auto bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Upload Logo
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={companyLogoHandler}
                    />
                  </label>
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    ref={company_name}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="street-address"
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
                      name="company-website"
                      id="company-website"
                      ref={company_website}
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Size
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    ref={company_size}
                    autoComplete="given-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Industry
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    ref={company_industry}
                    autoComplete="family-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Register Number
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    ref={company_register_number}
                    autoComplete="family-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Type
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    ref={company_type}
                    autoComplete="family-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Document
                  </label>
                  <input
                    className="mt-1.5 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                    onChange={companyDocumentHandler}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Address
                  </label>
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    ref={company_address}
                    autoComplete="street-address"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    ref={company_postal}
                    autoComplete="family-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    ref={company_city}
                    autoComplete="family-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <select
                    id="country"
                    name="country"
                    ref={company_state}
                    autoComplete="country-name"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>Pahang</option>
                    <option>Selangor</option>
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    ref={company_country}
                    autoComplete="family-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
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
