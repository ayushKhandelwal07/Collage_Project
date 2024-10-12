import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import auth from '../assets/auth.png'
import axios from 'axios'
import { Input } from "@/components/ui/input"
import { useState } from "react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


// Zod schema to validate user input
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    const data = { email, password };
    try {
      const response = await axios.post('http://localhost:3000/login', data);
      console.log('Response:', response.data);
      if(response.data.msg === "err") {
        alert('Enter correct email and password');
      } 
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="flex justify-between flex-col items-center mt-10">
      <div className="grid grid-cols-2 gap-40 w-full max-w-7xl p-6"> 

        <div className="flex flex-col justify-start items-center">
          <img src={auth} alt="doctor" className="object-cover w-full h-auto" />
          <p className="mt-4 text-center text-gray-700 text-2xl font-bold">Welcome to our Login page <br /> <span className="font-normal">Great to see you again. Please log in to continue.</span></p>
        </div>

        <div className="flex justify-center content-center p-6 h-4/5 bg-white rounded-lg shadow-md border-black border-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
              <h1 className="text-3xl font-bold text-center">Login</h1>
              <h3 className="font-semibold text-slate-500 font-sla text-center">Please enter your email and password to log in to your account</h3>

              <div className="">
                
                {/* Email (Full Width) */}
                <div className="">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            className=''
                            placeholder="example@example.com"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setEmail(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Password (Full Width) */}
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            className='w-full'
                            type="password"
                            placeholder="******"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setPassword(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button onClick={onSubmit} className='bg-emerald-400 border-black border-2 text-white w-lg text-base rounded-lg p-2 font-semibold w-full transform transition hover:scale-105 hover:shadow-2xl'>Login</button>
              
              <div className="flex justify-center content-center">Already have an account? 
                <button 
                  onClick={() => window.location.href = 'http://localhost:5173/auth/signup'}  /* send to your main page*/
                  className="ml-2 underline decoration-slate-300 underline-offset-2 hover:text-green-900 hover:font-semibold"
                > 
                  Sign Up
                </button> 
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
