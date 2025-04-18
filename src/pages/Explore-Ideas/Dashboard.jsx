import { useState } from "react";
import { Outlet } from "react-router-dom";
// import FilterBar from "./FilterBar";
// import DashNav from "./DashNav";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* <FilterBar posts={posts} setPosts={setPosts} />
      <DashNav /> */}
      <Outlet context={{ posts, setPosts }} />
    </div>
  );
}

export default Dashboard;
