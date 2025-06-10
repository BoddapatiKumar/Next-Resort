import { redirect } from "next/navigation";
import { auth } from "../authOptions"
import Link from "next/link";
import AdminNavigation from "../components/AdminNavigation";

const Adminpage = async() => {
  const session=await auth();

  if(!session)
  {
    redirect('/login');
  }
  return (
    <div>
      {
        session ? (
          <>
            <AdminNavigation />
            <h1>Admin Page</h1>
          </>
      ):"Not authorized"
      }

      <Link href=''>Login</Link>
      
    </div>
  )
}

export default Adminpage
