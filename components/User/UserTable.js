"use client";

import { useState } from "react";
import Loading from "@/components/Loading/Loading";
// import { useDeleteUserMutation, useGetUsersQuery } from "@/redux/api/userApi";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DeleteModal from "../shared/DeleteModal";
import { useGetUsersQuery } from "@/redux/api/userApi";

const UserTable =  () => {
  const { data, isLoading, error } = useGetUsersQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

const [deleteUserId, setDeleteUserId]= useState(null)

//   const [deleteUser]= useDeleteUserMutation()


if (isLoading) return <Loading />;
if (error) return <p>Error occurred while fetching users.</p>;

console.log(data?.data, 'data---');
  const users = data?.data || [];



  const handleDeleteClick = (user) => {
    setUserToDelete(user); 
    setIsModalOpen(true);  
  };

  console.log(deleteUserId, 'deleteUserId-----');


  const handleDeleteConfirm = async () => {
    // if (userToDelete) {
    //   try {
    //     const response = await deleteUser(userToDelete._id).unwrap();
        
    //     console.log(response);
    //     toast.success("Delete User Successfully")
  
    //     console.log(`User with ID ${userToDelete._id} deleted successfully.`);
    //     setUserToDelete(null);
    //     setIsModalOpen(false); 
    //   } catch (error) {
    //     console.error("Error occurred while deleting the user:", error);
    //   }
    // }
  };

  

  return (
    <div className="container mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">User Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-left">Name</th>
                  <th className="px-6 py-3 text-sm font-medium text-left">Phone Number</th>
                  <th className="px-6 py-3 text-sm font-medium text-left">Role</th>
                  <th className="px-6 py-3 text-sm font-medium text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && users?.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-gray-900">{user.phone_number}</td>
                    <td className="px-6 py-4 text-gray-900">{user.role}</td>
                    <td className="px-6 py-4 flex space-x-3">
                      <Button
                        variant="secondary"
                        onClick={() => console.log(`Edit user with ID: ${user._id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        className="text-red-600"
                        onClick={() => setDeleteUserId(user?._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {userToDelete && (
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          itemName={userToDelete.name}
          endpoint="user"
          _id={deleteUserId}
        />
      )}
    </div>
  );
};

export default UserTable;