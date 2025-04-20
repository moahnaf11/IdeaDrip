import FilterBar from "./FilterBar";
import DashNav from "./DashNav";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
function AudienceLayout() {
  const [posts, setPosts] = useState([]);
  const [singleAudience, setSingleAudience] = useState(null);
  const { audienceId } = useParams();

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

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Link to="/" className="flex items-center gap-2">
        {" "}
        <IoIosArrowBack />
        Back
      </Link>
      <FilterBar posts={posts} setPosts={setPosts} />
      <DashNav />
      {singleAudience && (
        <Outlet context={{ posts, setPosts, singleAudience }} />
      )}
    </div>
  );
}

export default AudienceLayout;
