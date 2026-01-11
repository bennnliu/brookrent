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
import {Trash, SquarePen, MapPin, Mail, Phone, User, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button'

function ListingsItem({property, onDelete}) { 
  const [isOpen,setIsOpen] = useState(false)
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const navigate = useNavigate()

  const handleClick = async () => {
    setIsOpen(true)
    if (!details) {
        setLoading(true)
        try {
            const userData = await api.get("/user/userdata")
            let res = null
            const id = property.id
            switch(userData.data.role){
                    case "admin":  res = await api.get(`/admin/listings/${id}`);break;
                    case "lister": res = await api.get(`/lister/listings/${id}`);break;
            }
            setDetails(res.data)
            console.log(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
  }
  const handleDeleteMenuClick = (e) => {
    e.stopPropagation(); 
    setIsDeleteOpen(true);
  }

  const handleDeleteClick = async()=>{
    try {
        const userData = await api.get("/user/userdata");
        const role = userData.data.role;
        await api.delete(`/${role}/listings/${property.id}`);
        setIsDeleteOpen(false)
        if (onDelete) {
            onDelete(property.id);
        }
        
    } catch (error) {
  }
  }

  const handleEditClick = async (e) => {
   e.stopPropagation(); 
    try {
        const userData = await api.get("/user/userdata");
        const role = userData.data.role;
        
        navigate(`/${role}/update/${property.id}`);
        
    } catch (error) {
  }
}

  return (
    <div>
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent>
              <DialogTitle>Delete Listing</DialogTitle>
              <p className='flex justify-between'>
                Are you sure you want to delete this?
                <Button className={"bg-[#990000] hover:bg-[#6B000D]"} onClick={handleDeleteClick}>Delete</Button>
                </p>
          </DialogContent>
       </Dialog>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <div onClick={handleClick} className="cursor-pointer h-full">
              <Item variant="outline" className="h-full border rounded-xl overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 bg-white">
                <ItemContent className="p-0 flex flex-col h-full">
                  <div className="relative">
                        <div className="absolute top-3 right-3 z-10 flex gap-2">
                        <Button 
                            onClick={handleEditClick}
                            className="p-2 bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 rounded-full shadow-sm transition-all"
                        >
                            <SquarePen className="w-5 h-5" />
                        </Button>

                        <button 
                            onClick={handleDeleteMenuClick}
                            className="p-2 bg-white/90 hover:bg-white text-gray-700 hover:text-red-600 rounded-full shadow-sm transition-all"
                        >
                            <Trash className="w-5 h-5" />
                        </button>
                      </div>
                      <ImageCarousel image_urls={property.image_urls}/>
                  </div>
                  <div className="p-5 flex flex-col gap-2 grow">
                      <div className="text-green-700 text-2xl font-bold flex items-baseline">
                          {`$${property.price}`} 
                          <span className="text-sm font-medium text-gray-500 ml-1">/mo</span>
                      </div>

                      <ItemTitle className="text-sm text-gray-900 truncate">
                          {property.title}
                      </ItemTitle>
                      
                      <div className="flex items-center text-gray-500 text-sm">
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
                                <ImageCarousel ratio="aspect-video" className="w-full max-w-full" image_urls={details.image_urls}/>
                            </div>
                            
                            <div className="p-6 md:p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <ItemDescription className="text-3xl font-bold text-green-700 flex items-center">
                                                {`$${details.price}`}
                                                <span className="text-lg font-medium text-gray-500 ml-1">/mo</span>
                                            </ItemDescription>
                                            <ItemDescription className="flex items-center font-semibold text-black gap-2">
                                                <Home className="w-5 h-5 text-gray-500"/>{details.title}
                                            </ItemDescription>
                                            <ItemDescription className="flex items-center text-gray-600 gap-2">
                                                <MapPin className="w-5 h-5 text-gray-500"/>{details.address}
                                            </ItemDescription>
                                        </div>

                                        <Separator className="md:hidden"/>
                                        
                                        <div className="space-y-3">
                                            <h3 className="font-semibold text-gray-900">Description</h3>
                                            <ItemDescription className="text-base text-gray-600 leading-relaxed">
                                                {details.description}
                                            </ItemDescription>
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
                                              <ItemDescription className="flex items-center text-gray-600 gap-3 hover:text-blue-600 transition-colors cursor-pointer">
                                                  <Mail className="w-4 h-4"/>{details.lister.email}
                                              </ItemDescription>
                                              <ItemDescription className="flex items-center text-gray-600 gap-3 hover:text-blue-600 transition-colors cursor-pointer">
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

export default ListingsItem