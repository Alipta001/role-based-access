"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FiBox,
  FiPlus,
  FiShield,
} from "react-icons/fi";


import MobileSidebar from "./mobileSidebar";
import SearchBar from "./searchbar";
import NotificationDropdown from "./notificationDropdown";
import ProfileDropdown from "./profileDropdown";


interface NavbarProps {

  role:
  | "admin"
  | "manager"
  | "employee";


  user:{
    name:string;
    email:string;
  };


  onLogout?:()=>void;

}




export default function Navbar({
  role,
  user,
  onLogout,
}:NavbarProps){


const pathname = usePathname();



const dashboardUrl =
role==="admin"
?
"/adminDashboard"
:
role==="manager"
?
"/managerDashboard"
:
"/employeeDashboard";





const pageTitle = pathname.includes("addEmployee")
?
"Add Employee"
:
pathname.includes("addManager")
?
"Add Manager"
:
role==="admin"
?
"Admin Dashboard"
:
role==="manager"
?
"Manager Workspace"
:
"Employee Portal";





return (

<header
className="
fixed
top-0
left-0
right-0
z-50
h-20
border-b
border-slate-200/80
bg-white/80
backdrop-blur-xl
"
>


<div
className="
flex
h-full
items-center
justify-between
gap-5
px-4
sm:px-6
lg:px-8
"
>



{/* LEFT */}

<div
className="
flex
items-center
gap-4
min-w-0
"
>


{/* Mobile Menu */}

<div className="xl:hidden">

<MobileSidebar

role={role}

user={user}

onLogout={onLogout}

/>

</div>





{/* Brand */}

<Link

href={dashboardUrl}

className="
flex
items-center
gap-3
shrink-0
"

>


<div

className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-gradient-to-br
from-indigo-600
via-violet-600
to-purple-600
text-white
shadow-lg
shadow-indigo-200
"

>

<FiShield size={24}/>

</div>





<div className="hidden sm:block">


<div
className="
flex
items-center
gap-2
"
>


<h1
className="
text-base
font-bold
tracking-tight
text-slate-900
"
>
AccessHub
</h1>


<span
className="
rounded-full
bg-indigo-50
px-2
py-1
text-[10px]
font-bold
uppercase
tracking-wide
text-indigo-600
"
>

{role}

</span>


</div>




<p
className="
text-xs
text-slate-500
"
>

Role Based Access Management

</p>


</div>



</Link>





{/* Current Page */}

<div
className="
hidden
border-l
border-slate-200
pl-5
lg:block
"
>


<p
className="
text-sm
font-semibold
text-slate-800
"
>

{pageTitle}

</p>


<p
className="
text-xs
text-slate-500
"
>

Secure workspace

</p>


</div>



</div>








{/* RIGHT */}

<div
className="
flex
items-center
gap-3
"
>





{/* Search */}

<div

className="
hidden
lg:block
w-[220px]
xl:w-[320px]
"

>

<SearchBar/>

</div>







{/* Admin Actions */}

{

role==="admin" && (

<Link

href="/addEmployee"

className="
hidden
md:flex
items-center
gap-2
rounded-xl
bg-gradient-to-r
from-indigo-600
to-violet-600
px-4
py-2.5
text-sm
font-semibold
text-white
shadow-lg
shadow-indigo-200
transition
hover:-translate-y-0.5
hover:shadow-xl
"

>


<FiPlus size={17}/>


Add User


</Link>


)

}








{/* Notification */}

<NotificationDropdown/>







{/* Profile */}

<ProfileDropdown

name={user.name}

email={user.email}

role={role}

onLogout={onLogout}

/>



</div>



</div>


</header>


);

}