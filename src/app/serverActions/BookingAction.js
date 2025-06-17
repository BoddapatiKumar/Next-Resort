"use server";
import { auth } from "../authOptions";
import DBconnection from "../utils/config/db";
import bookingModel from "../utils/models/Bookings";
import userModel from "../utils/models/User";

export async function bookingAction(bookingDetails) {
  const session = await auth();
  console.log("email ", session.user.email);

  try {
    await DBconnection();
    console.log("booking details", bookingDetails);

    const user = await userModel.findOne({ mail: session.user.email });
    if (!user) {
      return { success: fasle, message: "user not found" };
    }

    const userId = user._id.toString();

    const userBookingDetails = await bookingModel.create({
      startDate: bookingDetails.selectedDates.startDate,
      endDate: bookingDetails.selectedDates.endDate,
      productName: bookingDetails.record.title,
      price: bookingDetails.record.price,
      offer: bookingDetails.record.offer,
      image: bookingDetails.record.image,
    });

    await userModel.findByIdAndUpdate(
      userId,
      { $push: { bookings: userBookingDetails._id } },
      { new: true }
    );
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "failed to create booking" };
  }
}
