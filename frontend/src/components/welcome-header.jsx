import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Link} from 'react-router-dom'
import { House } from 'lucide-react';

const WelcomeHeader = () => {
    return(
        <div className="flex justify-center pt-10"> 
            <Card className="w-full max-w-md bg-[#990000]"> 
                <CardContent className="flex items-center justify-center gap-3"> 
                    <Link to="/"><House className="w-14 h-14 transition-transform duration-200 hover:scale-110 text-white"/></Link>
                    <span className="text-4xl font-bold text-white">Brook Rents</span> 
                </CardContent> 
            </Card>
        </div>
    )
}

export default WelcomeHeader
