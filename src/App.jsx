import { useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FiGrid, FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import {
  // IoNotificationsOutline,
  IoMailOutline,
  IoChevronBack,
} from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "./auth/authContext";
import { FaBookmark } from "react-icons/fa";
import { useAuthFetch } from "./pages/authFetch";
import QuestionForm from "./pages/Explore-Ideas/QuestionForm";
import { FormDataContext } from "./pages/Explore-Ideas/questionformcontext";
import { TiThMenu } from "react-icons/ti";

function App() {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(true); // Sidebar open by default
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile sidebar toggle
  const [hoveredItem, setHoveredItem] = useState(null);
  const authFetch = useAuthFetch();
  const location = useLocation();
  const dialogRef = useRef(null);
  const [formData, setFormData] = useState({
    funding: "",
    experience: "",
    ideas: "",
    time: "",
  });

  const menuItems = [
    { icon: FiGrid, label: "Explore Ideas", id: "explore-ideas", path: "/" },
    {
      icon: FaBookmark,
      label: "Saved Ideas",
      id: "trending-topics",
      path: "/saved-ideas",
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 bg-white border-r p-3 md:p-6 ${isMobileOpen ? "block top-0 bottom-0 absolute w-[70%] shadow-md z-50 bg-white" : "hidden"}
    md:static md:block`}
      >
        <div
          className={`flex justify-between items-center mb-8 ${
            isOpen ? "" : "flex-col-reverse"
          }`}
        >
          <div className="flex gap-1 items-center">
            <div className="w-8 h-8 bg-primary rounded-full"></div>
            <span
              className={`ml-2 text-xl font-semibold ${
                isOpen ? "block" : "hidden"
              }`}
            >
              IdeaDrip
            </span>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              setIsMobileOpen((prev) => !prev);
            }}
            className="hover:bg-gray-100 md:hidden p-2 rounded-lg transition-all duration-200"
          >
            <TiThMenu className="w-6 h-6 text-gray-600" />
          </button>
          <button className="hover:bg-gray-100 hidden md:block p-2 rounded-lg transition-all duration-200">
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
              className={`text-gray-400 text-sm mb-4 ${
                isOpen ? "block" : "hidden"
              }`}
            >
              MENU
            </p>
            {menuItems.map((item) => {
              const isExplore =
                item.path === "/" &&
                location.pathname !== "/saved-ideas" &&
                location.pathname !== "/help-support" &&
                location.pathname !== "/settings";
              const isActive = isExplore || location.pathname === item.path;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`flex items-center w-full p-2 rounded-lg mb-2 relative transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-r'
                      : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className={`ml-3 ${isOpen ? "block" : "hidden"}`}>
                    {item.label}
                  </span>
                  {hoveredItem === item.id && !isOpen && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-md px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>

          <div>
            <p
              className={`text-gray-400 text-sm mb-4 ${
                isOpen ? "block" : "hidden"
              }`}
            >
              GENERAL
            </p>

            <NavLink
              to="/settings"
              onMouseEnter={() => setHoveredItem("Settings")}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center w-full p-2 rounded-lg mb-2 relative transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-r'
                    : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                }`
              }
            >
              <FiSettings className="w-5 h-5" />
              <span className={`ml-3 ${isOpen ? "block" : "hidden"}`}>
                Settings
              </span>
              {hoveredItem === "Settings" && !isOpen && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-md px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  {hoveredItem}
                </div>
              )}
            </NavLink>

            <NavLink
              to="/help-support"
              onMouseEnter={() => setHoveredItem("Help & Support")}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center w-full p-2 rounded-lg mb-2 relative transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-r'
                    : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                }`
              }
            >
              <FiHelpCircle className="w-5 h-5" />
              <span className={`ml-3 ${isOpen ? "block" : "hidden"}`}>
                Help & Support
              </span>
              {hoveredItem === "Help & Support" && !isOpen && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-md px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  {hoveredItem}
                </div>
              )}
            </NavLink>

            <button
              onClick={async () => {
                const response = await authFetch(
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
              <span className={`ml-3 ${isOpen ? "block" : "hidden"}`}>
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
          {/* <div className="flex items-center">
            <input
              type="text"
              placeholder="Search task"
              className="bg-gray-100 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
            <span className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm">
              ⌘F
            </span>
          </div> */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setIsOpen(true);
                setIsMobileOpen((prev) => !prev);
              }}
              className="md:hidden hover:bg-gray-100 p-1 rounded-lg transition-all duration-200"
            >
              <TiThMenu className="w-6 h-6 text-gray-600" />
            </button>
            <button className="hover:bg-gray-100 p-1 rounded-lg transition-all duration-200">
              <IoMailOutline className="w-6 h-6 text-gray-600" />
            </button>
            {/* <button className="hover:bg-gray-100 p-2 rounded-lg transition-all duration-200">
              <IoNotificationsOutline className="w-6 h-6 text-gray-600" />
            </button> */}
            <div className="flex items-center">
              <img
                src={isAuth?.photo}
                className="w-8 h-8 bg-gray-300 rounded-full object-cover"
                referrerPolicy="no-referrer"
              ></img>
              <div className="ml-2">
                <p className="text-sm font-medium">{isAuth?.username}</p>
                <p className="text-xs text-gray-500">{isAuth?.email}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Question Form */}
        <QuestionForm
          dialogRef={dialogRef}
          formData={formData}
          setFormData={setFormData}
        />
        <FormDataContext
          value={{
            formData,
            setFormData,
          }}
        >
          <Outlet context={{ dialogRef }} />
        </FormDataContext>
      </div>
    </div>
  );
}

export default App;
