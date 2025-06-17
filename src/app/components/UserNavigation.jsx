import Link from "next/link"

const UserNavigation = ({username}) => {
  return (
    <div className="d-flex justify-content-between bg-gray-800 text-white p-3 rounded-lg ">
        <div className="font-extrabold">
           Prime Resort
        </div>
        <div className="">
            call now : 123 456 789
        </div>
        <Link href="/invoice">
            <div className="text-white text-decoration-none"> Bookings</div>
        </Link>
        <div>
            <p>Welcome : {username}</p>
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

