import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";


export default function CardPost() {
    return <>
    <Card className="max-w-xs min-h-px">
    <CardHeader>
      <CardTitle>Looking for Rec Game</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Game Mode: Park - Rec</p>
      <p>Console: Xbox Series X</p>
      <p>Position Needed: C</p>
      <p>Build: Center</p>
      <p>Overall: 99</p>
      <p>2K Gamertag: demardefrozen</p>
      <p>Message: Looking for games for rec, let me know!</p>
    </CardContent>
    <CardFooter>
    <Button className="w-full">
            Delete Post
          </Button>
    </CardFooter>
  </Card>
  </>

  
}