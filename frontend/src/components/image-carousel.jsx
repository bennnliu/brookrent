import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function ImageCarousel({className = "max-w-xs", ratio = "aspect-square", image_urls}) {
    return (
    <div className="w-full" onClick={(e) => {if (e.target.closest("button")) {e.stopPropagation();}}}> 
            <Carousel opts={{ loop: true }} className={`w-full mx-auto ${className}`}> 
                <CarouselContent>
                    {image_urls.map((url, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className={`flex ${ratio} items-center justify-center p-0 overflow-hidden rounded-md`}>
                                        <img 
                                            src={url} 
                                            alt={`House view ${index + 1}`}
                                            className="w-full h-full object-cover" 
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                
                <CarouselPrevious className="left-2 border-gray-300" />
                <CarouselNext className="right-2 border-gray-300" />
            </Carousel>
        </div>
    )
}

export default ImageCarousel
