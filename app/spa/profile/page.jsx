//"use client"
import React from 'react'
import prisma from "@/app/libs/prismadb";
import { useSearchParams } from 'next/navigation'
import SpaProfile from '@/app/components/listings/spaProfile';
import ClientOnly from '@/app/components/ClientOnly';
import Container from '@/app/components/Container';


const Profile = async () => {
    //const router = useRouter();

    return (
        <ClientOnly>
            
                <div>
                    <SpaProfile />
                </div>
            
        </ClientOnly>

    )
}

export default Profile