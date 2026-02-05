import React from 'react'
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
import FormImageUpload from '@/components/form-image-upload';
import {Spinner} from "@/components/ui/spinner.jsx";
import { useState } from 'react';
import { toast } from "sonner";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; 
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.string().min(1, "Price is required").regex(/^[0-9]+$/, "Price must contain only numbers"),
  address: z.string().min(1, "Address is required"),
  description: z.string().optional(),
  photos: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .refine(
      (files) => files.every((file) => file.size <= MAX_UPLOAD_SIZE),
      "Max image size is 5MB." 
    )
    .refine(
      (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});


function ListPropertyPage() {
  const [isListed,setIsListed] = useState(false)
  const navigate = useNavigate()
  
  const onSubmit = async (data)=>{
    try{
      setIsListed(true)
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("price", data.price);
      formData.append("address", data.address);
      formData.append("description", data.description || ""); 

      if (data.photos && data.photos.length > 0) {
        data.photos.forEach((file) => {
          formData.append("photos", file);
        });
      }

      const submitPropertyPromise = async () => {
        const userData = await api.get("/user/userdata");

        if (userData.data.role === "admin") {
            await api.post("/admin/list", formData);
            return "/admin/dashboard"; 
        } else if (userData.data.role === "lister") {
            await api.post("/lister/list", formData);
            return "/lister/dashboard";
        } else {
            throw new Error("Invalid User Role");
        }
    };

        toast.promise(submitPropertyPromise(), {
            loading: "Uploading property details...",
            success: (redirectPath) => {
                navigate(redirectPath);
                return "Property listed successfully!";
            },
            error: (err) => {
                return "Error: " + (err.response?.data?.message || "Failed to list property");
            }
        });
    }
    catch(e){
    }
    finally{
       setIsListed(false)
    }
  }
  const form = useForm({
    resolver: zodResolver(formSchema),
      defaultValues: {
          title: "",
          price: "",
          address: "",
          description: "",
          photos: []
      },
    })

  return (
    <div>
          <div className="flex justify-center pt-5">
          <Card className="w-full max-w-md">
            <FormHeader title="List Property" description="Enter your property's information" />
            <FieldSeparator />
              <CardContent>
                  <form id="list-property-form" onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Validation Errors:", errors))}>
                      <FieldGroup className="-space-y-6">
                          <FormInput name="title" control={form.control} label="Property Title" type="text" placeholder="Apartment located in Stonybrook"/>
                          <FormInput name="price" control={form.control} label="Price *" type="text" placeholder="Enter rent per month" />
                          <FormInput name="address" control={form.control} label="Address *" type="text" placeholder="100 Nicolls Road, Stony Brook, NY 11790"/>
                          <FormInput name="description" control={form.control} label="Description" type="textarea" placeholder="Description of the property 
e.g, bedrooms, bathrooms, sqft, utility, flooring, rules, etc" />
                          <FormImageUpload name="photos" control={form.control}/>
                      </FieldGroup>
                  </form>
              </CardContent>
            <FieldSeparator />
            <CardFooter>
                      <Button 
                            type="submit" 
                            form="list-property-form" 
                            disabled={isListed} 
                            className="mx-auto bg-[#990000] hover:bg-[#6B000D] flex items-center gap-2"
                        >
                            {isListed && <Spinner />}
                            List Property
                        </Button>
            </CardFooter>
          </Card>

        </div>
    </div>
  )
}

export default ListPropertyPage
