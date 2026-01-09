import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Link} from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { useState } from "react"

const FormHeader = ({title,description,path,action}) => {
    return(
        <CardHeader>
            <CardTitle className="text-2xl font-bold ">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <CardAction> 
              <Button variant="link"><Link to={path}>{action}</Link></Button> 
            </CardAction> 
        </CardHeader>)
}

export default FormHeader
