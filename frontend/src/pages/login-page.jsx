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
import api from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {Spinner} from "@/components/ui/spinner.jsx";
import { useAuth } from "@/lib/AuthContext.jsx";

const formSchema = z.object({
        email: z.email("Enter in a proper email address"),
        password: z.string().min(8,"Password must be minimum 8 characters."),
    })


function LoginPage() {
  const [isExist,setIsExist] = useState(true)
  const [isLogin,setIsLogin] = useState(false)
  const { login } = useAuth();

  //Logic that will be implemented when the user clicks submit
  const navigate = useNavigate()
  const onSubmit = async (data) =>{
      try{
          setIsLogin(true)
          await api.post("/user/login", data)
          const userData = await api.get("/user/userdata")
          await login(userData.data);
          switch(userData.data.role){
            case "admin": navigate('/admin/dashboard');break;
            case "lister": navigate('/lister/dashboard');break;
                }
      }
      catch(e){
        setIsExist(false)
      }
      finally{
        setIsLogin(false)
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
                  {!isExist && <FieldError className="pt-4 text-sm">Invalid Credentials</FieldError>} 
              </CardContent>
            <FieldSeparator />
            <CardFooter>
              <Button 
                type="submit" 
                form="login-form" 
                disabled={isLogin} 
                className="mx-auto bg-[#990000] hover:bg-[#6B000D] flex items-center gap-2"
              >
                {isLogin && <Spinner />}
                Login
              </Button>
            </CardFooter>
          </Card>

        </div>
    </div>
  )
}

export default LoginPage
