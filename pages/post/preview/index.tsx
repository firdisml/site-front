import React from "react";
import DashboardLayout from "../../../layout/layout.dashboard";
import { useRouter } from "next/router";
import { TagIcon } from "@heroicons/react/solid";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import { fetcher } from "../../../utils/fetcher/fetcher";

import {
  CurrencyDollarIcon,
  StarIcon,
  ClockIcon,
  CalendarIcon,
  MapIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  LightBulbIcon,
} from "@heroicons/react/outline";
import axios from "axios";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const tags = [
  "Software",
  "Software",
  "Software",
  "Software",
  "Software",
  "Software",
];

function Index({ user }: any) {
  const router = useRouter();

  const {
    query: {
      job_title,
      job_requirements,
      job_minimum_pay_range,
      job_maximum_pay_range,
      job_about,
      job_type,
      job_experience,
      job_arrangement,
      job_descriptions,
      job_city,
      job_state,
      job_skills,
      job_tags,
      job_post_package,
      job_post_credit,
      job_post_duration,
    },
  } = router;

  const requirements = [];

  const skills = [];

  const descriptions = [];

  const tags = [];

  const job_post_date = new Date();

  if (Array.isArray(job_descriptions)) {
    console.log("Array");
    descriptions.push(...job_descriptions);
  } else {
    console.log("Not Array");
    descriptions.push(job_descriptions);
  }

  if (Array.isArray(job_requirements)) {
    console.log("Array");
    requirements.push(...job_requirements);
  } else {
    console.log("Not Array");
    requirements.push(job_requirements);
  }

  if (Array.isArray(job_skills)) {
    console.log("Array");
    skills.push(...job_skills);
  } else {
    console.log("Not Array");
    skills.push(job_skills);
  }

  if (Array.isArray(job_tags)) {
    console.log("Array");
    tags.push(...job_tags);
  } else {
    console.log("Not Array");
    tags.push(job_tags);
  }

  function addDays(date:Date, number:number) {
    const newDate = new Date(date);
    return new Date(newDate.setDate(date.getDate() + number));
  }


 async function submit_post(e:any){
    const submit_post = await axios.post("http://localhost:3000/post/create", {
      employer_profile_id: user.employer_profile.id,
      job_title: job_title,
      job_minimum_pay_range: job_minimum_pay_range,
      job_maximum_pay_range: job_maximum_pay_range,
      job_type: job_type,
      job_about: job_about,
      job_experience: job_experience,
      job_arrangement: job_arrangement,
      job_descriptions: job_descriptions,
      job_requirements: job_requirements,
      job_skills: job_skills,
      job_tags: job_tags,
      job_city: job_city,
      job_state: job_state,
      job_post_package: job_post_package,
      job_post_credit: parseInt(job_post_credit as string),
      job_post_duration:  parseInt(job_post_duration as string),
    })


  } 


  return (
    <DashboardLayout>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2
            id="applicant-information-title"
            className="text-lg leading-6 font-medium text-gray-900"
          >
            Applicant Information
          </h2>

          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <ul
                role="list"
                className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2"
              >
                <li className="col-span-1 flex shadow-sm rounded-md">
                  <div
                    className={classNames(
                      "bg-pink-600",
                      "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                    )}
                  >
                    <CurrencyDollarIcon
                      className="w-7 h-7"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                    <div className="flex-1 px-4 py-2 text-sm truncate">
                      <a className="text-gray-900 font-medium hover:text-gray-600">
                        Pay Range
                      </a>
                      <p className="text-gray-500">MYR {job_minimum_pay_range} - {job_maximum_pay_range}</p>
                    </div>
                    <div className="flex-shrink-0 pr-2">
                      <button
                        type="button"
                        className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      ></button>
                    </div>
                  </div>
                </li>

                <li className="col-span-1 flex shadow-sm rounded-md">
                  <div
                    className={classNames(
                      "bg-pink-600",
                      "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                    )}
                  >
                    <StarIcon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                    <div className="flex-1 px-4 py-2 text-sm truncate">
                      <a className="text-gray-900 font-medium hover:text-gray-600">
                        Experience
                      </a>
                      <p className="text-gray-500">{job_experience}</p>
                    </div>
                  </div>
                </li>

                <li className="col-span-1 flex shadow-sm rounded-md">
                  <div
                    className={classNames(
                      "bg-pink-600",
                      "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                    )}
                  >
                    <CalendarIcon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                    <div className="flex-1 px-4 py-2 text-sm truncate">
                      <a className="text-gray-900 font-medium hover:text-gray-600">
                        Posted Date
                      </a>
                      <p className="text-gray-500">
                        {String(
                          new Date(job_post_date).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        )}
                      </p>
                    </div>
                  </div>
                </li>

                <li className="col-span-1 flex shadow-sm rounded-md">
                  <div
                    className={classNames(
                      "bg-pink-600",
                      "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                    )}
                  >
                    <ClockIcon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                    <div className="flex-1 px-4 py-2 text-sm truncate">
                      <a className="text-gray-900 font-medium hover:text-gray-600">
                        Type
                      </a>
                      <p className="text-gray-500">{job_type}</p>
                    </div>
                  </div>
                </li>

                <li className="col-span-1 flex shadow-sm rounded-md">
                  <div
                    className={classNames(
                      "bg-pink-600",
                      "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                    )}
                  >
                    <MapIcon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                    <div className="flex-1 px-4 py-2 text-sm truncate">
                      <a className="text-gray-900 font-medium hover:text-gray-600">
                        Location
                      </a>
                      <p className="text-gray-500">
                        {job_city}, {job_state}
                      </p>
                    </div>
                  </div>
                </li>

                <li className="col-span-1 flex shadow-sm rounded-md">
                  <div
                    className={classNames(
                      "bg-pink-600",
                      "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                    )}
                  >
                    <BriefcaseIcon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                    <div className="flex-1 px-4 py-2 text-sm truncate">
                      <a className="text-gray-900 font-medium hover:text-gray-600">
                        Arrangement
                      </a>
                      <p className="text-gray-500">{job_arrangement}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Job About</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <div className="bg-white overflow-hidden border border-gray-200 rounded-md divide-y divide-gray-200 rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    {job_about}
                  </div>
                </div>
              </dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Job Skill</dt>
              <ul
                role="list"
                className="mt-2 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {skills.map((tag: any, index: any) => (
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
                      <CheckCircleIcon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                      <div className="flex-1 px-4 py-2 text-sm truncate">
                        <a className="text-gray-900 font-medium hover:text-gray-600">
                          {tag}
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                Job Description
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                <ul
                  role="list"
                  className="border border-gray-200 rounded-md divide-y divide-gray-200"
                >
                  {requirements.map((requirement, index) => (
                    <li
                      key={index}
                      className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                    >
                      <div className="w-0 flex-1 flex items-center">
                        <LightBulbIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-2 flex-1 w-0 truncate">
                          {requirement}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Job Requirement</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <ul
                  role="list"
                  className="border border-gray-200 rounded-md divide-y divide-gray-200"
                >
                  {descriptions.map((description, index) => (
                    <li
                      key={index}
                      className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                    >
                      <div className="w-0 flex-1 flex items-center">
                        <CheckCircleIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-2 flex-1 w-0 truncate">
                          {description}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>


            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Job Tags</dt>
              <ul
                role="list"
                className="mt-2 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <a
            onClick={(e:any) => {submit_post(e)}}
            className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg"
          >
            Submit
          </a>
        </div>
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
