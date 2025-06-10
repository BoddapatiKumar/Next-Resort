import Link from "next/link"

const AdminNavigation = () => {
  return (
    <div className="d-flex justify-content-between bg-gray-800 text-white p-3 rounded-lg ">
        <div className="font-extrabold">
           Prime Resort
        </div>
        <div>
            <p>Welcome : Admin</p>
        </div>
        <Link href="/api/auth/signout">
            <div className="btn btn-primary"> 
                Logout
            </div>
        </Link>
    </div>
  )
}

export default AdminNavigation
