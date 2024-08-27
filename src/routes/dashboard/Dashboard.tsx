import { Outlet } from "react-router-dom"

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen">Dashboard
       <div className="max-w-[800px] w-full shadow-2xl p-10">
         <Outlet/>
       </div>
    </div>
  )
}

export default Dashboard