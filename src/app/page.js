
import { redirect } from "next/navigation";
import Adminpage from "./admin/page";
import { auth } from "./authOptions";
import UserNavigation from "./components/UserNavigation";
import DBconnection from "./utils/config/db";
import ProductCollection from "./components/ProductCollection";
import Image from 'next/image';


export default async function Home() {

  await DBconnection();
  
  const session= await auth();
  if(!session){
    redirect('/login');
  }
  // console.log("user name ",session?.user);
  const username=session?.user?.name;
  
  return (
    <div>
       {session?.user?.role==='user' && <div className="bg-amber-50">
        <UserNavigation username={username} />
        <Image 
        alt="resort"
        src="/banner.jpg"
        width={1600}
        height={500}
        >  
        </Image>
        <ProductCollection />
      </div>}

      {
        session?.user?.role==='admin'&& <Adminpage /> 
      }
      
    </div>
  );
}
