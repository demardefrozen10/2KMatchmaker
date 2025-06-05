import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import lebron from "../assets/lebron.png"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UserPlus, Search, MessageSquare } from "lucide-react"
import { useNavigate } from "react-router"

export default function Hero() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center">
            <div className="max-w-7xl mx-auto px-4 py-12 bg-stone-50 w-full mt-20 rounded-xl">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col gap-3 max-w-xl px-4 mb-8 md:mb-0">
                        <h1 className="text-3xl md:text-4xl font-medium mb-1">Find players to play with on NBA 2K25 MyCareer!</h1>
                        <div className="flex items-center">
                            <Button variant="outline" size="icon"><Check /></Button>
                            <p className="ml-2 mb-1">Find players to your skill level</p>
                        </div>
                        <div className="flex items-center">
                            <Button variant="outline" size="icon"><Check /></Button>
                            <p className="ml-2 mb-1">Easy to signup and use</p>
                        </div>
                        <div className="flex items-center">
                            <Button variant="outline" size="icon"><Check /></Button>
                            <p className="ml-2 mb-1">Free for all users</p>
                        </div>
                        <Button variant="outline" className="w-full md:w-auto" onClick={() => {
                            navigate("/signup");
                        }}>Get started today</Button>
                    </div>
                    <img 
                        src={lebron} 
                        alt="LeBron James"
                        className="max-w-xl md:max-w-md lg:max-w-lg"
                        />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16 w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <UserPlus className="w-12 h-12 text-red-50 mb-4" />
                    <CardTitle>1. Create Account</CardTitle>
                    <CardDescription>
                        Sign up in seconds with your email
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    Quick and easy registration process to get you started immediately
                </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <Search className="w-12 h-12 text-red-50 mb-4" />
                    <CardTitle>2. Find Players</CardTitle>
                    <CardDescription>
                        Browse posts or create your own to find teammates
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    Filter by game mode, position, and win percentage to find the perfect match
                </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <MessageSquare className="w-12 h-12 text-red-50 mb-4" />
                    <CardTitle>3. Connect & Play</CardTitle>
                    <CardDescription>
                        Message players and start gaming together
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    Easy communication system to coordinate games with your new teammates
                </CardContent>
                </Card>
                </div>
            </div>
        </div>
    )
}