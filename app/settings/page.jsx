import React from 'react'

const page = () => {
  return (
    <div>settings</div>
  )
}

export default page

// import React from 'react';
// import prisma from '@/app/libs/prismadb';
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";

// export async function getSession() {
//   return await getServerSession(authOptions);
// }

// export default async function Profile() {

  
//   try {
//     const session = await getSession();

//     if (!session?.user?.email) {
//       return null;
//     }

//     const currentUser = await prisma.user.findUnique({
//       where: {
//         email: session.user.email
//       }
//     });

//     if (!currentUser) {
//       return null;
//     }

//     return (
//       <div>
//         {/* Check if currentUser exists before accessing its properties */}
//         {currentUser &&
//           <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg mx-auto">
//           <img className="w-36 h-36 rounded-full mx-auto" src={currentUser.image || "/images/placeholder.jpg"} alt="Rounded avatar"></img>
//             <div className="px-4 py-5 sm:px-6">
//               <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
//               {currentUser.email}'s Profile
//               </h3>
//             </div>
//             <div className="border-t border-gray-200">
//   <dl>
//     <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//       <dt className="text-sm font-medium text-gray-500">
//         Name
//       </dt>
//       <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//         <input
//           type="text"
//           value={`${currentUser.name}`}
//           // Add appropriate onChange handler to update currentUser state
//         />
//       </dd>
//     </div>
//     <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//       <dt className="text-sm font-medium text-gray-500">
//         Middle name
//       </dt>
//       <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//         <input
//           type="text"
//           value={`${currentUser.mname}`}
//           // Add appropriate onChange handler to update currentUser state
//         />
//       </dd>
//     </div>
//     <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//       <dt className="text-sm font-medium text-gray-500">
//         Last Name
//       </dt>
//       <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//         <input
//           type="text"
//           value={`${currentUser.lname}`}
//           // Add appropriate onChange handler to update currentUser state
//         />
//       </dd>
//     </div>
//     <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//       <dt className="text-sm font-medium text-gray-500">
//         Gender
//       </dt>
//       <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//         <input
//           type="text"
//           value={currentUser.gender}
//           // Add appropriate onChange handler to update currentUser state
//         />
//       </dd>
//     </div>
//     <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//       <dt className="text-sm font-medium text-gray-500">
//         Birthdate
//       </dt>
//       <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//         <input
//           type="date"
//           value={currentUser.Birthdate}
//           // Add appropriate onChange handler to update currentUser state
//         />
//       </dd>
//     </div>
//     <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//       <dt className="text-sm font-medium text-gray-500">
//         Email address
//       </dt>
//       <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//         <input
//           type="email"
//           value={currentUser.email}
//           // Consider disabling this field as email should be unique
//           readOnly
//         />
//       </dd>
//     </div>
//     <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//       <dt className="text-sm font-medium text-gray-500">
//         Phone number
//       </dt>
//       <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//         <input
//           type="tel"
//           value={currentUser.PhoneNum}
//           // Add appropriate onChange handler to update currentUser state
//         />
//       </dd>
//     </div>
//     <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//       <dt className="text-sm font-medium text-gray-500">
//         Address
//       </dt>
//       <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//         <textarea
//           type="text"
//           value={currentUser.Address}
//           // Add appropriate onChange handler to update currentUser state
//         />
//       </dd>
//     </div>
//   </dl>
// </div>

//           </div>}
//       </div>

//     )
//   } catch (error) {
//     return null;
//   }


// }