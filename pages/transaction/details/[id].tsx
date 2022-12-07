import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layout/layout.dashboard";
import { PaperClipIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import axios from "axios";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import { fetcher } from "../../../utils/fetcher/fetcher";
import Skeleton from "../component/skeleton";

function DynamicTransaction() {
    const [transaction, setTransaction] = useState<any>()
  const router = useRouter();
  const param = router.query.id;

  useEffect(() => {
    const fetch_unique_employer_transaction = async () => {
      const transaction = await axios.get(
        `http://localhost:3000/transaction/employer/transaction/${param}`,
        { withCredentials: true }
      );
      setTransaction(transaction.data);
    };

    fetch_unique_employer_transaction();
  }, [param]);
  return (
    <DashboardLayout>
      <>
       {transaction ? (<>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Transaction Detail
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {transaction.product_name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Status
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {transaction.transaction_status ? "Successful" : "Unsuccessful"}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Value
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {transaction.product_credit_value} Credit
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Price
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                RM {parseFloat(transaction.product_price).toFixed(2)}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {transaction.created_at}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Product Detail</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                  incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                  consequat sint. Sit id mollit nulla mollit nostrud in ea
                  officia proident. Irure nostrud pariatur mollit ad adipisicing
                  reprehenderit deserunt qui eu.
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Attachments
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul
                    role="list"
                    className="border border-gray-200 rounded-md divide-y divide-gray-200"
                  >
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <PaperClipIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-2 flex-1 w-0 truncate">
                          resume_back_end_developer.pdf
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Download
                        </a>
                      </div>
                    </li>
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <PaperClipIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-2 flex-1 w-0 truncate">
                          coverletter_back_end_developer.pdf
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Download
                        </a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
       </>) : <Skeleton/>}
      </>
    </DashboardLayout>
  );
}

export default DynamicTransaction;

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
  