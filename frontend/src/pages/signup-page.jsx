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

const SignUpPage = () => {

    return(
        <div className="flex min-h-screen w-full items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold ">Sign Up</CardTitle>
                    <CardDescription>Enter your information to sign up</CardDescription>
                    <CardAction> <Button variant="link" className="hover:bg-[rgba(155,144,144,0.4)]">Login</Button> </CardAction>
                </CardHeader>
                <CardContent>
                    <FieldSet>
                        <FieldGroup className="space-y-0.5">
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input id="name" type="text"></Input>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input id="email" type="email" placeholder="johnnyappleseed@gmail.com"></Input>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                                <Input id="password" type="password" placeholder="••••••••"></Input>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="number">Number</FieldLabel>
                                <Input id="number" type="number" placeholder="123-456-7890"></Input>
                            </Field>
                        </FieldGroup>
                </FieldSet>
                </CardContent>
                <CardFooter>
                    <Button type="submit"className="mx-auto bg-[rgb(153,0,0)]">Sign Up</Button>
                </CardFooter>
        </Card>
        </div>
 
    )
}

export default SignUpPage