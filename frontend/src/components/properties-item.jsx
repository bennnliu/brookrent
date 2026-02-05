import React, { useState } from 'react'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import ImageCarousel from './image-carousel'
import api from '@/lib/axios'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from './ui/separator'
import { MapPin, Mail, Phone, User, Home } from 'lucide-react'
import { toast } from "sonner";

function PropertiesItem({property}) { 
  const [isOpen,setIsOpen] = useState(false)
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCopy = (text, label) => {
    if (!text) return;

    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(`${label} copied to clipboard!`);
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  };

  const handleClick = async () => {
    setIsOpen(true)
    if (!details) { 
        setLoading(true)
        try {
            const id = property.id
            const res = await api.get(`/renter/properties/${id}`)
            setDetails(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
  }

  return (
    <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <div onClick={handleClick} className="cursor-pointer h-full">
              <Item variant="outline" className="h-full border rounded-xl overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 bg-white">
                <ItemContent className="p-0 flex flex-col h-full">
                  <div className="relative">
                      <ImageCarousel image_urls={property.image_urls}/>
                  </div>
                  <div className="p-1 flex flex-col gap-2 grow">
                      
                      <div className="text-green-700 text-2xl font-bold flex items-baseline">
                          {`$${property.price}`} 
                          <span className="text-sm font-medium text-gray-500 ml-1">/mo</span>
                      </div>

                      <ItemTitle className="text-sm  text-gray-900 truncate">
                          {property.title}
                      </ItemTitle>
                      
                      <div className="flex items-start text-gray-500 text-sm">
                          <MapPin className="w-4 h-4 mr-1.5 shrink-0" />
                          <span className="truncate">{property.address}</span>
                      </div>
                  </div>
              </ItemContent>
            </Item>
          </div>

          {isOpen && (
            <DialogContent className="sm:max-w-4xl p-0 gap-0 overflow-hidden rounded-2xl">
            <div className="max-h-[90vh] overflow-y-auto">
                <div className="p-6 pb-4">
                     <DialogTitle className="text-3xl font-bold text-gray-900">Property Information</DialogTitle>
                </div>
                
                <Item className="border-none shadow-none">
                    <ItemContent className="p-0">
                        {!loading && details && details.lister && (
                        <div className="flex flex-col">
                            <div className="w-full bg-gray-50">
                                <ImageCarousel ratio="aspect-[10/8]" className="w-full max-w-full" image_urls={details.image_urls} resizeMode='contain'/>
                            </div>
                            
                            <div className="p-6 md:p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <ItemDescription className="text-3xl font-bold text-green-700 flex items-center">
                                                {`$${details.price}`}
                                                <span className="text-lg font-medium text-gray-500 ml-1">/mo</span>
                                            </ItemDescription>
                                            <ItemDescription className="flex items-start font-semibold text-black gap-2">
                                                <Home className="w-5 h-5 text-gray-500"/>{details.title}
                                            </ItemDescription>
                                            <ItemDescription className="flex items-start text-gray-600 gap-2">
                                                <MapPin className="w-5 h-5 text-gray-500"/>{details.address}
                                            </ItemDescription>
                                        </div>

                                        <Separator className="md:hidden"/>
                                        
                                        <div className="space-y-3">
                                            <h3 className="font-semibold text-gray-900">Description</h3>
                                        <p className="text-base text-gray-600 leading-relaxed whitespace-normal">
                                             {details.description}
                                        </p>
                                        </div>
                                    </div>
                                        <div className="bg-gray-50 rounded-xl p-6 border h-fit">
                                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <User className="w-5 h-5"/> Property Owner
                                         </h3>
                                        <div className="space-y-4">
                                          <div className="flex items-center text-lg font-medium text-gray-900 gap-3">
                                              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border text-gray-500">
                                                  <User className="w-5 h-5"/>
                                              </div>
                                              {details.lister.name}
                                          </div>
                                          
                                          <Separator />
                                          
                                          <div className="space-y-3 pt-1">
                                              <ItemDescription className="flex items-center text-gray-600 gap-3 hover:text-blue-600 transition-colors cursor-pointer"
                                              onClick={() => handleCopy(details.lister.email, "Email")}>
                                                  <Mail className="w-4 h-4"/>{details.lister.email}
                                              </ItemDescription>
                                              <ItemDescription className="flex items-center text-gray-600 gap-3 hover:text-blue-600 transition-colors cursor-pointer"
                                                onClick={() => handleCopy(details.lister.number, "Phone number")}>
                                                  <Phone className="w-4 h-4"/>{details.lister.number}
                                              </ItemDescription>
                                          </div>
                                        </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                        )}
                    </ItemContent>
                </Item>
            </div>
            </DialogContent>
          )}
        </Dialog>
    </div>
  )
}

export default PropertiesItem