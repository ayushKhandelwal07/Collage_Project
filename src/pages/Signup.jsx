import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// Zod schema to validate user input
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string(),
  gender: z.enum(["Male", "Female"], { message: "Select a gender" }),
  age: z.number().min(1, { message: "Age must be greater than 0" }),
  height: z.number().min(1, { message: "Enter a valid height" }),
  phone: z.string().min(10, { message: "Enter a valid phone number" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
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
      const [city, setCity] = useState("");
      const [country, setCountry] = useState("");
      const [pincode, setPincode] = useState("");
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
                  city: "",
                  country: "",
                  pincode: "",
                  password: "",
            },
      });

  const onSubmit = (data) => {
    console.log(data) // backend request
  }

return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="grid  grid-cols-2 gap-40">
                  <div className="bg-red-200">
                        hewnen
                  </div>
                  <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md bg-red-200">
                  <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                    type="number"
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
                                    type="number"
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

                              {/* City and Country */}
                              <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                              <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                    <Input
                                    placeholder="New York"
                                    {...field}
                                    onChange={(e) => {
                                          field.onChange(e);
                                          setCity(e.target.value);
                                    }}
                                    />
                                    </FormControl>
                                    <FormMessage />
                              </FormItem>
                              )}
                              />

                              <FormField
                              control={form.control}
                              name="country"
                              render={({ field }) => (
                              <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                    <Input
                                    placeholder="United States"
                                    {...field}
                                    onChange={(e) => {
                                          field.onChange(e);
                                          setCountry(e.target.value);
                                    }}
                                    />
                                    </FormControl>
                                    <FormMessage />
                              </FormItem>
                              )}
                              />

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
                        <button className='bg-emerald-700 border-green-700 text-white w-lg text-base rounded-lg p-2 border-none font-semibold w-full transform transition hover:scale-105 hover:shadow-2xl'>Next page</button>

                        </form>
                        </Form>

                  </div>

            </div>

      </div>
)
}
