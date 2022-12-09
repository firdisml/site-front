import React from "react";
import DashboardLayout from "../../../layout/layout.dashboard";
import { useRouter } from "next/router";
import { PaperClipIcon } from "@heroicons/react/solid";
import { TagIcon } from "@heroicons/react/solid";

import {
  CurrencyDollarIcon,
  StarIcon,
  ClockIcon,
  CalendarIcon,
  MapIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  LightBulbIcon,
  KeyIcon
} from "@heroicons/react/outline";

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

function Index() {
  const router = useRouter();

  const {
    query: { description, requirement, skill },
  } = router;

  const requirements = [];

  const skills = [];

  const descriptions = [];

  if (Array.isArray(description)) {
    console.log("Array");
    descriptions.push(...description);
  } else {
    console.log("Not Array");
    descriptions.push(description);
  }

  if (Array.isArray(requirement)) {
    console.log("Array");
    requirements.push(...requirement);
  } else {
    console.log("Not Array");
    requirements.push(requirement);
  }

  if (Array.isArray(skill)) {
    console.log("Array");
    skills.push(...skill);
  } else {
    console.log("Not Array");
    skills.push(skill);
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
                        Salary
                      </a>
                      <p className="text-gray-500">Members</p>
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
                      <p className="text-gray-500">Members</p>
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
                        Date
                      </a>
                      <p className="text-gray-500">Members</p>
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
                      <p className="text-gray-500">Members</p>
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
                      <p className="text-gray-500">Members</p>
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
                        Style
                      </a>
                      <p className="text-gray-500">Members</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                Job Skill
              </dt>
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
                        < CheckCircleIcon
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
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Job Description</dt>
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
              <dt className="text-sm font-medium text-gray-500">
                Job Requirement
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                <ul
                  role="list"
                  className="border border-gray-200 rounded-md divide-y divide-gray-200"
                >
                  {skills.map((skill, index) => (
                    <li
                      key={index}
                      className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                    >
                      <div className="w-0 flex-1 flex items-center">
                        <KeyIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-2 flex-1 w-0 truncate">
                          {skill}
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
            href="#"
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
