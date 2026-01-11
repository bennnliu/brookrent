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
import { useNavigate,useParams } from "react-router-dom";
import FormImageUpload from '@/components/form-image-upload';
import {Spinner} from "@/components/ui/spinner.jsx";
import { useState, useEffect} from 'react';

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
    photos: z.array(imageSchema).optional()
})

function UpdatePropertyPage () {
  const [isListed,setIsListed] = useState(false)
  const [listing,setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentExistingImages, setCurrentExistingImages] = useState([]);
  const navigate = useNavigate()
  const {id} = useParams();

  const {control, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: "",
        price: "",
        address: "",
        description: "",
        photos: []
    },
  });
  useEffect(()=>{
      const getListing= async () =>{
        try{
           const userData = await api.get("/user/userdata")
           let res = null
           switch(userData.data.role){
              case "admin":  res = await api.get(`/admin/listings/${id}`); break;
              case "lister": res = await api.get(`/lister/listings/${id}`); break;
            }
            setListing(res.data)
        }
        catch(e){
          console.log(e)
        }
        finally {
        setLoading(false) 
      }
    } 
    getListing()},[id])

    // 2. UPDATE RESET LOGIC
  useEffect(() => {
    if (listing) {
      // Sync the state with database when listing loads
      setCurrentExistingImages(listing.image_urls || []);
      
      reset({
        title: listing.title,
        price: listing.price.toString(),
        address: listing.address,
        description: listing.description,
        photos: [] 
      });
    }
  }, [listing, reset]);

  // 3. UPDATED ONSUBMIT
  const onSubmit = async (data) => {
    try {
      setIsListed(true);
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("price", data.price);
      formData.append("address", data.address);
      formData.append("description", data.description || "");

      // Append New Photos
      if (data.photos && data.photos.length > 0) {
        data.photos.forEach((file) => {
          formData.append("photos", file);
        });
      }

      formData.append("existing_images", JSON.stringify(currentExistingImages));

      // Check Total (Kept + New)
      const totalImages = currentExistingImages.length + (data.photos?.length || 0);
      if (totalImages === 0) {
         alert("You must have at least one image on the property.");
         setIsListed(false);
         return; 
      }

      const userData = await api.get("/user/userdata");
      const role = userData.data.role;
      await api.put(`/${role}/listings/${id}`, formData);
      navigate(`/${role}/dashboard`);

    } catch (e) {
      console.log(e);
    } finally {
      setIsListed(false);
    }
  }



  if (loading) {
      return <div className="flex justify-center pt-20"><Spinner /></div>
  }

  if (!listing) {
    return <div className="text-center pt-20">Property not found.</div>
  }

  return (
    <div>
        <div className="flex justify-center pt-5">
          <Card className="w-full max-w-md">
            <FormHeader title="List Property" description="Enter your property's information" />
            <FieldSeparator />
              <CardContent>
                  <form id="update-property-form" onSubmit={handleSubmit(onSubmit, (errors) => console.log("Validation Errors:", errors))}>
                      <FieldGroup className="-space-y-6">
                          <FormInput name="title" control={control} label="Property Title" type="text"  />
                          <FormInput name="price" control={control} label="Price *" type="text" />
                          <FormInput name="address" control={control} label="Address *" type="text" />
                          <FormInput name="description" control={control} label="Description" type="textarea" />
                          <FormImageUpload name="photos" control={control} existingImages={currentExistingImages} 
                          onRemoveExisting={(indexToRemove) => {
                             setCurrentExistingImages(prev => prev.filter((_, i) => i !== indexToRemove));
                          }}/>
                      </FieldGroup>
                  </form>
              </CardContent>
            <FieldSeparator />
            <CardFooter>
                      <Button 
                            type="submit" 
                            form="update-property-form" 
                            disabled={isListed} 
                            className="mx-auto bg-[#990000] hover:bg-[#6B000D] flex items-center gap-2"
                        >
                            {isListed && <Spinner />}
                            Update Property
                        </Button>
            </CardFooter>
          </Card>

        </div>
    </div>
  )
}

export default UpdatePropertyPage
