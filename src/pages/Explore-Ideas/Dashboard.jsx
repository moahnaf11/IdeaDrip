import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import FilterBar from "./FilterBar";
import DashNav from "./DashNav";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex items-center gap-4">
        <Link to="/">Reddit</Link>
      </div>
      <FilterBar posts={posts} setPosts={setPosts} />
      <DashNav />
      <Outlet context={{ posts, setPosts }} />
    </div>
  );
}

export default Dashboard;
