"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { KeyRound} from "lucide-react";
import { useNavigate } from "react-router";
import useFetch from "../Hooks/useFetch";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Please enter your username.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password.",
  }),
})

export default function LoginForm() {

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",      
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { post } = useFetch("https://localhost:7170/api/user/");
    post("authenticate", {Username: values.username, Password: values.password}).then(data => {
        if (data.status === 401) {
          form.setError("root", {
            type: "manual",
            message: "Invalid username or password."
          });
        }
        else {
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        }
    })

    }

  return (
    <div className="max-w-lg m-auto mt-30 bg-sky-50 rounded-md pb-3 bg-stone-50 border border-gray-300 ">
        <div className="p-10">
    <h1 className="pb-6 font-bold">Login</h1>
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
                <Input {...field} />
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
                  <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit">Login <KeyRound/></Button>
      </form>
    </Form>
    </div>
    </div>
    
  )
}


