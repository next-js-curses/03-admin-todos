import { CiBookmarkCheck } from "react-icons/ci"

interface Props {
  path: string
  labelText: string,
  active: boolean
}

export const SidebarItem = ({ path, labelText, active }: Props) => {
  return (
    <li>
      <a href={ path } className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group ${ active ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400" : ""}`}>
        <CiBookmarkCheck size={30} />
        <span className="-mr-1 font-medium">{ labelText }</span>
      </a>
    </li>
  )
}
