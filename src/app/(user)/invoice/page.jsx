import { auth } from '@/app/authOptions'
import UserInvoice from '@/app/components/UserInvoice';
import UserNavigation from '@/app/components/UserNavigation';
import userModel from '@/app/utils/models/User';
import React from 'react'

const Invoice= async() => {
    const session=await auth();
    const email=session.user.email;
   
    const user=await userModel.findOne({mail:email});

    const userId=user._id.toString();
    const bookingCount=user?.bookings.length || 0;

    console.log("user Id :",userId);
    console.log("Booking Count :",bookingCount);
  return (
    <div>
      <UserNavigation username={session?.user?.name} bookingCount={bookingCount}/>
      <UserInvoice userId={userId} />
    </div>
  )
}

export default Invoice
