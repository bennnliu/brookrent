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
import WelcomeHeader from '../components/welcome-header'
import FormInput from "@/components/form-input.jsx"
import FormHeader from "@/components/form-header.jsx"
import api from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import FormImageUpload from '@/components/form-image-upload';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; 
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const imageSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is 5MB.`)
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type),"Only .jpg, .jpeg, .png and .webp formats are supported.");

const formSchema = z.object({
    title: z.string().min(1, "Title is required"), 
    price: z.string().min(1, "Price is required"),
    address: z.string().min(1, "Address is required"),
    description: z.string().optional(),
    photos: z.array(imageSchema).min(1, "At least one image is required")
})

function ListPropertyPage() {
  const navigate = useNavigate()

  const onSubmit = async (data)=>{
    try{
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

      const res = await api.post("/lister/list", formData)
      navigate('/lister/dashboard')
      console.log(res)
    }
    catch(e){
      console.log(e)
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
        <WelcomeHeader/>
          <div className="flex justify-center pt-5">
          <Card className="w-full max-w-md">
            <FormHeader title="List Property" description="Enter your property's information" />
            <FieldSeparator />
              <CardContent>
                  <form id="list-property-form" onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Validation Errors:", errors))}>
                      <FieldGroup className="-space-y-6">
                          <FormInput name="title" control={form.control} label="Property Title" type="text" placeholder="Apartment located in Stonybrook"/>
                          <FormInput name="price" control={form.control} label="Price *" type="text" placeholder="$800 /mo" />
                          <FormInput name="address" control={form.control} label="Address *" type="text" placeholder="100 Nicolls Road, Stony Brook, NY 11790"/>
                          <FormInput name="description" control={form.control} label="Description" type="textarea" placeholder="2 Bedrooms, 2 Bathrooms, 1400 sqft, renovated, newly constructed, etc" />
                          <FormImageUpload name="photos" control={form.control}/>
                      </FieldGroup>
                  </form>
              </CardContent>
            <FieldSeparator />
            <CardFooter>
                <Button type="submit" form="list-property-form" className="mx-auto bg-[#990000] hover:bg-[#6B000D]">List Property</Button>
            </CardFooter>
          </Card>

        </div>
    </div>
  )
}

export default ListPropertyPage
