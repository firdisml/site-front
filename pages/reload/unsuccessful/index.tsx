import Link from 'next/link'
import React from 'react'
import DashboardLayout from '../../../layout/layout.dashboard'
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import { fetcher } from '../../../utils/fetcher/fetcher';
import { useRouter } from 'next/router'

function Index({user}:any) {
    const router = useRouter()
  return (
    <DashboardLayout user = {user}>
                              <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <a href="/" className="inline-flex">
              <span className="sr-only">Workflow</span>
              <picture>
              <img
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                alt=""
              />
              </picture>
            </a>
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">404 error</p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Unsuccesful!</h1>
              <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
              <div className="mt-6">
                <Link href={`/reload`} className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                    Retry<span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
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
