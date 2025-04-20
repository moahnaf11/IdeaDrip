import {
  FaFire,
  FaStar,
  FaTrophy,
  FaArrowUp,
  FaExclamationTriangle,
} from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
function DashNav() {
  const { audienceId } = useParams();
  return (
    <>
      {/* navbar for hot, new etc */}
      <nav className="bg-gray-100 p-2 flex lg:flex-row lg:items-center flex-col gap-2 overflow-x-auto max-w-fit">
        <NavLink
          end
          to={`/${audienceId}`}
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? "bg-gray-800 text-white"
                : "bg-transparent text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          <FaFire
            className={({ isActive }) =>
              isActive ? "text-orange-500" : "text-orange-500"
            }
          />
          <span>Hot</span>
        </NavLink>

        <NavLink
          to={`/${audienceId}/new`}
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? "bg-gray-800 text-white"
                : "bg-transparent text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          <FaStar
            className={({ isActive }) =>
              isActive ? "text-yellow-500" : "text-yellow-500"
            }
          />
          <span>New</span>
        </NavLink>

        <NavLink
          to={`/${audienceId}/top`}
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? "bg-gray-800 text-white"
                : "bg-transparent text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          <FaTrophy
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-blue-500"
            }
          />
          <span>Top</span>
        </NavLink>

        <NavLink
          to={`/${audienceId}/rising`}
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? "bg-gray-800 text-white"
                : "bg-transparent text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          <FaArrowUp
            className={({ isActive }) =>
              isActive ? "text-green-500" : "text-green-500"
            }
          />
          <span>Rising</span>
        </NavLink>

        <NavLink
          to={`/${audienceId}/controversial`}
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? "bg-gray-800 text-white"
                : "bg-transparent text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          <FaExclamationTriangle
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-red-500"
            }
          />
          <span>Controversial</span>
        </NavLink>
      </nav>
    </>
  );
}

export default DashNav;
