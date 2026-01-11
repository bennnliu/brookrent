import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm } from "react-hook-form"
import FormInput from "@/components/form-input.jsx"
import FormHeader from "@/components/form-header.jsx"
import api from '../lib/axios'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {Spinner} from "@/components/ui/spinner.jsx";

//Create a schema using zod that can be used by the form to validate data
const formSchema = z.object({
        name: z.string("Name is required" ),
        email: z.email("Enter in a proper email address"),
        password: z.string().min(8,"Password must be minimum 8 characters."),
        number: z.string().min(10,"Must be a valid phone number").max(14, "Must be a valid phone number")
    })

//Signup Page
const SignUpPage = () => {
    const [isExist,setIsExist] = useState(false)
    const [isSignedUp,setIsSignedUp] = useState(false)

    //Logic that will be implemented when the user clicks submit
    const navigate = useNavigate()
    const onSubmit = async (data) =>{
        try{
            setIsSignedUp(true)
            const res = await api.post("/user/signup", data)
            const userData = await api.get("/user/userdata")
            switch(userData.data.role){
            case "admin": navigate('/admin/dashboard');break;
            case "lister": navigate('/lister/dashboard');break;
                }
            console.log(res)
        }
        catch(e){
            setIsExist(true)
            console.log(e)
        }
        finally{
             setIsSignedUp(false)
        }
    }

    //Create a form using react-hook-form and implements zod's validation data and default values
    const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                name: "",
                email: "",
                password: "",
                number: "",
            },
        })
    return(
        <div >
            <div className="flex justify-center pt-5">
                <Card className="w-full max-w-md">
                    <FormHeader title="Sign Up" description="Enter your information to sign up" path="/auth/login" action="Login"/>
                    <FieldSeparator />
                    <CardContent>
                        <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup className="space-y-0.5">
                                <FormInput name="name" control={form.control} label="Name *"type="text" />
                                <FormInput name="email" control={form.control} label="Email *" type="email" placeholder="johnnyappleseed@gmail.com" />
                                <FormInput name="password" control={form.control} label="Password *" type="password" placeholder="●●●●●●●●" />
                                <FormInput name="number" control={form.control} label="Number *" type="tel" placeholder="(123)-456-7890" />
                            </FieldGroup>
                        </form>
                        {isExist && <FieldError className="pt-4 text-sm">User already exists</FieldError>} 
                    </CardContent>
                     <FieldSeparator />
                    <CardFooter>
                        <Button 
                            type="submit" 
                            form="signup-form" 
                            disabled={isSignedUp} 
                            className="mx-auto bg-[#990000] hover:bg-[#6B000D] flex items-center gap-2"
                        >
                            {isSignedUp && <Spinner />}
                            Sign Up
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default SignUpPage