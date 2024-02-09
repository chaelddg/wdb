//"use client"
import React from 'react'

import SpaProfile from '@/app/components/listings/spaProfile';
import ClientOnly from '@/app/components/ClientOnly';



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