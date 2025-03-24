import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import lebron from "../assets/lebron.png"
export default function Hero() {
    return <>
    <div className="flex mx-auto px-4 py-12 justify-center items-center bg-stone-50 max-w-410 mt-20 flex-col md:flex-row">
    <div className="flex flex-col gap-3 max-w-100">
    <h1 className="text-4xl font-medium mb-1">Find players to play with on NBA 2K25 MyCareer!</h1>
    <div className="flex">
    <Button variant="outline" size="icon"><Check /></Button><p className="ml-2 mb-1">Find players to your skill level</p>
    </div>
    <div className="flex">
    <Button variant="outline" size="icon"><Check /></Button><p className="ml-2 mb-1">Easy to signup and use</p>
    </div>
    <div className="flex">
    <Button variant="outline" size="icon"><Check /></Button><p className="ml-2 mb-1 text-sm">Free for all users</p>
    </div>
    <Button variant="outline">Get started today</Button>
    </div>
    <img src={lebron}></img>
    </div>
    </>
}