// import { redirect } from "next/navigation";
import { auth } from "./authOptions";
import UserNavigation from "./components/UserNavigation";
import DBconnection from "./utils/config/db";


export default async function Home() {

 

  await DBconnection();
  const session= await auth();
  console.log("user name ",session.username)
  
  return (
    <div>
       <div className="bg-amber-50">
        <UserNavigation />
      </div>
      <h1>Home Page</h1>
    </div>
  );
}
