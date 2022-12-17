import React, { useState } from "react";
import DashboardLayout from "../../../layout/layout.dashboard";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import axios from "axios";
import { fetcher } from "../../../utils/fetcher/fetcher";
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
      <Formik
        initialValues={{
          employer_picture: [],
          employer_picture_blob: null,
          employer_banner_picture: [],
          employer_banner_picture_blob: null,
          employer_document: [],
          employer_document_blob: null,
          company_name: "",
          company_website: "",
          company_size: "",
          company_industry: "",
          company_registration_number: "",
          company_type: "",
          company_address: "",
          employer_postal: "",
          company_city: "",
          company_state: "Selangor",
          company_country: "Malaysia",
        }}
        onSubmit={async (values) => {
          try {
            set_is_submitting(true);

            await axios.post(
              "http://localhost:3000/verification/employer/submission",
              {
                employer_picture: values.employer_picture[0],
                employer_document: values.employer_document[0],
                employer_name: values.company_name,
                employer_size: values.company_size,
                employer_industry: values.company_industry,
                employer_register_number: values.company_registration_number,
                employer_type: values.company_type,
                employer_website: values.company_website,
                employer_address: values.company_address,
                employer_postal: values.employer_postal,
                employer_city: values.company_city,
                employer_state: values.company_state,
                employer_country: values.company_country,
              },
              {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
              }
            );

            set_is_submitting(false);
            router.push("/verification/success");
          } catch (error) {
            console.log(error);
          }
        }}
        validationSchema={Yup.object({
          employer_picture: Yup.array().min(1, "Please select company"),
          employer_document: Yup.array().min(1, "select at least 1 file"),
        })}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 text-center">
                      <div className="mb-6">
                        <label
                          htmlFor="company_name"
                          className="mb-3 block text-sm font-medium text-gray-700"
                        >
                          Company Logo
                        </label>
                        <picture>
                          <Image
                            className="p-1 w-28 h-28 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mx-auto object-center"
                            width={150}
                            height={150}
                            src={
                              props.values.employer_picture_blob
                                ? props.values.employer_picture_blob
                                : "https://via.placeholder.com/150"
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
                          id="file"
                          name="employer_picture"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          className="hidden"
                          onChange={(event: any) => {
                            const file_list = event.target.files;
                            let file_array: any = Array.from(file_list);
                            const employer_picture_blob = new Blob(file_array, {
                              type: "image/jpeg",
                            });
                            const employer_picture_blob_url =
                              URL.createObjectURL(employer_picture_blob);
                            props.setFieldValue("employer_picture", file_array);
                            props.setFieldValue(
                              "employer_picture_blob",
                              employer_picture_blob_url
                            );
                          }}
                        />
                      </label>
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
                        name="company_name"
                        id="company_name"
                        autoComplete="company_name"
                        value={props.values.company_name}
                        onChange={props.handleChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                          id="company_website"
                          value={props.values.company_website}
                          onChange={props.handleChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
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
                              backgroundImage: `url('${
                                props.values.employer_banner_picture_blob &&
                                props.values.employer_banner_picture_blob
                                  ? props.values.employer_banner_picture_blob
                                  : "https://via.placeholder.com/755x255.png"
                              }')`,
                            }}
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-cover"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                <span className="mx-auto bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                  Upload Banner
                                </span>
                              </p>
                            </div>
                            <input
                              id="employer_banner_picture"
                              name="employer_banner_picture"
                              type="file"
                              accept="image/png, image/gif, image/jpeg"
                              className="hidden"
                              onChange={(event: any) => {
                                const file_list = event.target.files;
                                let file_array: any = Array.from(file_list);
                                const employer_banner_picture_blob = new Blob(
                                  file_array,
                                  {
                                    type: "image/jpeg",
                                  }
                                );
                                const employer_banner_picture_blob_url =
                                  URL.createObjectURL(
                                    employer_banner_picture_blob
                                  );
                                props.setFieldValue(
                                  "employer_banner_picture",
                                  file_array
                                );
                                props.setFieldValue(
                                  "employer_banner_picture_blob",
                                  employer_banner_picture_blob_url
                                );
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company_size"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company Size
                      </label>
                      <select
                        name="company_size"
                        id="company_size"
                        value={props.values.company_size}
                        onChange={props.handleChange}
                        autoComplete="company_size"
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Full time</option>
                        <option>Part time</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company_industry"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company Industry
                      </label>
                      <select
                        name="company_industry"
                        id="company_industry"
                        value={props.values.company_industry}
                        onChange={props.handleChange}
                        autoComplete="company_industry"
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Technology</option>
                        <option>Construction</option>
                      </select>
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
                        id="company_registration_number"
                        autoComplete="company_registration_number"
                        value={props.values.company_registration_number}
                        onChange={props.handleChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company_type"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company Type
                      </label>
                      <select
                        name="company_type"
                        id="company_type"
                        value={props.values.company_type}
                        onChange={props.handleChange}
                        autoComplete="company_type"
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Full time</option>
                        <option>Part time</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="company_document"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company Document
                      </label>
                      <input
                        accept="image/png, image/gif, image/jpeg"
                        className="mt-1.5 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="file_input_help"
                        type="file"
                        onChange={(event: any) => {
                          const file_list = event.target.files;
                          let file_array: any = Array.from(file_list);
                          const employer_picture_blob = new Blob(file_array, {
                            type: "image/jpeg",
                          });
                          const employer_picture_blob_url = URL.createObjectURL(
                            employer_picture_blob
                          );
                          props.setFieldValue("employer_document", file_array);
                          props.setFieldValue(
                            "employer_document_blob",
                            employer_picture_blob_url
                          );
                        }}
                      />
                      {props.values.employer_document &&
                      props.values.employer_document_blob ? (
                        <button
                          type="button"
                          onClick={(event: any) => {
                            event.preventDefault();
                            window.open(props!.values!.employer_document_blob!);
                          }}
                          className="w-full items-center mt-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View Document
                        </button>
                      ) : null}
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
                        value={props.values.company_address}
                        onChange={props.handleChange}
                        autoComplete="company_address"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                        value={props.values.employer_postal}
                        onChange={props.handleChange}
                        autoComplete="employer_postal"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                        value={props.values.company_city}
                        onChange={props.handleChange}
                        autoComplete="company_city"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company_state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State
                      </label>
                      <select
                        name="company_state"
                        id="company_state"
                        value={props.values.company_state}
                        onChange={props.handleChange}
                        autoComplete="company_state"
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Selangor</option>
                        <option>Kedah</option>
                        <option>Kelantan</option>
                        <option>Melaka</option>
                        <option>Negeri Sembilan</option>
                        <option>Pahang</option>
                        <option>Pulau Pinang</option>
                        <option>Perak</option>
                        <option>Perlis</option>
                        <option>Sabah</option>
                        <option>Sarawak</option>
                        <option>Terengganu</option>
                        <option>Kuala Lumpur</option>
                        <option>Labuan</option>
                        <option>Putrajaya</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company_country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <select
                        name="company_country"
                        id="company_country"
                        value={props.values.company_country}
                        onChange={props.handleChange}
                        autoComplete="company_country"
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Malaysia</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={is_submitting}
                  className="cursor-pointer w-full block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg"
                >
                  {is_submitting ? (
                    <svg
                      className="inline mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
            <PersistFormikValues
              storage="sessionStorage"
              name="verification_form"
              ignoreValues={[
                "employer_picture",
                "employer_picture_blob",
                "employer_banner_picture",
                "employer_banner_picture_blob",
                "employer_document",
                "employer_document_blob",
              ]}
              persistInvalid={true}
            />
          </Form>
        )}
      </Formik>
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

  const user_profile: any = user

  if (!user_profile) return { redirect: { statusCode: 307, destination: "/signin" } };

  const verification_submission = user_profile.verification_submission
  
  if(verification_submission) return { redirect: { statusCode: 307, destination: "/verification/submission" } };

  return { props: { user } };
};
