import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiCalendar,
  FiBarChart2,
  FiUsers,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";
import {
  IoNotificationsOutline,
  IoMailOutline,
  IoChevronBack,
} from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "./auth/authContext";

function App() {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || "explore-ideas";
  const [isOpen, setIsOpen] = useState(true); // Sidebar open by default
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { icon: FiGrid, label: "Explore Ideas", id: "explore-ideas", path: "/" },
    {
      icon: FiCalendar,
      label: "Trending Topics",
      id: "trending-topics",
      path: "/trending-topics",
    },
    {
      icon: FiBarChart2,
      label: "Keyword Search",
      id: "keyword-search",
      path: "/keyword-search",
    },
    {
      icon: FiUsers,
      label: "AI Insights",
      id: "ai-insights",
      path: "/ai-insights",
    },
    {
      icon: FiGrid,
      label: "Saved Ideas",
      id: "saved-ideas",
      path: "/saved-ideas",
    },
  ];

  const analysisTools = [
    {
      icon: FiBarChart2,
      label: "Market Data",
      id: "market-data",
      path: "/market-data",
    },
    {
      icon: FiUsers,
      label: "Competitor Research",
      id: "competitor-research",
      path: "/competitor-research",
    },
    {
      icon: FiGrid,
      label: "Customer Pain Points",
      id: "pain-points",
      path: "/pain-points",
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="transition-all duration-300 bg-white border-r p-6">
        <div
          className={`flex justify-between items-center mb-8 ${
            isOpen ? "" : "flex-col-reverse"
          }`}
        >
          <div className="flex gap-1 items-center">
            <div className="w-8 h-8 bg-primary rounded-full"></div>
            <span
              className={`ml-2 text-xl font-semibold hidden ${
                isOpen ? "md:block" : "hidden"
              }`}
            >
              IdeaDrip
            </span>
          </div>
          <button className="hover:bg-gray-100 p-2 rounded-lg transition-all duration-200">
            <IoChevronBack
              onClick={() => setIsOpen((prev) => !prev)}
              className={`transition-all duration-200 size-6 hidden md:block ${
                isOpen ? "" : "rotate-180"
              }`}
            />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <p
              className={`text-gray-400 text-sm mb-4 hidden ${
                isOpen ? "md:block" : "hidden"
              }`}
            >
              MENU
            </p>
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`flex items-center w-full p-2 rounded-lg mb-2 relative transition-all duration-200 ${
                  (
                    item.path === "/"
                      ? currentPath === "explore-ideas"
                      : currentPath === item.id
                  )
                    ? 'bg-primary/10 text-primary before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-r'
                    : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span
                  className={`ml-3 hidden ${isOpen ? "md:block" : "hidden"}`}
                >
                  {item.label}
                </span>
                {hoveredItem === item.id && !isOpen && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-md px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </Link>
            ))}
          </div>

          <div>
            <p
              className={`text-gray-400 text-sm mb-4 hidden ${
                isOpen ? "md:block" : "hidden"
              }`}
            >
              ANALYSIS TOOLS
            </p>
            {analysisTools.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`flex items-center w-full p-2 rounded-lg mb-2 relative transition-all duration-200 ${
                  currentPath === item.id
                    ? 'bg-primary/10 text-primary before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-r'
                    : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span
                  className={`ml-3 hidden ${isOpen ? "md:block" : "hidden"}`}
                >
                  {item.label}
                </span>
                {hoveredItem === item.id && !isOpen && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-md px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </Link>
            ))}
          </div>

          <div>
            <p
              className={`text-gray-400 text-sm mb-4 hidden ${
                isOpen ? "md:block" : "hidden"
              }`}
            >
              GENERAL
            </p>
            <Link
              to="/settings"
              onMouseEnter={() => setHoveredItem("Settings")}
              onMouseLeave={() => setHoveredItem(null)}
              className={`flex items-center w-full p-2 rounded-lg mb-2 relative transition-all duration-200 ${
                currentPath === "settings"
                  ? 'bg-primary/10 text-primary before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-r'
                  : "text-gray-600 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              <FiSettings className="w-5 h-5" />
              <span className={`ml-3 hidden ${isOpen ? "md:block" : "hidden"}`}>
                Settings
              </span>
              {hoveredItem === "Settings" && !isOpen && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-md px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  {hoveredItem}
                </div>
              )}
            </Link>
            <Link
              to="/help-support"
              onMouseEnter={() => setHoveredItem("Help & Support")}
              onMouseLeave={() => setHoveredItem(null)}
              className={`flex items-center w-full p-2 rounded-lg mb-2 relative transition-all duration-200 ${
                currentPath === "help-support"
                  ? 'bg-primary/10 text-primary before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-r'
                  : "text-gray-600 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              <FiHelpCircle className="w-5 h-5" />
              <span className={`ml-3 hidden ${isOpen ? "md:block" : "hidden"}`}>
                Help & Support
              </span>
              {hoveredItem === "Help & Support" && !isOpen && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-md px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  {hoveredItem}
                </div>
              )}
            </Link>
            <button
              onClick={async () => {
                const response = await fetch(
                  `${import.meta.env.VITE_SERVER_URL}/users/logout`,
                  {
                    mode: "cors",
                    method: "GET",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  },
                );
                const data = await response.json();
                alert(data.msg);
                navigate("/product");
              }}
              onMouseEnter={() => setHoveredItem("Logout")}
              onMouseLeave={() => setHoveredItem(null)}
              className="flex relative items-center w-full p-2 rounded-lg mb-2 text-gray-600 hover:bg-primary/5 hover:text-primary transition-all duration-200"
            >
              <FiLogOut className="w-5 h-5" />
              <span className={`ml-3 hidden ${isOpen ? "md:block" : "hidden"}`}>
                Logout
              </span>
              {hoveredItem === "Logout" && !isOpen && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-md px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  {hoveredItem}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white p-6 flex gap-2 flex-col-reverse lg:flex-row justify-between items-center border-b">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search task"
              className="bg-gray-100 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
            <span className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm">
              ⌘F
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <button className="hover:bg-gray-100 p-2 rounded-lg transition-all duration-200">
              <IoMailOutline className="w-6 h-6 text-gray-600" />
            </button>
            <button className="hover:bg-gray-100 p-2 rounded-lg transition-all duration-200">
              <IoNotificationsOutline className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center">
              <img
                src={isAuth?.photo}
                className="w-8 h-8 bg-gray-300 rounded-full object-cover"
              ></img>
              <div className="ml-2">
                <p className="text-sm font-medium">{isAuth?.username}</p>
                <p className="text-xs text-gray-500">{isAuth?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default App;
