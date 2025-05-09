import Link from "next/link"

const UserNavigation = () => {
  return (
    <div className="d-flex justify-content-between bg-gray-800 text-white p-3 rounded-lg ">
        <div className="font-extrabold">
           Prime Resort
        </div>
        <div className="">
            call now : 123 456 789
        </div>
        <div>
            Bookings
        </div>
        <div>
            <p>Welcome : </p>
        </div>
        <Link href="/api/auth/signout">
            <div className="btn btn-primary"> 
                Logout
            </div>
        </Link>
    </div>
  )
}

export default UserNavigation

