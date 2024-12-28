'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/redux/api/authApi';
import { storeUserInto } from '@/services/auth.service';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const router = useRouter();

  const [login] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const result = await login({ ...data }).unwrap();
      const statusCode = result?.statusCode;
      const accessToken = result?.data?.accessToken;

      console.log(statusCode, 'statusCode');
      console.log(accessToken, 'accessToken');

      if (statusCode === 200 && accessToken) {
        toast.success("Login Successfully");
        storeUserInto(accessToken);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error.message);
    } finally {
      reset();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg flex flex-col gap-4 border p-6 md:p-10 rounded-xl shadow-md bg-white">
        <h1 className="text-center text-2xl font-bold text-gray-800">Admin Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <Input
              id="phone_number"
              type="text"
              placeholder="Enter your phone number"
              {...register('phone_number', {
                required: 'Phone number is required',
              })}
              className="mt-1"
            />
            {errors.phone_number && (
              <span className="text-red-500 text-sm">{errors.phone_number.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
              })}
              className="mt-1"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>
          <div>
            <Button type="submit" className="w-full">
              LOGIN
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
