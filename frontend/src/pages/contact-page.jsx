import { Button } from "@/components/ui/button";
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
} from "@/components/ui/field";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form-input.jsx";
import FormHeader from "@/components/form-header.jsx";
import api from "../lib/axios";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

// Validation schema
const contactSchema = z.object({
  email: z.email("Enter in a proper email address"),
  message: z.string().min(1,"Please enter a message")
});

const Contact = () => {
  const [isLoading,setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const res = await api.post("/user/contact", data);
      toast.success("Message has been successfully")
    } catch (e) {
      toast.error("Failed to send message. Please try again.");
    }
    finally{
      setIsLoading(false)
    }
  };

  //Create a form using react-hook-form and implements zod's validation data and default values
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });
  return (
    <div className="flex justify-center pt-5">
      <Card className="w-full max-w-md">
        <FormHeader
          title="Contact Us"
          description={
            <>
              Send your inquiries here
            </>
          }
        />
        <FieldSeparator />
        <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
            <FieldGroup className="space-y-0.5">
              <FormInput
                name="email"
                control={form.control}
                label="Email *"
                type="email"
                placeholder="johnnyappleseed@gmail.com"
              />
              <FormInput
                name="message"
                control={form.control}
                label="Message *"
                type="textarea"
                placeholder="Enter your message"
              />
            </FieldGroup>
          </CardContent>
          <FieldSeparator className={"pt-10"}/>
            <CardFooter>
              <Button
                type="submit"
                form="contact-form"
                disabled={isLoading} 
                className="mx-auto bg-[#990000] hover:bg-[#6B000D]">
                {isLoading && <Spinner />}
                Send
              </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default Contact;
