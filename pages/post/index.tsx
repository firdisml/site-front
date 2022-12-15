import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/layout.dashboard";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import { fetcher } from "../../utils/fetcher/fetcher";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  MailIcon,
} from "@heroicons/react/solid";
import axios from "axios";
import Skeleton from "./component/skeleton";
import { useRouter } from "next/router";

function Index({ user, page }: any) {
  const tabs = [
    { name: "Active", href: "/post", current: true },
    { name: "Pending", href: "/post/pending", current: false },
    { name: "Inactive", href: "/post/inactive", current: false },
  ];

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const [posts, set_posts] = useState<any>();

  const [posts_count, set_posts_count] = useState<any>();

  const start = page === 1 ? 0 : (page - 1) * 5;

  const last = Math.ceil(posts_count / 5);

  const employer_profile_id = user.employer_profile
    ? user.employer_profile.id
    : null;

  const router = useRouter();

  useEffect(() => {
    try {
      if (employer_profile_id === null) {
        set_posts([]);
        set_posts_count(0);
      } else {
        const fetch_posts = async () => {
          const fetch_posts = await axios.post(
            "http://localhost:3000/post/fetch",
            {
              employer_profile_id: employer_profile_id,
              post_visibility: false,
              post_pending: false,
              skip_content: start,
              take_content: 5,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          set_posts(fetch_posts.data);
        };

        const fetch_posts_count = async () => {
          const fetch_posts_count = await axios.post(
            "http://localhost:3000/post/count",
            {
              employer_profile_id: employer_profile_id,
              post_visibility: false,
              post_pending: false,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          set_posts_count(fetch_posts_count.data);
        };
        fetch_posts();
        fetch_posts_count();
      }
    } catch (error) {}
  }, [employer_profile_id, start]);

  function mobileTabs(e: any) {
    e.preventDefault();

    if (e.currentTarget.value === "Active") {
      router.push("/post");
    } else {
      router.push(`/post/${e.currentTarget.value.toLowerCase()}`);
    }
  }

  return (
    <DashboardLayout user={user}>
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Job Postings
            </h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <button
              type="button"
              onClick={(e) => {
                router.push("/post/create");
              }}
              className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create new job
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            onChange={(e) => {
              mobileTabs(e);
            }}
            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 "
            defaultValue={tabs.find((tab) => tab.current).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav
            className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
            aria-label="Tabs"
          >
            {tabs.map((tab, tabIdx) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700",
                  "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <span>{tab.name}</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    tab.current ? "bg-indigo-500" : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-0.5"
                  )}
                />
              </a>
            ))}
          </nav>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {posts && posts_count ? (
              posts.map((post: any, index: any) => (
                <li key={index}>
                  <a className="block hover:bg-gray-50">
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                          <picture>
                            <img
                              className="h-12 w-12 rounded-full"
                              src={"https://via.placeholder.com/150"}
                              alt=""
                            />
                          </picture>
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <p className="text-sm font-medium text-indigo-600 truncate">
                              {post.job_title}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <MailIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="truncate">{post.job_about}</span>
                            </p>
                          </div>
                          <div className="hidden md:block">
                            <div>
                              <p className="text-sm text-gray-900">
                                Applied on{" "}
                                <time dateTime={post.created_at}>
                                  {post.created_at}
                                </time>
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                <CheckCircleIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                  aria-hidden="true"
                                />
                                {post.job_type}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <ChevronRightIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </a>
                </li>
              ))
            ) : posts && !posts_count ? (
              <a>Nothing Here</a>
            ) : (
              <Skeleton />
            )}
          </ul>
        </div>
        {posts && posts_count ? (
          <nav
            className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
            aria-label="Pagination"
          >
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">
                  {posts_count < 5 ? posts_count : 5}
                </span>{" "}
                of <span className="font-medium">{posts_count}</span> results
              </p>
            </div>

            <div className="flex-1 flex justify-between sm:justify-end">
              <button
                type="button"
                onClick={() => router.push(`post?page=${page - 1}`)}
                disabled={page <= 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => router.push(`post?page=${page + 1}`)}
                disabled={page >= last}
                className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </nav>
        ) : null}
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
