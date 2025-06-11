import { redirect } from "next/navigation";
import { auth } from "../authOptions"
import Link from "next/link";
import AdminNavigation from "../components/AdminNavigation";
import AddProduct from "../components/AddProduct";

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
            <AddProduct />
          </>
      ):"Not authorized"
      }

      <Link href='/login'>Login</Link>
      
    </div>
  )
}

export default Adminpage
