import React from "react";
import DashboardLayout from "../../../layout/layout.dashboard";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();

  const {
    query: {description, requirement, skill},
  } = router

  const requirements = []

  const skills = []

  const descriptions = []


  if(Array.isArray(description)){
    console.log('Array')
    descriptions.push(...description)
  }
  else{
    console.log('Not Array')
    descriptions.push(description)
  }

  if(Array.isArray(requirement)){
    console.log('Array')
    requirements.push(...requirement)
  }
  else{
    console.log('Not Array')
    requirements.push(requirement)
  }

  if(Array.isArray(skill)){
    console.log('Array')
    skills.push(...skill)
  }
  else{
    console.log('Not Array')
    skills.push(skill)
  }



  return <DashboardLayout>
    {descriptions ? descriptions.map((map, index) => (<div key={index}><a>{map}</a></div>)): null}
    {skills ? skills.map((map, index) => (<div key={index}><a>{map}</a></div>)): null}
    {requirements ? requirements.map((map, index) => (<div key={index}><a>{map}</a></div>)): null}
  </DashboardLayout>;
}

export default Index;
