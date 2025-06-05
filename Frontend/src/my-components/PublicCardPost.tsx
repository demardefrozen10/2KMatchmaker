import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";  
import { CardProps } from "./CardPost";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";


  export default function PublicCardPost(props: CardProps) {
    const formattedDate = format(parseISO(props.datePosted), "MMM d, yyyy 'at' h:mm a");

    const HandleMessage = () => {
      
    }

    return (
      <>
          <Card className="w-xs max-w-sm ml-1 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-shadow duration-300 h-115">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-gray-800 m-auto mt-2">Looking for {props.gameMode} game</CardTitle>
          <CardDescription className="text-gray-500"></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="text-sm">
              <span className="font-semibold text-gray-600">Game Mode:</span>
              <p className="text-gray-800">{props.gameMode}</p>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-gray-600">Platform:</span>
              <p className="text-gray-800">{props.platform}</p>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-gray-600">Win Percentage:</span>
              <p className="text-gray-800">{props.winPercentage}%</p>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-gray-600">Build:</span>
              <p className="text-gray-800">Center</p>
            </div>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-start items-center gap-1">
              <span className="text-sm font-semibold text-gray-600">Overall Rating:</span>
              <span className="text-lg font-bold text-green-600">99</span>
            </div>
            <div className="text-sm mt-1 flex justify-start items-center gap-1">
              <span className="font-semibold text-gray-600">Gamertag:</span>
              <p className="text-blue-600">{props.gamertag2K}</p>
            </div>
            <div className="text-sm mt-2 mb-2 flex justify-start items-center gap-1">
              <span className="font-semibold text-gray-600">Date posted:</span>
              <p className="text">{formattedDate}</p>
            </div>
            <div className="text-sm mt-2 mb-2 flex justify-start items-center gap-1">
              <span className="font-semibold text-gray-600">Players needed: </span>
              <p className="text">{props.playersNeeded}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-2 rounded-md mt-3">
            <p className="text-sm italic text-gray-700">
              {props.message}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
        <Button className="w-3xs" onClick={HandleMessage}>Message</Button>
        </CardFooter>
      </Card>
      </>
  
    );
  }