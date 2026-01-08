//Imports
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
import {Input} from "@/components/ui/input"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { House } from 'lucide-react';
import {Link} from 'react-router-dom'
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import {Controller,useForm } from "react-hook-form"

//Create a schema using zod that can be used by the form to validate data
const formSchema = z.object({
        name: z.string({ required_error: "Name is required" }),
        email: z.email("Enter in a proper email address"),
        password: z.string().min(8,"Password must be minimum 8 characters."),
        number: z.string().min(10, "Must be a valid phone number")
    })

//Logic that will be implemented when the user clicks submit
const onSubmit = (data) =>{
        console.log(data)
    }

//Signup Page
const SignUpPage = () => {

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
            {/*Main Header: House icon + Welcome Message*/}
            <div className="flex justify-center pt-10"> 
                <Card className="w-full max-w-md bg-[#990000]"> 
                    <CardContent className="flex items-center justify-center gap-3 text-2xl font-bold text-white"> 
                        <Link to="/"><House className="w-12 h-12 transition-transform duration-200 hover:scale-110" /></Link>
                        <span>Welcome to Brook Rents</span> 
                    </CardContent> 
                </Card>
            </div>
            {/*Sign Up Form*/}
            <div className="flex justify-center pt-5">
                <Card className="w-full max-w-md">
                    {/*Header*/}
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold ">Sign Up</CardTitle>
                        <CardDescription>Enter your information to sign up</CardDescription>
                        <CardAction> <Button variant="link"><Link to="/auth/login">Login</Link></Button></CardAction>
                    </CardHeader>
                     <FieldSeparator />
                    {/*Body*/}
                    <CardContent>
                        <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup className="space-y-0.5">
                            <Controller name="name" control={form.control} render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid} >
                                    <FieldLabel htmlFor="signup-form-name" >Name</FieldLabel>
                                    <Input {...field} aria-invalid={fieldState.invalid} id="signup-form-name" type="text" required></Input>
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]}></FieldError>)}
                                </Field>
                            )}/>
                            <Controller name="email" control={form.control} render={({field, fieldState}) => (       
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="signup-form-email">Email</FieldLabel>
                                    <Input {...field} aria-invalid={fieldState.invalid} id="signup-form-email" type="email" placeholder="johnnyappleseed@gmail.com" required></Input>
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]}></FieldError>)}
                                </Field>
                            )}/>         
                            <Controller name="password" control={form.control} render={({field, fieldState}) => (       
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="signup-form-password">Password</FieldLabel>
                                    <Input {...field} aria-invalid={fieldState.invalid} id="signup-form-password" type="password" placeholder="••••••••" required></Input>
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]}></FieldError>)}
                                </Field>
                            )}/>         
                            <Controller name="number" control={form.control} render={({field, fieldState}) => (  
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="signup-form-number">Number</FieldLabel>
                                    <Input {...field} aria-invalid={fieldState.invalid} id="number" type="signup-form-number" placeholder="(123)-456-7890"></Input>
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]}></FieldError>)}
                                </Field>
                                )}/>         
                        </FieldGroup>
                        </form>
                    </CardContent>
                     <FieldSeparator />
                    {/*Footer*/}
                    <CardFooter>
                        <Button type="submit" form="signup-form"className="mx-auto bg-[#990000] hover:bg-[#6B000D]">Sign Up</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
        
 
    )
}

export default SignUpPage