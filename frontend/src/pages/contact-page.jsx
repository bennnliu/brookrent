import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Validation schema
const contactSchema = z.object({
  name: z.string("Name is required"),
  email: z.email("Enter in a proper email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const [isExist, setIsExist] = useState(false);

  //Logic that will be implemented when the user clicks submit
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await api.post("/contact", data);
      localStorage.setItem("jwtToken", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("name", res.data.name);
      navigate("/lister/dashboard");
      console.log(res);
    } catch (e) {
      setIsExist(true);
      console.log(e);
    }
  };

  //Create a form using react-hook-form and implements zod's validation data and default values
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  return (
    <div className="flex justify-center pt-5">
      <Card className="w-full max-w-md">
        <FormHeader
          title="Contac us"
          description={
            <>
              Send your inquiries here
              <br />
              Email: brookrents@gmail.com
              <br />
              IG: brookrent
            </>
          }
        />
        <FieldSeparator />
        <CardContent>
          <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-0.5">
              <FormInput
                name="name"
                control={form.control}
                label="Name *"
                type="text"
              />
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
                type="message"
                placeholder="At least 10 characters"
              />
            </FieldGroup>
          </form>
        </CardContent>
        <FieldSeparator />
        <CardFooter>
          <Button
            type="submit"
            form="contact-form"
            className="mx-auto bg-[#990000] hover:bg-[#6B000D]"
          >
            Send
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Contact;
