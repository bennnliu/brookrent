import React from 'react'
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function EducationPage() {
  return (
<div className="flex flex-col">

      <main className="grow flex flex-col items-center justify-center text-center p-30">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          Page is currently under developement
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Please come back soon!
        </p>
        <Button
          asChild
          className="bg-[rgb(153,0,0)] hover:bg-[rgb(120,0,0)] text-white transition-colors"
        >
          <Link to="/">Go back to homepage</Link>
        </Button>
      </main>
    </div>
  )
}

export default EducationPage
