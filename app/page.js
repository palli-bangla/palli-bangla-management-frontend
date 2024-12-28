'use client'
import Loading from "@/components/Loading/Loading";
import LoginPage from "@/components/LoginPage/LoginPage";

import { Button } from "@/components/ui/button";
import { useGetUsersQuery } from "@/redux/api/userApi";
import toast from "react-hot-toast";

export default function Home() {

  console.log(process.env.NEXT_PUBLIC_BACKEND_API_URL, 'backend url');

  const {data, isLoading, isError}= useGetUsersQuery();

  if(isLoading){
    return <Loading />
  }

  if(isError){
    console.log(isError);
  }

  console.log(data, 'user data');

  const handler = ()=>{
    toast.success("Done")

  }

  return (
   <div>
   <LoginPage />
   </div>
  );
}
