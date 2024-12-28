// 'use client';

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '../ui/input';
// import { Label } from '../ui/label';
// import { useCreateUserMutation } from '@/redux/api/authApi';
// import toast from 'react-hot-toast';

// const AddUserPage = () => {
//     const [createUser] = useCreateUserMutation();

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm({
//         defaultValues: {
//             phone_number: '',
//             name: '',
//             password: '',
//         },
//     });

//     const onSubmit = async (data) => {
//         try {
//             const response = await createUser(data).unwrap();
//             console.log('User created successfully:', response);
//             toast.success("Add User Successfully")
//             reset();
//         } catch (error) {
//             console.error('Error creating user:', error.message);
//         }
//     };

//     return (
//         <div className="container mx-auto -mt-20 p-6 flex justify-center items-center min-h-screen">
//             <Card className="w-full max-w-md shadow-lg">
//                 <CardHeader>
//                     <CardTitle className="text-2xl font-bold text-gray-800">
//                         Create New User
//                     </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                         {/* Name */}
//                         <div>
//                             <Label htmlFor="name" className="text-gray-700">
//                                 Name
//                             </Label>
//                             <Input
//                                 id="name"
//                                 {...register('name', {
//                                     required: 'Name is required.',
//                                 })}
//                                 type="text"
//                                 placeholder="Enter full name"
//                                 className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
//                             />
//                             {errors.name && (
//                                 <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
//                             )}
//                         </div>

//                         {/* Phone Number */}
//                         <div>
//                             <Label htmlFor="phone_number" className="text-gray-700">
//                                 Phone Number
//                             </Label>
//                             <Input
//                                 id="phone_number"
//                                 {...register('phone_number', {
//                                     required: 'Phone number is required.',
//                                     pattern: {
//                                         value: /^\d{10,15}$/,
//                                         message: 'Enter a valid phone number.',
//                                     },
//                                 })}
//                                 type="text"
//                                 placeholder="Enter phone number"
//                                 className={`mt-1 ${errors.phone_number ? 'border-red-500' : ''}`}
//                             />
//                             {errors.phone_number && (
//                                 <p className="text-sm text-red-500 mt-1">
//                                     {errors.phone_number.message}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Password */}
//                         <div>
//                             <Label htmlFor="password" className="text-gray-700">
//                                 Password
//                             </Label>
//                             <Input
//                                 id="password"
//                                 {...register('password', {
//                                     required: 'Password is required.',
//                                     minLength: {
//                                         value: 6,
//                                         message: 'Password must be at least 6 characters long.',
//                                     },
//                                 })}
//                                 type="password"
//                                 placeholder="Enter password"
//                                 className={`mt-1 ${errors.password ? 'border-red-500' : ''}`}
//                             />
//                             {errors.password && (
//                                 <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
//                             )}
//                         </div>

//                         {/* Submit Button */}
//                         <div className="flex justify-center">
//                             <Button type="submit" className="w-full text-white">
//                                 Create User
//                             </Button>
//                         </div>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default AddUserPage;



'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useCreateUserMutation } from '@/redux/api/authApi';
import toast from 'react-hot-toast';

const AddUserPage = () => {
    const [createUser] = useCreateUserMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            phone_number: '',
            name: '',
            password: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await createUser(data).unwrap();
            console.log('User created successfully:', response);
            toast.success('User added successfully!');
            reset();
        } catch (error) {
            console.error('Error creating user:', error.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 sm:py-12 flex justify-center -mt-20 items-center min-h-screen">
            <Card className="w-full max-w-lg shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl md:text-2xl font-bold text-gray-800 text-center">
                        Create New User
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name */}
                        <div>
                            <Label htmlFor="name" className="text-gray-700">
                                Name
                            </Label>
                            <Input
                                id="name"
                                {...register('name', {
                                    required: 'Name is required.',
                                })}
                                type="text"
                                placeholder="Enter full name"
                                className={`mt-1 ${
                                    errors.name ? 'border-red-500' : ''
                                } w-full`}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <Label htmlFor="phone_number" className="text-gray-700">
                                Phone Number
                            </Label>
                            <Input
                                id="phone_number"
                                {...register('phone_number', {
                                    required: 'Phone number is required.',
                                    pattern: {
                                        value: /^\d{10,15}$/,
                                        message: 'Enter a valid phone number.',
                                    },
                                })}
                                type="text"
                                placeholder="Enter phone number"
                                className={`mt-1 ${
                                    errors.phone_number ? 'border-red-500' : ''
                                } w-full`}
                            />
                            {errors.phone_number && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.phone_number.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <Label htmlFor="password" className="text-gray-700">
                                Password
                            </Label>
                            <Input
                                id="password"
                                {...register('password', {
                                    required: 'Password is required.',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long.',
                                    },
                                })}
                                type="password"
                                placeholder="Enter password"
                                className={`mt-1 ${
                                    errors.password ? 'border-red-500' : ''
                                } w-full`}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                className="w-full text-white rounded-md"
                            >
                                Create User
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddUserPage;
