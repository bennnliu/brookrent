import React from 'react'
import PropertiesItem from '@/components/properties-item.jsx'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from '@/components/ui/skeleton.jsx'
import { useEffect , useState} from 'react'
import api from '@/lib/axios.jsx'

function PropertiesPage() {
    const [properties,setProperties] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getProperties = async() => {
            try{
                const res = await api.get("/renter/properties")
                setProperties(res.data)
            }
            catch(e){
            }
            finally{
                setLoading(false)
            }
            
        }
        getProperties()
    },[])

    return (
        <div className="flex flex-col gap-25">
            {loading && 
                <div className="flex flex-col items-center justify-center space-y-10 pt-35">
                    <Skeleton className="h-40 w-250 rounded-xl" />
                    <div className="flex flex-col space-y-10 items-center justify-center">
                        <Skeleton className="h-10 w-250" />
                        <Skeleton className="h-10 w-250" />
                    </div>
                    <div className="flex w-250 gap-4">
                        <Skeleton className="h-60 w-100" />
                        <div className="flex flex-col gap-5">
                            <Skeleton className="h-10 w-150" />
                            <Skeleton className="h-10 w-150" />
                            <Skeleton className="h-10 w-150" />
                            <Skeleton className="h-10 w-150" />
                        </div>
                    </div>
                </div>
            }
            <div>
            {!loading && (
                <Card className="w-[90%] mx-auto mt-10 shadow-md  bg-[#ffffff]">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-[#990000]">Available Properties</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {properties.map((property) => (
                                <PropertiesItem key={property.id} property={property} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
                )}
            </div>
        </div>
    )
            
}

export default PropertiesPage
