import React, { useState } from 'react'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import ImageCarousel from './image-carousel'
import { useNavigate } from 'react-router-dom'
import api from '@/lib/axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from './ui/separator'

function PropertiesItem({property}) { 
  const [isOpen,setIsOpen] = useState(false)
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(false)

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
    <div >
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <div onClick={handleClick}>
              <Item variant="outline" className="hover:scale-110 transition-transform duration-200 bg-white">
                <ItemContent>
                    <ImageCarousel image_urls={property.image_urls}/>
                    <ItemTitle className="text-xl">{property.title}</ItemTitle>
                    <ItemDescription>{property.address}</ItemDescription>
                    <ItemDescription className="text-sm">{property.description}</ItemDescription>
                    <ItemDescription>{`$${property.price}`}</ItemDescription>
                </ItemContent>
            </Item>
          </div>
          {isOpen && <DialogContent className="sm:max-w-3xl ">
            <DialogTitle className="text-4xl font-bold text-[#990000]">Property Information</DialogTitle>
            <Item>
               <ItemContent >
                  <ImageCarousel ratio="aspect-video" className="w-full max-w-full" image_urls={property.image_urls}/>
                  <Separator/>
                  <div className='flex justify-around'>
                    <div className="flex flex-col justify-center gap-2">
                    <ItemTitle className="text-4xl text-[#000000] font-bold underline">Details</ItemTitle>
                    <ItemDescription className="text-2xl text-[#000000] font-bold">{`$${property.price}/mo`}</ItemDescription>
                    <ItemDescription className="text-2xl text-[#000000] ">{property.title}</ItemDescription>
                    <ItemDescription className="text-2xl text-[#000000] ">{property.address}</ItemDescription>
                    <ItemDescription className="text-2xl  ">{property.description}</ItemDescription>
                  </div>
                  {!loading && details && details.lister && <div className="flex flex-col  gap-2">
                    <ItemTitle className="text-4xl text-[#000000] font-bold underline">Contact</ItemTitle>
                    <ItemDescription className="text-2xl text-[#000000] font-bold">{details.lister.name}</ItemDescription>
                    <ItemDescription className="text-2xl text-[#000000] ">{details.lister.email}</ItemDescription>
                    <ItemDescription className="text-2xl text-[#000000] ">{details.lister.number}</ItemDescription>
                  </div>}
                  </div>
                  
               </ItemContent>
            </Item>
          </DialogContent>}
        </Dialog>
        
    </div>
  )
}

export default PropertiesItem
