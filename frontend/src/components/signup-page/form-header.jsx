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

const FormHeader = () => {
    return(
        <CardHeader>
            <CardTitle className="text-2xl font-bold ">Sign Up</CardTitle>
            <CardDescription>Enter your information to sign up</CardDescription>
            <CardAction> <Button variant="link"><Link to="/auth/login">Login</Link></Button></CardAction>
        </CardHeader>)
}

export default FormHeader
