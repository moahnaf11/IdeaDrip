import { useEffect, useState } from "react";
import { FaReddit, FaSearch, FaCheck, FaTimes } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";
import AudienceCard from "./AudienceCard.jsx";
import { useAuthFetch } from "../authFetch.js";
function Audience() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [subreddits, setSubreddits] = useState([]);
  const [selectedSubreddits, setSelectedSubreddits] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [audience, setAudience] = useState([]);
  const [isedit, setIsedit] = useState(false);
  const [editingAudienceId, setEditingAudienceId] = useState(null);
  const [result, setResult] = useState(true);
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const authFetch = useAuthFetch();

  useEffect(() => {
    const controller = new AbortController();

    const getAudiences = async () => {
      try {
        const res = await authFetch(
          `${import.meta.env.VITE_SERVER_URL}/audience`,
          {
            method: "GET",
            credentials: "include",
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!res) {
          return;
        }
        const data = await res.json();
        if (!res.ok) {
          console.log("no audiences", data?.msg);
          return;
        }
        setAudience(data);
      } catch (err) {
        console.log("failed in useeffect to fetch all audiences", err);
      }
    };

    getAudiences();

    return () => {
      controller.abort();
    };
  }, [authFetch]);

  const filteredSubreddits = subreddits.filter(
    (subreddit) =>
      subreddit.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subreddit.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleSubreddit = (subreddit) => {
    setSelectedSubreddits((prev) =>
      prev.some((s) => s.name === subreddit.name)
        ? prev.filter((s) => s.name !== subreddit.name)
        : [...prev, subreddit],
    );
  };

  const handleSave = async () => {
    console.log("Selected subreddits:", selectedSubreddits);
    console.log("title", title);
    setIsDialogOpen(false);
    setShowSelectedOnly(false);
    setResult(true);
    setSubreddits([]);
    setIsedit(false);
    if (!isedit) {
      try {
        const res = await authFetch(
          `${import.meta.env.VITE_SERVER_URL}/audience`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              subreddits: selectedSubreddits,
              searchTerm,
            }),
          },
        );

        const data = await res.json();
        if (res.ok) {
          console.log("Audience saved!", data);
          setAudience((prev) => [...prev, data]);
          setTitle("");
          setSearchTerm("");
          setSelectedSubreddits([]);
        } else {
          console.log("Failed to save audience", data);
        }
      } catch (err) {
        console.log("failed in fetch request", err);
      }
    } else {
      try {
        const res = await authFetch(
          `${import.meta.env.VITE_SERVER_URL}/audience/${editingAudienceId}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              subreddits: selectedSubreddits,
            }),
          },
        );

        const data = await res.json();
        if (res.ok) {
          console.log("Audience edited!", data);
          setAudience((prev) =>
            prev.map((aud) => {
              if (aud.id === data.id) {
                return data;
              }
              return aud;
            }),
          );
          setTitle("");
          setSearchTerm("");
          setSelectedSubreddits([]);
        } else {
          console.log("Failed to edit audience", data);
        }
      } catch (err) {
        console.log("failed in fetch request", err);
      }
    }
  };

  // search subreddits
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      setResult(true);
      setLoading(true);
      const response = await authFetch(
        `${import.meta.env.VITE_SERVER_URL}/api/reddit/reddit-specific-subreddit?q=${searchTerm.trim()}`,
      );
      if (!response.ok) {
        console.log("response failed");
        setResult(false);
        return;
      }
      const data = await response.json();
      setSubreddits(data);
      setLoading(false);
      if (!data.length) {
        setResult(false);
      }
      console.log("Search results:", data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="min-h-screen text-sm lg:text-[16px] bg-gray-100 p-6">
      <div className="flex justify-between items-center">
        <h2>Your Target Communities</h2>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
        >
          <FaReddit className="mr-2" />
          Select Subreddits
        </button>
      </div>
      {/* audiences */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {audience.length === 0 ? (
          <p className="text-gray-500">No audiences found.</p>
        ) : (
          audience.map((item) => (
            <AudienceCard
              key={item.id}
              item={item}
              setAudience={setAudience}
              setIsDialogOpen={setIsDialogOpen}
              setTitle={setTitle}
              setSelectedSubreddits={setSelectedSubreddits}
              setSearchTerm={setSearchTerm}
              setIsedit={setIsedit}
              setLoading={setLoading}
              setEditingAudienceId={setEditingAudienceId}
            />
          ))
        )}
      </div>

      {/* Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white flex flex-col relative max-h-[80%] rounded-lg shadow-xl w-full max-w-md">
            {/* Dialog Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FaReddit className="text-red-500 text-2xl mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    {isedit ? "Edit Subreddits" : "Select Subreddits"}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setIsedit(false);
                    setIsDialogOpen(false);
                    setShowSelectedOnly(false);
                    setResult(true);
                    setSubreddits([]);
                    setTitle("");
                    setSearchTerm("");
                    setSelectedSubreddits([]);
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              <p className="text-gray-600 mt-1">Choose subreddits to follow</p>
            </div>

            {/* title box */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Set Audience Name"
                  className="w-full p-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Search Box */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-2">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search subreddits..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => {
                    setLoading(false);
                    setSearchTerm(e.target.value);
                  }}
                />
              </div>
              <button
                onClick={handleSearch}
                className={`p-2 rounded-md ${!searchTerm ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:bg-blue-50"}`}
                disabled={!searchTerm}
              >
                <FaSearch />
              </button>
            </div>

            <button
              onClick={() => setShowSelectedOnly(!showSelectedOnly)}
              className={`p-2 rounded-md ${showSelectedOnly ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
            >
              {showSelectedOnly ? "Show All" : "Show Selected Only"}
            </button>

            {/* Subreddit List */}
            {((!showSelectedOnly && filteredSubreddits.length > 0) ||
              (showSelectedOnly && selectedSubreddits.length > 0)) &&
            !loading ? (
              <div className="overflow-y-auto flex flex-col flex-1">
                {showSelectedOnly ? (
                  /* Selected Subreddits Only View */
                  selectedSubreddits.length > 0 ? (
                    selectedSubreddits.map((subreddit) => (
                      <div
                        key={subreddit.name}
                        className="p-4 border-b border-gray-200 flex items-center bg-blue-50 cursor-pointer"
                        onClick={() => toggleSubreddit(subreddit)}
                      >
                        <div className="mr-3">
                          {subreddit.icon ? (
                            <img
                              src={subreddit.icon}
                              alt="icon"
                              className="w-6 h-6 rounded-full"
                            />
                          ) : (
                            <div className="w-6 h-6 bg-gray-200 rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">
                            {subreddit.title}
                          </h3>
                          <p className="text-sm text-gray-600">{`r/${subreddit.name}`}</p>
                        </div>
                        <div className="ml-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <FaCheck className="text-white text-xs" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No subreddits selected
                    </div>
                  )
                ) : (
                  /* Full Subreddits List View */
                  filteredSubreddits.map((subreddit) => (
                    <div
                      key={subreddit.name}
                      className={`p-4 border-b border-gray-200 flex items-center hover:bg-gray-50 cursor-pointer ${
                        selectedSubreddits.some(
                          (s) => s.name === subreddit.name,
                        )
                          ? "bg-blue-50"
                          : ""
                      }`}
                      onClick={() => toggleSubreddit(subreddit)}
                    >
                      <div className="mr-3">
                        {subreddit.icon ? (
                          <img
                            src={subreddit.icon}
                            alt="icon"
                            className="w-6 h-6 rounded-full"
                          />
                        ) : (
                          <div className="w-6 h-6 bg-gray-200 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">
                          {subreddit.title}
                        </h3>
                        <p className="text-sm text-gray-600">{`r/${subreddit.name}`}</p>
                      </div>
                      <div className="ml-2">
                        {selectedSubreddits.some(
                          (s) => s.name === subreddit.name,
                        ) ? (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <FaCheck className="text-white text-xs" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="p-4 text-center flex items-center justify-center text-gray-500">
                {loading && <ImSpinner className="animate-spin size-8" />}
                {!result && <div>No subreddits found</div>}
              </div>
            )}

            {/* Dialog Footer */}
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setIsDialogOpen(false);
                  setShowSelectedOnly(false);
                  setResult(true);
                  setSubreddits([]);
                  setIsedit(false);
                  setTitle("");
                  setSearchTerm("");
                  setSelectedSubreddits([]);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                disabled={selectedSubreddits.length === 0}
              >
                Save ({selectedSubreddits.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Audience;
