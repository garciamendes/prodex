import { Outlet } from "react-router"
import { SideMenu } from "../../components/sideMenu"

export const LayoutHome = () => {
  return (
    <div className="flex bg-gray-800 h-full w-full p-5 justify-between gap-9">
      <SideMenu />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}