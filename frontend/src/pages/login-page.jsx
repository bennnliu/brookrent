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
import WelcomeHeader from '../components/welcome-header'
import FormInput from "@/components/form-input.jsx"
import FormHeader from "@/components/form-header.jsx"
import api from "@/lib/axios";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
        email: z.email("Enter in a proper email address"),
        password: z.string().min(8,"Password must be minimum 8 characters."),
    })


function LoginPage() {
  //Logic that will be implemented when the user clicks submit
  const navigate = useNavigate()
  const onSubmit = async (data) =>{
      try{
          const res = await api.post("/user/login", data)
          localStorage.setItem("jwtToken", res.data.token)
          localStorage.setItem("email",res.data.email)
          localStorage.setItem("name", res.data.name)
          navigate('/lister/dashboard')
          console.log(res)
      }
      catch(e){
          console.log(e)
      }
  }
  //Create a form using react-hook-form and implements zod's validation data and default values
  const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
              email: "",
              password: "",
          },
  })

  return (
    <div>
        <WelcomeHeader/>
        <div className="flex justify-center pt-5">
          <Card className="w-full max-w-md">
            <FormHeader title="Login" description="Enter your information to login" path="/auth/signup"action="Sign Up"/>
            <FieldSeparator />
              <CardContent>
                  <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
                      <FieldGroup className="space-y-0.5">
                          <FormInput name="email" control={form.control} label="Email" type="email" placeholder="johnnyappleseed@gmail.com" required/>
                          <FormInput name="password" control={form.control} label="Password" type="password" placeholder="●●●●●●●●" required/>
                      </FieldGroup>
                  </form>
              </CardContent>
            <FieldSeparator />
            <CardFooter>
                <Button type="submit" form="login-form"className="mx-auto bg-[#990000] hover:bg-[#6B000D]">Login</Button>
            </CardFooter>
          </Card>

        </div>
    </div>
  )
}

export default LoginPage
