import React from "react";
import DashboardLayout from "../../../layout/layout.dashboard";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();

  const {
    query: {input},
  } = router

  const array = []
  array.push(input)

  return <DashboardLayout>{array ? array.map((map, index) => (<a key={index}>{map}</a>)): null}</DashboardLayout>;
}

export default Index;
