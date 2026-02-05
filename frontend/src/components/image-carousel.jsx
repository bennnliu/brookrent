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

function ImageCarousel({className = "w-full", ratio = "h-[250px]" , image_urls, resizeMode = "cover"}) {
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
                                            className={`w-full h-full object-${resizeMode} object-center` }
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                
                <CarouselPrevious className="left-4 border-white/50 bg-white/80 hover:bg-white" />
                <CarouselNext className="right-4 border-white/50 bg-white/80 hover:bg-white" />
            </Carousel>
        </div>
    )
}

export default ImageCarousel
