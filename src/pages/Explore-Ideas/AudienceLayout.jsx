import FilterBar from "./FilterBar";
import DashNav from "./DashNav";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
function AudienceLayout() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [singleAudience, setSingleAudience] = useState(null);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { audienceId } = useParams();
  const [sortOption, setSortOption] = useState("");

  // Sort posts
  const sortPosts = (option) => {
    setSortOption(option);
  };

  // fetch audience card
  useEffect(() => {
    const controller = new AbortController();
    const fetchAudience = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/audience/${audienceId}`,
          {
            mode: "cors",
            method: "GET",
            credentials: "include",
            signal: controller.signal,
          },
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.msg);
          return;
        }

        setSingleAudience(data);
      } catch (err) {
        console.log("Error fetching audience:", err);
      }
    };

    fetchAudience();
    return () => {
      controller.abort();
    };
  }, [audienceId]);

  useEffect(() => {
    if (!sortOption) {
      setPosts([...allPosts]);
      return;
    }
    const sorted = [...allPosts].sort((a, b) => {
      switch (sortOption) {
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
  }, [sortOption, allPosts]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-3 py-2 
        text-sm font-medium text-gray-700 
        bg-white/80 backdrop-blur-sm
        rounded-lg border border-gray-200
        transition-all duration-200 ease-in-out
        hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500/30
        active:bg-gray-100 active:scale-[0.98] mb-2"
      >
        {" "}
        <IoIosArrowBack />
        Back
      </Link>
      <FilterBar sortOption={sortOption} sortPosts={sortPosts} />
      <DashNav />
      <div
        className={`
        relative flex text-sm items-center mx-auto max-w-[80%] overflow-hidden
        bg-white rounded-full transition-all duration-300 mb-4
        shadow-sm hover:shadow-md
        ${isFocused ? "ring-2 ring-blue-400 shadow-md" : ""}
      `}
      >
        <div className="flex items-center justify-center pl-4 text-gray-400">
          <BiSearch size={20} className="min-w-5" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for keywords..."
          className=" w-full
            py-3 px-3 text-base text-gray-700
            bg-transparent outline-none transition-all
            placeholder:text-gray-400 placeholder:transition-all
            focus:placeholder:text-gray-300 placeholder:text-sm
          "
        />
      </div>
      {singleAudience && (
        <Outlet
          context={{
            posts,
            setPosts,
            singleAudience,
            query,
            sortOption,
            sortPosts,
            setAllPosts,
          }}
        />
      )}
    </div>
  );
}

export default AudienceLayout;
