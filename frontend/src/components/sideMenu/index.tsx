import { matchPath, NavLink, useLocation } from "react-router"
import { LINKS } from "./constants"

export const SideMenu = () => {
  const location = useLocation()

  return (
    <div className="h-full min-w-[230px] bg-gray-700 rounded-xl py-10">
      <ul className="w-max flex flex-col mx-auto gap-6">
        {LINKS.map(({ icon: Icon, title, url }, index) => {
          const activeRouter = matchPath(url, location.pathname)

          return (
            <NavLink
              to={url}
              key={index}
              data-active={!!activeRouter}
              className='flex items-center gap-3 cursor-pointer group duration-400 transition-colors'>
              <Icon
                size={30}
                className="fill-gray-400 group-data-[active=true]:fill-gray-100 group-hover:text-gray-100 duration-400 transition-colors" />
              <strong
                className="text-base text-gray-400 font-medium group-data-[active=true]:text-gray-100 group-hover:text-gray-100 duration-400 transition-colors">{title}
              </strong>
            </NavLink>
          )
        })}
      </ul>
    </div>
  )
}