"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  GamepadIcon, 
  MonitorSmartphone, 
  UserIcon, 
  MessageSquareIcon, 
  KeyRoundIcon,
  Award
} from "lucide-react";
import { useNavigate } from "react-router";
import useFetch from "../Hooks/useFetch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TooltipProvider } from "@/components/ui/tooltip";
import {useState} from "react";

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

const formSchema = z.object({
  gameMode: z.string({
    required_error: "Please select a game mode"
  }),
  platform: z.string({
    required_error: "Please select a platform"
  }),
  winPercentage: z.string({
    required_error: "Please select your win percentage"
  }),
  position: z.string({
    required_error: "Please select the build you're looking for"
  }),
  build: z.string({
    required_error: "Please select your build"
  }),
  gamertag: z.string()
    .min(3, { message: "Gamertag must be at least 3 characters" })
    .max(20, { message: "Gamertag must be less than 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Gamertag can only contain letters, numbers, and underscores" }),
  message: z.string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(200, { message: "Message must be less than 200 characters" }),
});

export default function CreatePost() {
  const navigate = useNavigate();
  const [isPostSuccess, setIsPostSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameMode: "",
      platform: "",
      winPercentage: "",
      position: "",
      build: "",
      gamertag: "",
      message: "",      
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { post } = useFetch("https://localhost:7170/api/SquadPost/");
      post("savePost", {GameMode: values.gameMode, Platform: values.platform, WinPercentage: values.winPercentage, Gamertag2K:
        values.gamertag, Message: values.message, Username: localStorage.getItem("username")
      }).then(() => {
        setIsPostSuccess(true);
    })
    }
    catch (error) {
      form.setError("root", { message: "An unexpected error occurred" });
    }
  }

  const winPercentageItems = Array.from({length: 81}, (_, i) => (
    <SelectItem key={i+20} value={`${i+20}`}>{i+20}%</SelectItem>
  ));

  return (    
    <TooltipProvider>
      <div className="max-w-lg mx-4 sm:mx-auto mt-10 bg-sky-50 rounded-md pb-3 border border-gray-300 mb-20 shadow-md">
      <div className="p-10">
          <h1 className="pb-2 text-2xl font-bold text-gray-800 flex items-center">
            <KeyRoundIcon className="mr-2 text-blue-600" /> Create A Post
          </h1>
          <Form {...form}>
            <FormDescription className="mb-3 text-gray-600">
              Create a post to find players to play with.
            </FormDescription>

            {form.formState.errors.root && (
              <div className="rounded-md bg-red-50 p-3 border border-red-300 mb-6">
                <p className="text-sm text-red-500">
                  {form.formState.errors.root.message}
                </p>
              </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="gameMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <GamepadIcon className="text-blue-500" /> Game Mode
                    </FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Game Mode" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Rec", "Park", "Ante-Up", "Pro-Am", "Theater", "MyTeam Co-Op"].map(mode => (
                            <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <MonitorSmartphone className="text-green-500" /> Platform
                    </FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Platform" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Xbox Series X/S", "PS5", "PS4", "Xbox One", "PC"].map(platform => (
                            <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

        <FormField
        control={form.control}
        name="winPercentage"
        render={({ field }) => (
          <FormItem>
          <FormLabel><Award className="text-red-500"></Award> Win Percentage</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Percentage" />
              </SelectTrigger>
              <SelectContent>
                {winPercentageItems}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
        )}
        />

              <FormField
                control={form.control}
                name="gamertag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <UserIcon className="text-purple-500" /> 2K Gamertag
                    </FormLabel>
                    <FormDescription>
                      Ensure it is your 2K gamertag and not your console one.
                    </FormDescription>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter your 2K gamertag"
                        className="focus:ring-2 focus:ring-blue-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <MessageSquareIcon className="text-teal-500" /> Message
                    </FormLabel>
                    <FormDescription>
                      Brief message for anything you'd like others to know.
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Looking for 2 for rec, center and pg. Must have mic, etc."
                        className="resize-none focus:ring-2 focus:ring-blue-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full hover:bg-blue-600 transition-colors"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Posting..." : "Post"}
                <KeyRoundIcon className="ml-2" />
              </Button>
            </form>
          </Form>
        </div>
      </div>

      
 
      {isPostSuccess && (
  <AlertDialog open={isPostSuccess} onOpenChange={(open) => setIsPostSuccess(open)}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Post Created</AlertDialogTitle>
        <AlertDialogDescription>
          Your post has been successfully created!
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction onClick={() => navigate("/dashboard")}>
          Navigate to Dashboard
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)}
    </TooltipProvider>
  );
}