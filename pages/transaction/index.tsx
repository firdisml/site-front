import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/layout.dashboard";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import axios from "axios";
import { fetcher } from "../../utils/fetcher/fetcher";
import Skeleton from "./component/skeleton";
import { useRouter } from "next/router";

/* This example requires Tailwind CSS v2.0+ */
import {
  CheckCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  MailIcon,
} from "@heroicons/react/solid";

function Index({ user, page }: any) {
  const router = useRouter();
  const [transactions, set_transactions] = useState<any>();
  const [transactions_count, set_transactions_count] = useState<any>();
  const employer_profile_id = user.employer_profile.id;
  const start = page === 1 ? 0 : (page - 1) * 5;
  const last = Math.ceil(transactions_count / 5);

  useEffect(() => {
    const fetch_transactions = async () => {
      const fetch = await axios.post(
        "http://localhost:3000/transaction/employer/transaction",
        {
          employer_profile_id: employer_profile_id,
          skip_content: start,
          take_content: 5,
        },
        { withCredentials: true }
      );
      console.log(fetch.data);
      set_transactions(fetch.data);
    };

    const fetch_transactions_count = async () => {
      const count = await axios.post(
        "http://localhost:3000/transaction/employer/transaction/count",
        { employer_profile_id: employer_profile_id },
        { withCredentials: true }
      );
      console.log(count.data);
      set_transactions_count(count.data);
    };

    fetch_transactions();
    fetch_transactions_count();
  }, [employer_profile_id, start]);

  return (
    <DashboardLayout>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {transactions && transactions_count ? (
            transactions.map((transaction: any) => (
              <li key={transaction.id}>
                <a
                  href={`/transaction/details/${transaction.session_id}`}
                  className="block hover:bg-gray-50"
                >
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="text-sm font-medium text-indigo-600 truncate">
                            {transaction.product_name}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <MailIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="truncate">
                              {transaction.transaction_status
                                ? "Success"
                                : "Failed"}
                            </span>
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-gray-900">
                              Applied on{" "}
                              <time dateTime={transaction.created_at}>
                                {transaction.created_at}
                              </time>
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <CheckCircleIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                aria-hidden="true"
                              />
                              {transaction.transaction_status
                                ? "Success"
                                : "Failed"}
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
          ) : (
            <Skeleton />
          )}
        </ul>
        <nav
          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">
                {transactions_count < 5 ? transactions_count : 5}
              </span>{" "}
              of <span className="font-medium">{transactions_count}</span>{" "}
              results
            </p>
          </div>
          <div className="flex-1 flex justify-between sm:justify-end">
            <button
              type="button"
              onClick={() => router.push(`transaction?page=${page - 1}`)}
              disabled={page <= 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => router.push(`transaction?page=${page + 1}`)}
              disabled={page >= last}
              className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
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

  if (!user) return { redirect: { statusCode: 307, destination: "/signin" } };

  return { props: { user: user, page: +page } };
};
