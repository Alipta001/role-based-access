"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiLogOut,
} from "react-icons/fi";

import type { DashboardRole, MenuItem } from "./menu";

import {
  adminMenu,
  employeeMenu,
  managerMenu,
} from "./menu";


interface SidebarProps {

  role: DashboardRole;

  user:{
    name:string;
    email:string;
  };

  collapsed?:boolean;

  onCollapseChange?:(collapsed:boolean)=>void;

  onLogout:()=>void;

}



export default function Sidebar({
  role,
  user,
  collapsed=false,
  onCollapseChange,
  onLogout,
}:SidebarProps){


const pathname = usePathname();



const menu = useMemo<MenuItem[]>(()=>{

switch(role){

case "admin":
return adminMenu;


case "manager":
return managerMenu;


default:
return employeeMenu;

}

},[role]);





const sections = useMemo(()=>{


if(role==="employee"){

return [
{
title:"Workspace",
items:menu
}
];

}



if(role==="manager"){

return [

{
title:"Workspace",
items:menu.slice(0,2)
},

{
title:"Management",
items:menu.slice(2)
}

];

}



return [

{
title:"Administration",
items:menu.slice(0,3)
},

{
title:"Operations",
items:menu.slice(3)
}

];


},[menu,role]);






const initials =
(user.name || "User")
.split(" ")
.map((item)=>item[0])
.join("")
.substring(0,2)
.toUpperCase();




return (

<aside

className={`
fixed
left-0
top-20
z-40
hidden
h-[calc(100vh-5rem)]
flex-col
border-r
border-slate-200/80
bg-white/95
backdrop-blur-xl
shadow-[10px_0_40px_-25px_rgba(15,23,42,0.35)]
transition-all
duration-300
xl:flex

${
collapsed
?
"w-20"
:
"w-[280px]"
}

`}

>




{/* HEADER */}

<div
className="
flex
h-20
items-center
justify-between
border-b
border-slate-200
px-4
"
>


<div
className={`
flex
items-center
gap-3
${collapsed ? "mx-auto":""}
`}
>


<div
className="
flex
h-11
w-11
items-center
justify-center
rounded-2xl
bg-gradient-to-br
from-indigo-600
to-violet-600
text-white
shadow-lg
shadow-indigo-200
"
>

<FiHome size={19}/>

</div>




{
!collapsed && (

<div>

<p
className="
font-semibold
text-slate-900
"
>
RecordHub
</p>


<p
className="
text-xs
uppercase
tracking-wider
text-slate-500
"
>
{role}
</p>

</div>

)
}


</div>





<button

onClick={()=>onCollapseChange?.(!collapsed)}

className="
hidden
h-8
w-8
items-center
justify-center
rounded-xl
border
border-slate-200
bg-white
text-slate-500
transition
hover:border-indigo-300
hover:text-indigo-600
xl:flex
"

>


{
collapsed
?
<FiChevronRight size={16}/>
:
<FiChevronLeft size={16}/>
}


</button>


</div>







{/* MENU */}

<div
className="
flex-1
overflow-y-auto
px-3
py-5
"
>


{
sections.map((section)=>(

<div
key={section.title}
className="
mb-6
"
>


{
!collapsed && (

<p
className="
mb-3
px-3
text-[11px]
font-bold
uppercase
tracking-[0.2em]
text-slate-400
"
>
{section.title}
</p>

)

}





<div
className="
space-y-1
"
>


{
section.items.map((item)=>{


const Icon = item.icon;


const active =
pathname===item.href ||
pathname.startsWith(`${item.href}/`);




return (

<Link

key={item.name}

href={item.href}

className={`
group
flex
items-center
gap-3
rounded-2xl
px-3
py-2.5
text-sm
font-medium
transition-all

${
active

?

"bg-indigo-50 text-indigo-700 shadow-sm"

:

"text-slate-600 hover:bg-slate-100 hover:text-slate-900"

}

${collapsed ? "justify-center":""}

`}

>


<span

className={`

flex
h-9
w-9
items-center
justify-center
rounded-xl

${
active

?

"bg-white text-indigo-600 shadow-sm"

:

"bg-slate-100 text-slate-500 group-hover:bg-white"

}

`}

>

<Icon size={17}/>

</span>




{
!collapsed && (

<span className="truncate">

{item.name}

</span>

)

}


</Link>

)

})

}



</div>


</div>


))

}



</div>







{/* PROFILE */}

<div
className="
border-t
border-slate-200
p-3
"
>


<div
className={`
rounded-2xl
border
border-slate-200
bg-slate-50
p-3

${collapsed ? "flex justify-center":""}

`}
>


<div
className={`
flex
items-center
gap-3

${collapsed ? "justify-center":""}

`}
>


<div
className="
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-gradient-to-br
from-indigo-600
to-violet-600
text-sm
font-bold
text-white
"
>

{initials}

</div>



{
!collapsed && (

<div
className="
min-w-0
"
>

<p
className="
truncate
text-sm
font-semibold
text-slate-900
"
>
{user.name}
</p>


<p
className="
truncate
text-xs
text-slate-500
"
>
{user.email}
</p>


</div>

)

}


</div>






<button

onClick={onLogout}

className={`
mt-3
flex
items-center
gap-3
rounded-xl
px-3
py-2
text-sm
font-medium
text-slate-600
transition
hover:bg-white
hover:text-red-600

${collapsed ? "justify-center":"w-full"}

`}

>


<FiLogOut size={16}/>


{
!collapsed && "Logout"
}


</button>



</div>


</div>



</aside>


);

}