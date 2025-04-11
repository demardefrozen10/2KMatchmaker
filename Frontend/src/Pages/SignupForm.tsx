"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UserRoundPlus } from "lucide-react"
import useFetch from "@/Hooks/useFetch"


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(7, {
    message: "Password must be at least 7 characters, contain one letter, and one numeric value, and a special character."
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  confirmPassword: z.string(),
  confirmEmail: z.string()
}).superRefine(({ confirmPassword, password, confirmEmail, email }, ctx) => {  
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }

  if (confirmEmail !== email) {
    ctx.addIssue({
      code: "custom",
      message: "The emails did not match",
      path: ['confirmEmail']
    });
  }

});

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",      
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const {post} = useFetch("https://localhost:7170/api/user/");
    post("createAccount", {Username: values.username, Password: values.password, Email: values.email}).then(data => {
      if (data.status === 400) {
        form.setError("root", {
          type: "manual",
          message: "Username already exists."
        });
      }
      else {
        window.localStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("token"));
        localStorage.setItem("username", values.username);
        window.location.href = "/dashboard";
      }
    })
  }

  return (
    <div className="max-w-lg m-auto mt-10 mb-10 bg-sky-50 rounded-md pb-3 bg-stone-50 border border-gray-300">
        <div className="p-10">
    <h1 className="pb-6 font-bold">Sign Up</h1>
    <Form {...form}>
    {form.formState.errors.root && (
          <div className="rounded-md bg-red-50 p-3 border border-red-300 mb-6">
            <p className="text-sm text-red-500">{form.formState.errors.root.message}</p>
          </div>
        )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="2K SquadFinder" {...field} />
              </FormControl>
              <FormDescription>
                This is your username displayed when you make posts.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Email will be used to verify your account and for password resets.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="confirmEmail"
            render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Must be at least 8 characters long with one number and one special character.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
            )}
        />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit">Create Account <UserRoundPlus/></Button>
      </form>
    </Form>
    </div>
    </div>
  )
}


