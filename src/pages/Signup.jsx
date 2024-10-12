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
  firstName: z.string().min(1, { message:"" }),
  lastName: z.string(),
  gender: z.enum(["Male", "Female"], { message: "Select a gender" }),
  age: z.string().min(1, { message: "Age must be greater than 0" }),
  height: z.string(),
  phone: z.string(),
  pincode: z.string().min(6, { message: "Pincode must be at least 6 digits" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export default function Signup() {
      const [email, setEmail] = useState("");
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [gender, setGender] = useState("");
      const [age, setAge] = useState("");
      const [height, setHeight] = useState("");
      const [phone, setPhone] = useState("");
      const [password, setPassword] = useState("");

      const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                  email: "",
                  firstName: "",
                  lastName: "",
                  gender: "",
                  age: "",
                  height: "",
                  phone: "",
                  password: "",
            },
      });

const onSubmit = async () => {
      const data = { email, firstName, lastName, gender, age, height, phone, password };
      try {
            const response = await axios.post('http://localhost:3000/signup', data);
            console.log('Response:', response.data);
            if(response.data.msg === "exists") {
                  alert('User already exists');
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
                        <p className="mt-4 text-center text-gray-700 text-2xl font-bold">Welcome to our signup page <br /> <span className="font-normal">Please fill in the form to create an account.</span></p>
                  </div>
    
                  <div className="flex justify-end w-full max-w-md p-6 space-y-8 bg-white rounded-lg shadow-md border-black border-2">
                        <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                    
                                    {/* Email (Full Width) */}
                                    <div className="col-span-2">
                                    <FormField
                                          control={form.control}
                                          name="email"
                                          render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                <Input
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

                                    {/* First Name and Last Name */}
                                    <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                    <FormItem>
                                          <FormLabel>First Name</FormLabel>
                                          <FormControl>
                                          <Input
                                          placeholder="John"
                                          {...field}
                                          onChange={(e) => {
                                                field.onChange(e);
                                                setFirstName(e.target.value);
                                          }}
                                          />
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                                    )}
                                    />

                                    <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                    <FormItem>
                                          <FormLabel>Last Name</FormLabel>
                                          <FormControl>
                                          <Input
                                          placeholder="Doe"
                                          {...field}
                                          onChange={(e) => {
                                                field.onChange(e);
                                                setLastName(e.target.value);
                                          }}
                                          />
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                                    )}
                                    />

                                    {/* Gender (Full Width) */}
                                    <div className="col-span-2">
                                    <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                          <FormItem>
                                          <FormLabel>Gender</FormLabel>
                                          <FormControl>
                                          <select
                                                {...field}
                                                className="w-full p-2 border rounded"
                                                onChange={(e) => {
                                                field.onChange(e);
                                                setGender(e.target.value);
                                                }}
                                          >
                                                <option value="" disabled>Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                          </select>
                                          </FormControl>
                                          <FormMessage />
                                          </FormItem>
                                    )}
                                    />
                                    </div>

                                    {/* Age and Height */}
                                    <FormField
                                    control={form.control}
                                    name="age"
                                    render={({ field }) => (
                                    <FormItem>
                                          <FormLabel>Age</FormLabel>
                                          <FormControl>
                                          <Input
                                          placeholder="25"
                                          {...field}
                                          onChange={(e) => {
                                                field.onChange(e);
                                                setAge(e.target.value);
                                          }}
                                          />
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                                    )}
                                    />

                                    <FormField
                                    control={form.control}
                                    name="height"
                                    render={({ field }) => (
                                    <FormItem>
                                          <FormLabel>Height (in cm)</FormLabel>
                                          <FormControl>
                                          <Input
                                          placeholder="170"
                                          {...field}
                                          onChange={(e) => {
                                                field.onChange(e);
                                                setHeight(e.target.value);
                                          }}
                                          />
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                                    )}
                                    />

                                    {/* Phone Number (Full Width) */}
                                    <div className="col-span-2">
                                    <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                          <FormItem>
                                          <FormLabel>Phone Number</FormLabel>
                                          <FormControl>
                                          <Input
                                                placeholder="1234567890"
                                                {...field}
                                                onChange={(e) => {
                                                field.onChange(e);
                                                setPhone(e.target.value);
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
                              <button onClick={onSubmit} className='bg-emerald-400 border-black border-2 text-white w-lg text-base rounded-lg p-2 font-semibold w-full transform transition hover:scale-105 hover:shadow-2xl'>Sign Up</button>
                              
                              <div className="flex justify-center content-center">Already have an account? 
                                    <button 
                                          onClick={() => window.location.href = 'http://localhost:5173/auth/login'} 
                                          className="ml-2 underline decoration-slate-300 underline-offset-2 hover:text-green-900 hover:font-semibold"
                                    > 
                                          Login
                                    </button> 
                              </div>
                              </form>
                        </Form>

                  </div>

            </div>

      </div>
)
}
