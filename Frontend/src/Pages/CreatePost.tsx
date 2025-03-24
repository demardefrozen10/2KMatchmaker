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
import { KeyRound} from "lucide-react";
import { useNavigate } from "react-router";
import useFetch from "../Hooks/useFetch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { JSX } from "react";


const formSchema = z.object({
    gameMode: z.string(),
    platform: z.string(),
    winPercentage: z.string(),
    position: z.string(),
    build: z.string(),
    gamertag: z.string(),
    message: z.string(),
  })

export default function CreatePost() {

  const navigate = useNavigate();

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
  })
  function onSubmit(values: z.infer<typeof formSchema>) {

    }

  const items: JSX.Element[] = [];
  for (let i = 20; i<= 100; i++) {
    items.push(<SelectItem value={"i"}>{i}%</SelectItem>);
  }

  return (
    <div className="max-w-lg m-auto mt-10 bg-sky-50 rounded-md pb-3 bg-stone-50 border border-gray-300  mb-20">
        <div className="p-10">
    <h1 className="pb-2 font-bold">Create A Post</h1>
    <Form {...form}>
    <FormDescription className="mb-3">
     Create a post to find players to play with.
    </FormDescription>

    {form.formState.errors.root && (
          <div className="rounded-md bg-red-50 p-3 border border-red-300 mb-6">
            <p className="text-sm text-red-500">{form.formState.errors.root.message}</p>
          </div>
        )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       <FormField
  control={form.control}
  name="gameMode"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Game Mode</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Select a Game Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Rec">Rec</SelectItem>
            <SelectItem value="Park">Park</SelectItem>
            <SelectItem value="Ante-Up">Ante-Up</SelectItem>
            <SelectItem value="Pro-Am">Pro-Am</SelectItem>
            <SelectItem value="Theater">Theater</SelectItem>
            <SelectItem value="MyTeam Co-Op">MyTeam Co-Op</SelectItem>
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
      <FormLabel>Platform</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Xbox Series">Xbox Series X/S</SelectItem>
            <SelectItem value="PS5">PS5</SelectItem>
            <SelectItem value="PS4">PS4</SelectItem>
            <SelectItem value="Xbox One">Xbox One</SelectItem>
            <SelectItem value="PC">PC</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="build"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Your Build</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Build" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PG">PG</SelectItem>
            <SelectItem value="SG">SG</SelectItem>
            <SelectItem value="SF">SF</SelectItem>
            <SelectItem value="PF">PF</SelectItem>
            <SelectItem value="C">C</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="position"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Build You're Looking For</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Build" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PG">PG</SelectItem>
            <SelectItem value="SG">SG</SelectItem>
            <SelectItem value="SF">SF</SelectItem>
            <SelectItem value="PF">PF</SelectItem>
            <SelectItem value="C">C</SelectItem>
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
    <FormLabel>Win Percentage</FormLabel>
    <FormControl>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <SelectTrigger>
          <SelectValue placeholder="Percentage" />
        </SelectTrigger>
        <SelectContent>
          {items}
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
      <FormLabel>2K Gamertag</FormLabel>
      <FormDescription>
      Ensure it is your 2K gamertag and not your console one.
      </FormDescription>
      <FormControl>
    <Input {...field} />
    </FormControl>
    <FormMessage></FormMessage>
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="message"
  render={({ field }) => (
    
    <FormItem>
      <FormLabel>Message</FormLabel>
      <FormDescription>
      Brief message for anything you'd like others to know.
      </FormDescription>
      <FormControl>
      <Textarea
                  placeholder="e.g Looking for 2 for rec, center and pg. must have mic etc."
                  className="resize-none"
                  {...field}
                />
    </FormControl>
    <FormMessage></FormMessage>
    </FormItem>
  )}
/>
        <Button type="submit">Post <KeyRound/></Button>
      </form>
    </Form>
    </div>
    </div>
    
  )
}


