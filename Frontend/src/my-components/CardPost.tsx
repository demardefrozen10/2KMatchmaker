import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useFetch from "@/Hooks/useFetch";
import { useState } from "react";
import { format, parseISO } from "date-fns";


export interface CardProps {
  gameMode: string;
  platform: string;
  winPercentage: number;
  message: string;
  gamertag2K: string;
  postId: string;
  handleRefreshPosts?: () => void;
  datePosted: string;
  playersNeeded: number;
}

import Alert from "@/my-components/Alert";

export default function CardPost(props: CardProps) {
  const [isDeletedPost, setDeletedPost] = useState(false);

  console.log(props);


  const HandleDeletePost = () => {
    const {del} = useFetch("https://localhost:7170/api/SquadPost/");
    del(`deletePost/${props.postId}`).then(() => {
      try {
        setDeletedPost(true);
      }
      catch(error) {
        console.log("error!");
      }
      
  })
  };

  const formattedDate = format(parseISO(props.datePosted), "MMM d, yyyy 'at' h:mm a");

  return (
    <>
        <Card className="w-xs max-w-sm shadow-lg border-2 border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-black-50 pb-2">
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
            <p className="text-gray-800">{props.winPercentage}</p>
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
        <div className="bg-gray-100 p-2 rounded-md mt-2">
          <p className="text-sm italic text-gray-700">
            {props.message}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="mr-2 w-[100px]">Edit Post</Button>
      <AlertDialog>
  <AlertDialogTrigger><Button className="bg-red-700">Delete Post</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        Deleting this post will remove it from the squad browser and you will not be able to recover it. This action cannot be undone. 
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-red-700 w-[100px]" onClick={HandleDeletePost}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
      </CardFooter>
    </Card>
    {isDeletedPost && <Alert openTrigger={isDeletedPost} onClose={() => {
      setDeletedPost(false);
      props.handleRefreshPosts && props.handleRefreshPosts();
    }} message="Your post has been successfully deleted." alertType="Post successfully deleted."/>}
    </>

  );
}