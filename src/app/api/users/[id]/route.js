import DBconnection from "@/app/utils/config/db";
import userModel from "@/app/utils/models/User";
import bookingModel from "@/app/utils/models/Bookings";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await DBconnection();

  const { id } = params;
  console.log("dynamic Id:", id);

  try {
    if (!id) {
      return NextResponse.json(
        { success: false, message: "no user found" },
        { status: 404 }
      );
    }

    const user = await userModel.findById(id).populate("bookings");

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Fetch user error:", error);
    return NextResponse.json(
      { success: false, message: "Server error while fetching user" },
      { status: 500 }
    );
  }
}
