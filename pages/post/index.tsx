import React, { useState } from "react";
import DashboardLayout from "../../layout/layout.dashboard";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { TagIcon } from "@heroicons/react/solid";
import { XCircleIcon } from "@heroicons/react/solid";
import Router from "next/router";
import { FormikProps } from "formik/dist/types";
import { basicSchema } from "../../schemas";
import { useFormik, Formik, Field, Form, FieldArray } from "formik";
import { PersistFormikValues } from "formik-persist-values";

function Index() {
  //Tags Input

  const [tags, setTags] = useState<any>([]);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  function handle_tag_input_change(event: any) {
    if (event.key === "Enter") {
      event.preventDefault();
      // Add the tag to the list of tags
      setTags([...tags, event.target.value]);
      // Clear the input field
      event.target.value = "";
    }
  }

  function handle_delete_tag_button(tagToDelete: any, e: any) {
    e.preventDefault();
    setTags(tags.filter((_: any, tag: any) => tag !== tagToDelete));
  }

  //Tags Input

  //Description Input

  const [input_description_fields, set_input_description_fields] = useState([
    "",
  ]);

  const handle_add_input_job_description = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    set_input_description_fields([...input_description_fields, ""]);
  };

  const handle_job_description_input_change = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const values = [...input_description_fields];
    values[index] = e.target.value;
    set_input_description_fields(values);
  };

  const handle_delete_job_description_input = (index: number) => {
    set_input_description_fields(
      input_description_fields.filter((_, i) => i !== index)
    );
  };

  //Description Input

  //Requirement Input

  const [input_requirement_fields, set_input_requirement_fields] = useState([
    "",
  ]);

  const handle_add_input_job_requirement = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    set_input_requirement_fields([...input_requirement_fields, ""]);
  };

  const handle_job_requirement_input_change = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const values = [...input_requirement_fields];
    values[index] = e.target.value;
    set_input_requirement_fields(values);
  };

  const handle_delete_job_requirement_input = (index: number) => {
    set_input_requirement_fields(
      input_requirement_fields.filter((_, i) => i !== index)
    );
  };

  //Requirement Input

  //Skill Set Input

  const [input_skill_set_fields, set_input_skill_set_fields] = useState([""]);

  const handle_add_input_job_skill_set = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    set_input_skill_set_fields([...input_skill_set_fields, ""]);
  };

  const handle_job_skill_set_input_change = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const values = [...input_skill_set_fields];
    values[index] = e.target.value;
    return set_input_skill_set_fields(values);
  };

  const handle_delete_job_skill_set_input = (index: number) => {
    set_input_skill_set_fields(
      input_skill_set_fields.filter((_, i) => i !== index)
    );
  };

  //Skill Set Input
  function sendData(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    Router.push({
      pathname: "/post/preview",
      query: {
        description: input_description_fields,
        requirement: input_requirement_fields,
        skill: input_skill_set_fields,
      },
    });
  }

  return (
    <DashboardLayout>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <Formik
          onSubmit={() => {
            console.log("Submitted!");
          }}
          initialValues={{
            job_title: "",
            friends: [""],
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <label
                htmlFor="street-address"
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

              <FieldArray
                name="friends"
                render={(arrayHelpers) => (
                  <div>
                    {props.values.friends && props.values.friends.length > 0 ? (
                      props.values.friends.map((friend, index) => (
                        <div
                          className="relative rounded-md shadow-sm items-center"
                          key={index}
                        >
                          <Field
                            type="text"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            name={`friends.${index}`}
                          />
                          {index === 0 ? null : (<button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
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
                          </button>)}
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        {/* show this when user has removed all friends from the list */}
                        Add a friend
                      </button>
                    )}
                    <button
                      onClick={() => arrayHelpers.push("")}
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

              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Preview
              </button>
              <PersistFormikValues name="post_form" />
            </Form>
          )}
        </Formik>
        <form action="#" method="POST">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="job_title"
                    id="job_title"
                    autoComplete="job_title"
                    required
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Minimum Salary Range
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Maximum Salary Range
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Experience Level
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Type
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="bg-slate-100 overflow-hidden shadow rounded-lg col-span-6">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="col-span-6">
                      {input_description_fields.map((field, index) => (
                        <div key={index} className="mb-3">
                          <div className="relative rounded-md shadow-sm items-center">
                            <input
                              type="text"
                              name="street-address"
                              id="street-address"
                              value={field}
                              onChange={(e) =>
                                handle_job_description_input_change(e, index)
                              }
                              autoComplete="street-address"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                            {index === 0 ? null : (
                              <button
                                type="button"
                                onClick={() =>
                                  handle_delete_job_description_input(index)
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
                        </div>
                      ))}
                      <button
                        onClick={(e: any) =>
                          handle_add_input_job_description(e)
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
                  </div>
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
                    autoComplete="family-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="bg-slate-100 overflow-hidden shadow rounded-lg col-span-6">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="col-span-6">
                      {input_skill_set_fields.map((field, index) => (
                        <div key={index} className="mb-3">
                          <div className="relative rounded-md shadow-sm items-center">
                            <input
                              type="text"
                              name="street-address"
                              id="street-address"
                              value={field}
                              onChange={(e) =>
                                handle_job_skill_set_input_change(e, index)
                              }
                              autoComplete="street-address"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                            {index === 0 ? null : (
                              <button
                                type="button"
                                onClick={() =>
                                  handle_delete_job_skill_set_input(index)
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
                        </div>
                      ))}
                      <button
                        onClick={(e: any) => handle_add_input_job_skill_set(e)}
                        type="button"
                        className="relative w-full rounded-md px-3 py-2 text-sm leading-5 font-medium text-center text-gray-700 hover:text-gray-900 focus:outline-none focus:shadow-outline-blue focus:text-gray-900"
                      >
                        <PlusCircleIcon
                          className="h-7 w-7 text-gray-400 hover:text-gray-800 mx-auto"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100 overflow-hidden shadow rounded-lg col-span-6">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="col-span-6">
                      {input_requirement_fields.map((field, index) => (
                        <div key={index} className="mb-3">
                          <div className="relative rounded-md shadow-sm items-center">
                            <input
                              type="text"
                              name="street-address"
                              id="street-address"
                              value={field}
                              onChange={(e) =>
                                handle_job_requirement_input_change(e, index)
                              }
                              autoComplete="street-address"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                            {index === 0 ? null : (
                              <button
                                type="button"
                                onClick={() =>
                                  handle_delete_job_requirement_input(index)
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
                        </div>
                      ))}
                      <button
                        onClick={(e: any) =>
                          handle_add_input_job_requirement(e)
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
                  </div>
                </div>

                <div className="p-6 bg-slate-100 overflow-hidden shadow rounded-lg col-span-6">
                  <input
                    type="text"
                    onKeyDown={handle_tag_input_change}
                    name="tagsd-input"
                    id="tagsd-input"
                    autoComplete="tagsd-input"
                    className="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <div>
                    <ul
                      role="list"
                      className="mt-6  grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                      {tags.map((tag: any, index: any) => (
                        <li
                          key={index}
                          className="col-span-1 flex shadow-sm rounded-md"
                        >
                          <div
                            className={classNames(
                              "bg-purple-600",
                              "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                            )}
                          >
                            <TagIcon className="w-5 h-5" aria-hidden="true" />
                          </div>
                          <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                            <div className="flex-1 px-4 py-2 text-sm truncate">
                              <a className="text-gray-900 font-medium hover:text-gray-600">
                                {tag}
                              </a>
                            </div>
                            <div className="flex-shrink-0 pr-2 py-2">
                              <button
                                type="button"
                                onClick={(e) =>
                                  handle_delete_tag_button(index, e)
                                }
                                className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <span className="sr-only">Open options</span>
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
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Preview
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default Index;
