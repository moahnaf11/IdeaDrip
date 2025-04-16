import { useEffect, useRef, useState } from "react";
import { FaComments, FaChevronDown, FaCheck } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";

function FilterBar({ posts, setPosts }) {
  const filterBar = useRef(null);
  const [sortOption, setSortOption] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterBar.current && !filterBar.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };

    // Add event listener
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  // Sort posts
  const sortPosts = (option) => {
    setSortOption(option);

    const sorted = [...posts].sort((a, b) => {
      switch (option) {
        case "upvotes-desc":
          return b.upvotes - a.upvotes;
        case "upvotes-asc":
          return a.upvotes - b.upvotes;
        case "comments-desc":
          return b.comments - a.comments;
        case "comments-asc":
          return a.comments - b.comments;
        default:
          return 0;
      }
    });

    setPosts(sorted);
  };
  return (
    <div
      ref={filterBar}
      className="flex lg:flex-row justify-between text-xs flex-1 mb-2"
    >
      {/* Upvotes Filter */}
      <div className="relative flex-1 flex">
        <button
          onClick={() => toggleDropdown("upvotes")}
          className={`flex flex-1 justify-between items-center gap-2 px-3 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors ${
            activeDropdown === "upvotes" ? "bg-gray-100" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <BiUpvote className="text-orange-500" />
            <span>Upvotes</span>
          </div>
          <FaChevronDown
            className={`w-4 h-4 ml-1 transition-transform ${
              activeDropdown === "upvotes" ? "rotate-180" : ""
            }`}
          ></FaChevronDown>
        </button>

        {activeDropdown === "upvotes" && (
          <div className="absolute w-full text-xs top-full left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1 flex flex-col">
              <button
                onClick={() => sortPosts("upvotes-desc")}
                className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Highest
                {sortOption === "upvotes-desc" && (
                  <FaCheck className="ml-2 text-green-500" />
                )}
              </button>
              <button
                onClick={() => sortPosts("upvotes-asc")}
                className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Lowest
                {sortOption === "upvotes-asc" && (
                  <FaCheck className="ml-2 text-green-500" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Comments Filter */}
      <div className="relative flex-1 flex">
        <button
          onClick={() => toggleDropdown("comments")}
          className={`flex justify-between flex-1 items-center gap-2 px-3 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors ${
            activeDropdown === "comments" ? "bg-gray-100" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <FaComments className="text-blue-500" />
            <span>Comments</span>
          </div>
          <FaChevronDown
            className={`w-4 h-4 ml-1 transition-transform ${
              activeDropdown === "comments" ? "rotate-180" : ""
            }`}
          ></FaChevronDown>
        </button>

        {activeDropdown === "comments" && (
          <div className="absolute w-full text-xs top-full left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1 flex flex-col">
              <button
                onClick={() => sortPosts("comments-desc")}
                className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Most
                {sortOption === "comments-desc" && (
                  <FaCheck className="ml-2 text-green-500" />
                )}
              </button>
              <button
                onClick={() => sortPosts("comments-asc")}
                className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Least
                {sortOption === "comments-asc" && (
                  <FaCheck className="ml-2 text-green-500" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
