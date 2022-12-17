import React, { useState } from "react";
import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  BellIcon,
  MenuIcon,
  XIcon,
  CreditCardIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import camelCase from "camelcase";

import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
} from "@heroicons/react/solid";

const positions = [
  {
    id: 1,
    title: "Back End Developer",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 2,
    title: "Front End Developer",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
];

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Home", href: "#", current: false },
  { name: "Posting", href: "/post", current: false },
  { name: "Reload", href: "/reload", current: false },
  { name: "Verification", href: "/verification", current: true },
  { name: "Transaction", href: "/transaction", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function DashboardLayout({ ...props }) {
  const employer_profile_id = props.user.employer_profile
    ? props.user.employer_profile.id
    : null;

  const verification_status = props.user.verification_status;

  const router = useRouter();

  const employer_profile = props.user.employer_profile;

  return (
    <>
      <div className="min-h-full">
        <Popover as="header" className="pb-24 bg-indigo-600">
          {({ open }) => (
            <>
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative py-5 flex items-center justify-center lg:justify-between">
                  {/* Logo */}
                  <div className="absolute left-0 flex-shrink-0 lg:static">
                    <a href="#">
                      <span className="sr-only">Workflow</span>
                      <picture>
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                          alt="Workflow"
                        />
                      </picture>
                    </a>
                  </div>

                  {/* Right section on desktop */}
                  <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                    <button
                      type="button"
                      className="flex-shrink-0 p-1 text-indigo-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-4 relative flex-shrink-0">
                      <div>
                        <Menu.Button className="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                          <span className="sr-only">Open user menu</span>
                          <picture>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </picture>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                  {/* Search */}
                  <div className="flex-1 min-w-0 px-12 lg:hidden">
                    <div className="max-w-xs w-full mx-auto">
                      <label htmlFor="desktop-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative text-white focus-within:text-gray-600">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <input
                          id="desktop-search"
                          className="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                          placeholder="Search"
                          type="search"
                          name="search"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Menu button */}
                  <div className="absolute right-0 flex-shrink-0 lg:hidden">
                    {/* Mobile menu button */}
                    <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Popover.Button>
                  </div>
                </div>
                <div className="hidden lg:block border-t border-white border-opacity-20 py-5">
                  <div className="grid grid-cols-3 gap-8 items-center">
                    <div className="col-span-2">
                      <nav className="flex space-x-4">
                        {navigation &&
                        employer_profile_id && props.user.verification_submission && props.user.verification_status ? (
                          navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current ? "text-white" : "text-indigo-100",
                                "text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </a>
                          ))
                        ) : (
                          <a
                            href={navigation[3].href}
                            className={classNames(
                              navigation[3] ? "text-white" : "text-indigo-100",
                              "text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                            )}
                            aria-current={
                              navigation[3].current ? "page" : undefined
                            }
                          >
                            {navigation[3].name}
                          </a>
                        )}
                      </nav>
                    </div>
                    <div>
                      <div className="max-w-md w-full mx-auto">
                        <label htmlFor="mobile-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative text-white focus-within:text-gray-600">
                          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <SearchIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            id="mobile-search"
                            className="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                            placeholder="Search"
                            type="search"
                            name="search"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div className="lg:hidden">
                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay className="z-20 fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel
                      focus
                      className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                    >
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                        <div className="pt-3 pb-2">
                          <div className="flex items-center justify-between px-4">
                            <div>
                              <picture>
                                <img
                                  className="h-8 w-auto"
                                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                  alt="Workflow"
                                />
                              </picture>
                            </div>
                            <div className="-mr-2">
                              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Close menu</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                              </Popover.Button>
                            </div>
                          </div>
                          <div className="mt-3 px-2 space-y-1">
                            <a
                              href="#"
                              className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                            >
                              Home
                            </a>
                            <a
                              href="#"
                              className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                            >
                              Profile
                            </a>
                            <a
                              href="#"
                              className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                            >
                              Resources
                            </a>
                            <a
                              href="#"
                              className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                            >
                              Company Directory
                            </a>
                            <a
                              href="#"
                              className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                            >
                              Openings
                            </a>
                          </div>
                        </div>
                        <div className="pt-4 pb-2">
                          <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                              <picture>
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={user.imageUrl}
                                  alt=""
                                />
                              </picture>
                            </div>
                            <div className="ml-3 min-w-0 flex-1">
                              <div className="text-base font-medium text-gray-800 truncate">
                                {user.name}
                              </div>
                              <div className="text-sm font-medium text-gray-500 truncate">
                                {user.email}
                              </div>
                            </div>
                            <button
                              type="button"
                              className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <span className="sr-only">
                                View notifications
                              </span>
                              <BellIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                          <div className="mt-3 px-2 space-y-1">
                            {userNavigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </>
          )}
        </Popover>
        <main className="-mt-24 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Page title</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                  <h2 className="sr-only" id="section-1-title">
                    Section title
                  </h2>
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    {props.children}
                  </div>
                </section>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-2-title">
                  {employer_profile && props.user.verification_submission && props.user.verification_status ? (
                    <div className="rounded-lg bg-white overflow-hidden shadow">
                      <div className="">
                        <div className=" h-32 overflow-hidden">
                          <picture>
                            <img
                              className="object-cover object-top w-full"
                              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                              alt="Mountain"
                            />
                          </picture>
                        </div>
                        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                          <picture>
                            <img
                              className="object-cover object-center h-32"
                              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                              alt="Woman looking front"
                            />
                          </picture>
                        </div>
                        <div className="text-center mt-2">
                          <span className="bg-green-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-green-700 dark:text-gray-300">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-5 h-5 mt-0.5 mr-0.5 "
                            >
                              <path
                                stroke-linecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Verified
                          </span>
                          <span className="bg-green-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-green-700 dark:text-gray-300">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-5 h-5 mt-0.5 mr-0.5 pb-0.5"
                            >
                              <path
                                stroke-linecap="round"
                                strokeLinejoin="round"
                                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                              />
                            </svg>

                            {camelCase(props.user.account_type, {
                              pascalCase: true,
                            })}
                          </span>
                          <h2 className="mt-4 font-bold text-lg">
                            {props.user.employer_profile.employer_name}
                          </h2>
                          <p className="text-gray-500 text-sm">
                            {props.user.email}
                          </p>
                        </div>
                        <ul
                          role="list"
                          className="mt-0.5 p-5 mb-0.8 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-1"
                        >
                          <li className="col-span-1 flex shadow-sm rounded-md">
                            <div className="bg-indigo-600 flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md">
                              <CreditCardIcon className="h-6 w-6" />
                            </div>
                            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                              <div className="flex-1 px-4 py-2 text-sm truncate">
                                <a className="text-gray-900 font-medium hover:text-gray-600">
                                  Credit Balance
                                </a>
                                <p className="text-black-500">
                                  {
                                    props.user.employer_profile.employer_credit
                                      .employer_credit_balance
                                  }
                                </p>
                              </div>
                              <div className="flex-shrink-0 pr-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    router.push("/reload");
                                  }}
                                  className="w-8 h-8 bg-white inline-flex items-center justify-center text-black-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  <span className="sr-only">Open options</span>
                                  <PlusCircleIcon className="h-6 w-6" />
                                </button>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg bg-white overflow-hidden shadow">
                      <div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-md">
                          <ul role="list" className="divide-y divide-gray-200">
                          <li>
                                <a href="#" className="block hover:bg-gray-50">
                                  <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                      <p className="text-sm font-medium text-indigo-600 truncate">
                                        Verification Submission
                                      </p>
                                      <div className="ml-2 flex-shrink-0 flex">
                                       
                                          {props.user.verification_submission ? (<p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Submitted</p>) : (<p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Not Submitted</p>)}

                                      </div>
                                    </div>
                                    <div className="sm:flex sm:justify-between">
                                      <div className="mt-4 sm:flex">
                                      <p className="mb-3 font-light text-gray-500 dark:text-gray-400">Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</p>
                                      </div>
                                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"></div>
                                    </div>
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a href="#" className="block hover:bg-gray-50">
                                  <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                      <p className="text-sm font-medium text-indigo-600 truncate">
                                        Verification Status
                                      </p>
                                      <div className="ml-2 flex-shrink-0 flex">
                                      
                                        {props.user.verification_status? (<p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Verified</p>) : (<p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Not Verified</p>)}

                                      </div>
                                    </div>
                                    <div className="sm:flex sm:justify-between">
                                      <div className="mt-4 sm:flex">
                                      <p className="mb-3 font-light text-gray-500 dark:text-gray-400">Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</p>
                                      </div>
                                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"></div>
                                    </div>
                                  </div>
                                </a>
                              </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
              <span className="block sm:inline">
                &copy; 2021 Tailwind Labs Inc.
              </span>{" "}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default DashboardLayout;
