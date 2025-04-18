import { useEffect, useState } from "react";
import {
  FaReddit,
  FaSearch,
  FaCheck,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { ImSpinner } from "react-icons/im";
function Audience() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [subreddits, setSubreddits] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedSubreddits, setSelectedSubreddits] = useState([]);
  const [title, setTitle] = useState("");
  const [isNewOpen, setIsNewOpen] = useState(true);
  const [isPopularOpen, setIsPopularOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [audience, setAudience] = useState([]);

  useEffect(() => {
    if (searchTerm) return;
    setHasSearched(false);
    setLoading(true);
    const controller = new AbortController();
    const fetchSubreddits = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/reddit/reddit-subreddits`,
          {
            mode: "cors",
            method: "GET",
            credentials: "include",
            signal: controller.signal,
          },
        );
        if (!response.ok) {
          setLoading(false);
          console.log("response failed");
          return;
        }
        const data = await response.json();
        setLoading(false);
        console.log(data);
        setSubreddits([...data.popular, ...data.new]);
      } catch (err) {
        console.log("Failed in fetch posts", err);
      }
    };

    fetchSubreddits();
    return () => {
      controller.abort();
    };
  }, [searchTerm]);

  useEffect(() => {
    const controller = new AbortController();
    const getAudiences = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/audience`, {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        });
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
  }, []);

  const toggleNew = () => setIsNewOpen((prev) => !prev);
  const togglePopular = () => setIsPopularOpen((prev) => !prev);

  const filteredSubreddits = subreddits.filter(
    (subreddit) =>
      subreddit.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subreddit.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleSubreddit = (id) => {
    if (selectedSubreddits.includes(id)) {
      setSelectedSubreddits(selectedSubreddits.filter((subId) => subId !== id));
    } else {
      setSelectedSubreddits([...selectedSubreddits, id]);
    }
  };

  const handleSave = async () => {
    // Here you could do something with the selected subreddits
    console.log("Selected subreddits:", selectedSubreddits);
    console.log("title", title);
    setIsDialogOpen(false);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/audience`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          subreddits: selectedSubreddits,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Audience saved!", data);
      } else {
        console.log("Failed to save audience", data);
      }
    } catch (err) {
      console.log("failed in fetch request", err);
    }
  };

  // search subreddits
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/reddit/reddit-specific-subreddit?q=${searchTerm.trim()}`,
      );
      if (!response.ok) {
        console.log("response failed");
        return;
      }
      const data = await response.json();
      setSubreddits(data);
      setHasSearched(true);
      console.log("Search results:", data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="min-h-screen text-sm lg:text-[16px] bg-gray-100">
      {/* Button to open dialog */}
      {/* <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <div className="flex items-center mb-4">
          <FaReddit className="text-red-500 text-3xl mr-2" />
          <h1 className="font-bold text-gray-800">Reddit Preferences</h1>
        </div>

        <p className="text-gray-600 mb-6">
          Select subreddits to personalize your feed
        </p>

        <button
          onClick={() => setIsDialogOpen(true)}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
        >
          <FaReddit className="mr-2" />
          {selectedSubreddits.length > 0
            ? `Edit Selected Subreddits (${selectedSubreddits.length})`
            : "Select Subreddits"}
        </button>
      </div> */}
      <div className="flex justify-between items-center">
        <h2>Your Target Communities</h2>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
        >
          <FaReddit className="mr-2" />
          {selectedSubreddits.length > 0
            ? `Edit Selected Subreddits (${selectedSubreddits.length})`
            : "Select Subreddits"}
        </button>
      </div>
      {/* audiences */}
      {audience.length === 0 ? (
        <p className="text-gray-500">No audiences found.</p>
      ) : (
        audience.map((item) => (
          <div key={item.id} className="p-4 border rounded shadow-sm bg-white">
            <h3 className="font-semibold text-lg text-gray-800">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">
              {item.subreddits.length > 0
                ? item.subreddits.join(", ")
                : "No subreddits selected."}
            </p>
          </div>
        ))
      )}

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
                    Select Subreddits
                  </h2>
                </div>
                <button
                  onClick={() => setIsDialogOpen(false)}
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
                  onChange={(e) => setSearchTerm(e.target.value)}
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

            {/* Subreddit List */}
            {filteredSubreddits.length > 0 && !loading ? (
              <div className="overflow-y-auto flex flex-col flex-1">
                {/* Popular Subreddits */}
                {!hasSearched && (
                  <>
                    <button
                      onClick={togglePopular}
                      className="text-lg flex items-center justify-between font-semibold px-4 py-2 bg-gray-100 border-b"
                    >
                      Popular Subreddits
                      <FaChevronDown
                        className={`${isPopularOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isPopularOpen &&
                      filteredSubreddits.slice(0, 100).map((subreddit) => (
                        <div
                          key={subreddit.name}
                          className={`p-4 border-b border-gray-200 flex items-center hover:bg-gray-50 cursor-pointer ${
                            selectedSubreddits.includes(subreddit.name)
                              ? "bg-blue-50"
                              : ""
                          }`}
                          onClick={() => toggleSubreddit(subreddit.name)}
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
                            {selectedSubreddits.includes(subreddit.name) ? (
                              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <FaCheck className="text-white text-xs" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                            )}
                          </div>
                        </div>
                      ))}

                    {/* New Subreddits */}
                    <button
                      onClick={toggleNew}
                      className="text-lg flex items-center justify-between font-semibold px-4 py-2 bg-gray-100 border-b mt-4"
                    >
                      New Subreddits
                      <FaChevronDown
                        className={`${isNewOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isNewOpen &&
                      filteredSubreddits.slice(100, 200).map((subreddit) => (
                        <div
                          key={subreddit.name}
                          className={`p-4 border-b border-gray-200 flex items-center hover:bg-gray-50 cursor-pointer ${
                            selectedSubreddits.includes(subreddit.name)
                              ? "bg-blue-50"
                              : ""
                          }`}
                          onClick={() => toggleSubreddit(subreddit.name)}
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
                            {selectedSubreddits.includes(subreddit.name) ? (
                              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <FaCheck className="text-white text-xs" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                            )}
                          </div>
                        </div>
                      ))}
                  </>
                )}

                {/* Filtered Subreddits (Search Results) */}
                {hasSearched &&
                  filteredSubreddits.map((subreddit) => (
                    <div
                      key={subreddit.name}
                      className={`p-4 border-b border-gray-200 flex items-center hover:bg-gray-50 cursor-pointer ${
                        selectedSubreddits.includes(subreddit.name)
                          ? "bg-blue-50"
                          : ""
                      }`}
                      onClick={() => toggleSubreddit(subreddit.name)}
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
                        {selectedSubreddits.includes(subreddit.name) ? (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <FaCheck className="text-white text-xs" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="p-4 text-center flex items-center justify-center text-gray-500">
                {loading ? (
                  <ImSpinner className="animate-spin size-8" />
                ) : (
                  `No subreddits found matching ${searchTerm}`
                )}
              </div>
            )}

            {/* Dialog Footer */}
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
              <button
                onClick={() => setIsDialogOpen(false)}
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
