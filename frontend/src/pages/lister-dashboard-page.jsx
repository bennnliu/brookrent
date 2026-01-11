import React from 'react'
import ListingsItem from '@/components/listing-item.jsx'
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
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'


function ListerDashboardPage() {
    const [properties,setProperties] = useState([])
    const [isLogged, setIsLogged] = useState(false)
    const [message, setMessage] = useState("")
    const [hasListings, setHasListings] = useState(false)
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState("")
    
    useEffect(()=>{
        const getProperties = async() => {
            try{
                const userData = await api.get("/user/userdata")
                setIsLogged(true)
                let res = null
                switch(userData.data.role){
                    case "admin":  res = await api.get("/admin/listings"); setRole("admin");break;
                    case "lister": res = await api.get("/lister/listings"); setRole("lister");break;
                }
                setLoading(false)
                if(!res || res.data.length === 0){ 
                    setMessage("No Listings Available")
                    setHasListings(false)
                    return
                }
                setHasListings(true)
                setMessage("Available Listings")
                setProperties(res.data)
            }
            catch(e){
                setMessage("You do not have access.")
                setLoading(false)
                setIsLogged(false)
                console.log(e)
            }
        }
        getProperties()
    },[])

    const handleRemoveProperty = (id) => {
        const updatedList = properties.filter((property) => property.id !== id);
        
        setProperties(updatedList);

        if (updatedList.length === 0) {
            setHasListings(false);
            setMessage("No Listings Available");
        }
    };

  return (
    <div className="flex flex-col gap-25">
      {loading? 
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
          </div>: 
          <div>
            {isLogged ? 
                <div>
                <Card className="w-[80%] mx-auto mt-10 shadow-md  bg-[#ffffff]">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-[#990000]">{message}</CardTitle>
                    </CardHeader>
                    {hasListings? 
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {properties.map((property) => (
                                    <ListingsItem key={property.id} 
                                    property={property} 
                                    onDelete={handleRemoveProperty}
                                    />
                                ))}
                            </div>
                        </CardContent>:
                        <CardContent className="mx-auto pt-10">
                            <Button className="bg-[#990000] "><Link to={`/${role}/list`}>List Property</Link></Button>
                        </CardContent>
                        }
                </Card>
                </div>:
                 <div>
                    <Card className="w-[80%] mx-auto mt-10 shadow-md  bg-[#ffffff]">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-[#990000]">{message}</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            }
         </div>

      }

    </div>
  )
}

export default ListerDashboardPage
