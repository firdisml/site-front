import React from "react";
import DashboardLayout from "../../../layout/layout.dashboard";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { TagIcon } from "@heroicons/react/solid";
import { XCircleIcon } from "@heroicons/react/solid";
import Router from "next/router";
import { Formik, Field, Form, FieldArray } from "formik";
import { PersistFormikValues } from "formik-persist-values";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import { fetcher } from "../../../utils/fetcher/fetcher";

const plans = [
  {
    name: "30",
    duration: 30,
    credit: 0,
  },
  {
    name: "60",
    duration: 60,
    credit: 10,
  },
  {
    name: "90",
    duration: 90,
    credit: 20,
  },
  {
    name: "120",
    duration: 120,
    credit: 30,
  },
];

function Index({user}:any) {
  function onKeyDown(keyEvent: any) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }


  return (
    <DashboardLayout user = {user}>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <Formik
          initialValues={{
            job_title: "",
            job_minimum_pay_range: "",
            job_maximum_pay_range: "",
            job_type: "",
            job_about: "",
            job_experience: "",
            job_arrangement: "",
            job_descriptions: [""],
            job_requirements: [""],
            job_skills: [""],
            job_tags: [],
            job_city: "",
            job_state: "",
            job_post_package: "30",
            job_post_credit: 0,
            job_post_duration: 30,
          }}
          onSubmit={(values, actions) => {
            Router.push({
              pathname: "/post/preview",
              query: {
                job_title: values.job_title,
                job_minimum_pay_range: values.job_minimum_pay_range,
                job_maximum_pay_range: values.job_maximum_pay_range,
                job_about: values.job_about,
                job_type: values.job_type,
                job_experience: values.job_experience,
                job_arrangement: values.job_arrangement,
                job_descriptions: values.job_descriptions,
                job_city: values.job_city,
                job_state: values.job_state,
                job_skills: values.job_skills,
                job_requirements: values.job_requirements,
                job_tags: values.job_tags,
                job_post_package: values.job_post_package,
                job_post_credit: values.job_post_credit,
                job_post_duration: values.job_post_duration,
              },
            }, "/post/preview");
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit} onKeyDown={onKeyDown}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="job_title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Job Title
                      </label>
                      <input
                        type="text"
                        name="job_title"
                        id="job_title"
                        autoComplete="job_title"
                        value={props.values.job_title}
                        onChange={props.handleChange}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="job_minimum_pay_range"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Minimum Pay Range
                      </label>
                      <input
                        type="text"
                        name="job_minimum_pay_range"
                        id="job_minimum_pay_range"
                        autoComplete="job_minimum_pay_range"
                        value={props.values.job_minimum_pay_range}
                        onChange={props.handleChange}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>


                    <div className="col-span-3">
                      <label
                        htmlFor="job_maximum_pay_range"
                        className="block text-sm font-medium text-gray-700"
                      >
                         Maximum Pay Range
                      </label>
                      <input
                        type="text"
                        name="job_maximum_pay_range"
                        id="job_maximum_pay_range"
                        autoComplete="job_maximum_pay_range"
                        value={props.values.job_maximum_pay_range}
                        onChange={props.handleChange}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                    <label htmlFor="job_about" className="block text-sm font-medium text-gray-700">
                      Job About
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="job_about"
                        name="job_about"
                        rows={3}
                        value={props.values.job_about}
                        onChange={props.handleChange}
                        required
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="job_type"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Job Type
                      </label>
                      <select
                        name="job_type"
                        id="job_type"
                        value={props.values.job_type}
                        onChange={props.handleChange}
                        autoComplete="job_type"
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Full time</option>
                        <option>Part time</option>
                      </select>
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="job_experience"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Job Experience
                      </label>
                      <select
                        name="job_experience"
                        id="job_experience"
                        value={props.values.job_experience}
                        onChange={props.handleChange}
                        autoComplete="job_experience"
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Senior</option>
                        <option>Executive</option>
                        <option>Internship</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="job_arrangement"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Job Arrangement
                      </label>
                      <select
                        name="job_arrangement"
                        id="job_arrangement"
                        value={props.values.job_arrangement}
                        onChange={props.handleChange}
                        autoComplete="job_arrangement"
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Hybrid</option>
                        <option>Remote</option>
                        <option>Onsite</option>
                      </select>
                    </div>

                    <div className="bg-slate-100 overflow-hidden shadow rounded-lg col-span-6">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="col-span-6">
                          <label
                            htmlFor="job_skills"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Job Skills
                          </label>
                          <FieldArray
                            name="job_skills"
                            render={(job_skills_array) => (
                              <div>
                                {props.values.job_skills.map(
                                  (job_skill, index) => (
                                    <div
                                      className="relative rounded-md shadow-sm items-center"
                                      key={index}
                                    >
                                      <Field
                                        type="text"
                                        required
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        name={`job_skills.${index}`}
                                      />
                                      {index === 0 ? null : (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            job_skills_array.remove(index)
                                          }
                                          className="absolute inset-y-0 right-0 pr-3 flex items-center px-2 text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:shadow-outline-blue focus:text-gray-700"
                                        >
                                          <svg
                                            className="h-5 w-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                          Delete
                                        </button>
                                      )}
                                    </div>
                                  )
                                )}
                                <button
                                  onClick={() => job_skills_array.push("")}
                                  type="button"
                                  className="relative w-full rounded-md px-3 py-2 text-sm leading-5 font-medium text-center text-gray-700 hover:text-gray-900 focus:outline-none focus:shadow-outline-blue focus:text-gray-900"
                                >
                                  <PlusCircleIcon
                                    className="h-7 w-7 text-gray-400 hover:text-gray-800 mx-auto"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="job_city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Job City
                      </label>
                      <input
                        type="text"
                        name="job_city"
                        id="job_city"
                        autoComplete="job_city"
                        value={props.values.job_city}
                        onChange={props.handleChange}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="job_state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Job State
                      </label>
                      <select
                        name="job_state"
                        id="job_state"
                        value={props.values.job_state}
                        onChange={props.handleChange}
                        autoComplete="job_state"
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Pahang</option>
                        <option>Selangor</option>
                      </select>
                    </div>

                    <div className="bg-slate-100 overflow-hidden shadow rounded-lg col-span-6">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="col-span-6">
                          <label
                            htmlFor="job_descriptions"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Job Descriptions
                          </label>
                          <FieldArray
                            name="job_descriptions"
                            render={(job_descriptions_array) => (
                              <div>
                                {props.values.job_descriptions.map(
                                  (job_description, index) => (
                                    <div
                                      className="relative rounded-md shadow-sm items-center"
                                      key={index}
                                    >
                                      <Field
                                        type="text"
                                        required
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        name={`job_descriptions.${index}`}
                                      />
                                      {index === 0 ? null : (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            job_descriptions_array.remove(index)
                                          }
                                          className="absolute inset-y-0 right-0 pr-3 flex items-center px-2 text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:shadow-outline-blue focus:text-gray-700"
                                        >
                                          <svg
                                            className="h-5 w-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                          Delete
                                        </button>
                                      )}
                                    </div>
                                  )
                                )}
                                <button
                                  onClick={() =>
                                    job_descriptions_array.push("")
                                  }
                                  type="button"
                                  className="relative w-full rounded-md px-3 py-2 text-sm leading-5 font-medium text-center text-gray-700 hover:text-gray-900 focus:outline-none focus:shadow-outline-blue focus:text-gray-900"
                                >
                                  <PlusCircleIcon
                                    className="h-7 w-7 text-gray-400 hover:text-gray-800 mx-auto"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-100 overflow-hidden shadow rounded-lg col-span-6">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="col-span-6">
                          <label
                            htmlFor="job_requirements"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Job Requirements
                          </label>
                          <FieldArray
                            name="job_requirements"
                            render={(job_requirements_array) => (
                              <div>
                                {props.values.job_requirements.map(
                                  (job_requirement, index) => (
                                    <div
                                      className="relative rounded-md shadow-sm items-center"
                                      key={index}
                                    >
                                      <Field
                                        type="text"
                                        required
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        name={`job_requirements.${index}`}
                                      />
                                      {index === 0 ? null : (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            job_requirements_array.remove(index)
                                          }
                                          className="absolute inset-y-0 right-0 pr-3 flex items-center px-2 text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:shadow-outline-blue focus:text-gray-700"
                                        >
                                          <svg
                                            className="h-5 w-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                          Delete
                                        </button>
                                      )}
                                    </div>
                                  )
                                )}
                                <button
                                  onClick={() =>
                                    job_requirements_array.push("")
                                  }
                                  type="button"
                                  className="relative w-full rounded-md px-3 py-2 text-sm leading-5 font-medium text-center text-gray-700 hover:text-gray-900 focus:outline-none focus:shadow-outline-blue focus:text-gray-900"
                                >
                                  <PlusCircleIcon
                                    className="h-7 w-7 text-gray-400 hover:text-gray-800 mx-auto"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-slate-100 overflow-hidden shadow rounded-lg col-span-6">
                      <label
                        htmlFor="job_requirements"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Job Tags
                      </label>

                      <FieldArray
                        name="job_tags"
                        render={(job_tags_array) => (
                          <div>
                            <input
                              type="text"
                              name="job_tags"
                              id="job_tags"
                              autoComplete="job_tags"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  job_tags_array.push(e.currentTarget.value);
                                  e.currentTarget.value = "";
                                }
                              }}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                            <ul
                              role="list"
                              className="mt-6  grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
                            >
                              {props.values.job_tags.map((job_tag, index) => (
                                <li
                                  key={index}
                                  className="col-span-1 flex shadow-sm rounded-md"
                                >
                                  <div className="bg-red-700 flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md">
                                    <TagIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                    <div className="flex-1 px-4 py-2 text-sm truncate">
                                      <a className="text-gray-900 font-medium hover:text-gray-600">
                                        {job_tag}
                                      </a>
                                    </div>
                                    <div className="flex-shrink-0 pr-2 py-2">
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          job_tags_array.remove(index)
                                        }
                                        className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                      >
                                        <span className="sr-only">
                                          Open options
                                        </span>
                                        <XCircleIcon
                                          className="w-5 h-5"
                                          aria-hidden="true"
                                        />
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      />
                    </div>
                    <div className="bg-slate-100 overflow-hidden shadow rounded-lg col-span-6">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="col-span-6">
                          <label
                            htmlFor="job_post_package"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Job Post Duration
                          </label>
                          <ul className="mt-2 grid gap-6 w-full md:grid-cols-2">
                            {plans.map((plan, index) => (
                              <li key={index}>
                                <Field
                                  type="radio"
                                  id={plan.name}
                                  name="job_post_package"
                                  value={plan.name}
                                  className="hidden peer"
                                  onClick={() => {
                                    props.setFieldValue("job_post_credit",plan.credit)
                                    props.setFieldValue("job_post_duration", plan.duration)
                                  }}
                                  required
                                />
                                <label
                                  htmlFor={plan.name}
                                  className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                  <div className="block">
                                    <div className="w-full text-lg font-semibold">
                                      {plan.duration} Days
                                    </div>
                                    <div className="w-full">
                                      {plan.credit} Credit
                                    </div>
                                  </div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <PersistFormikValues storage="sessionStorage" name="post_form" />
              <div>
                <button
                  type="submit"
                  className="cursor-pointer block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
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

  const user_profile:any = user

  if (!user_profile) return { redirect: { statusCode: 307, destination: "/signin" } };

  if(!user_profile.employer_profile)return { redirect: { statusCode: 307, destination: "/verification" } };

  return { props: { user: user, page: +page } };
};
