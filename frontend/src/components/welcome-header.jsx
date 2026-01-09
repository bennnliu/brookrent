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
                <CardContent className="flex items-center justify-center gap-3 text-2xl font-bold text-white"> 
                    <Link to="/"><House className="w-12 h-12 transition-transform duration-200 hover:scale-110" /></Link>
                    <span>Welcome to Brook Rents</span> 
                </CardContent> 
            </Card>
        </div>
    )
}

export default WelcomeHeader
