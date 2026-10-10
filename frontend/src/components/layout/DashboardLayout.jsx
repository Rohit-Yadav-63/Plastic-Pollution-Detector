import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
export default function DashboardLayout(){const[open,setOpen]=useState(false);return <div className="min-h-screen bg-white lg:grid lg:grid-cols-[245px_minmax(0,1fr)]"><div className="hidden lg:block"><Sidebar/></div><div className="min-w-0"><div className="flex items-center lg:block"><button className="ml-2 rounded-lg p-2 text-slate-600 hover:bg-slate-50 lg:hidden" aria-label={open?"Close navigation":"Open navigation"} onClick={()=>setOpen(!open)}>{open?<X size={19}/>:<Menu size={19}/>}</button><div className="min-w-0 flex-1"><Header/></div></div>{open&&<div className="absolute z-40 h-[calc(100vh-72px)] w-[250px] bg-white shadow-xl lg:hidden"><Sidebar onNavigate={()=>setOpen(false)}/></div>}<main className="mx-auto max-w-[1440px] px-5 py-7 md:px-8 md:py-9"><Outlet/></main></div></div>}