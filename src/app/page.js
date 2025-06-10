// import { redirect } from "next/navigation";
import Adminpage from "./admin/page";
import { auth } from "./authOptions";
import UserNavigation from "./components/UserNavigation";
import DBconnection from "./utils/config/db";


export default async function Home() {

 

  await DBconnection();
  const session= await auth();
  // console.log("user name ",session?.user);
  const username=session?.user?.name;
  
  return (
    <div>
       {session?.user?.role==='user' && <div className="bg-amber-50">
        <UserNavigation username={username} />
        <h1>Welcome to Holiday Resort</h1>
      </div>}

      {
        session?.user?.role==='admin'&& <Adminpage /> 
      }
      
    </div>
  );
}
