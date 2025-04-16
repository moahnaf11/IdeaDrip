import { useState } from "react";
import {
  FaReddit,
  FaSearch,
  FaCheck,
  FaTimes,
  FaGamepad,
  FaLaptopCode,
  FaFilm,
  FaMusic,
  FaBook,
  FaFootballBall,
  FaNewspaper,
} from "react-icons/fa";
function Audience() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubreddits, setSelectedSubreddits] = useState([]);

  const subreddits = [
    {
      id: 1,
      title: "r/programming",
      description: "Computer programming news and discussions",
      icon: <FaLaptopCode className="text-blue-500" />,
    },
    {
      id: 2,
      title: "r/gaming",
      description: "A place for everything gaming-related",
      icon: <FaGamepad className="text-green-500" />,
    },
    {
      id: 3,
      title: "r/movies",
      description: "News and discussions about movies",
      icon: <FaFilm className="text-red-500" />,
    },
    {
      id: 4,
      title: "r/music",
      description: "The musical community of Reddit",
      icon: <FaMusic className="text-purple-500" />,
    },
    {
      id: 5,
      title: "r/books",
      description: "Book recommendations and discussions",
      icon: <FaBook className="text-yellow-600" />,
    },
    {
      id: 6,
      title: "r/sports",
      description: "Sports news and highlights",
      icon: <FaFootballBall className="text-orange-500" />,
    },
    {
      id: 7,
      title: "r/news",
      description:
        "Real news articles, primarily but not exclusively, news relating to the United States",
      icon: <FaNewspaper className="text-gray-700" />,
    },
  ];

  const filteredSubreddits = subreddits.filter(
    (subreddit) =>
      subreddit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subreddit.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleSubreddit = (id) => {
    if (selectedSubreddits.includes(id)) {
      setSelectedSubreddits(selectedSubreddits.filter((subId) => subId !== id));
    } else {
      setSelectedSubreddits([...selectedSubreddits, id]);
    }
  };

  const handleSave = () => {
    // Here you could do something with the selected subreddits
    console.log("Selected subreddits:", selectedSubreddits);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen text-sm lg:text-[16px] bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Button to open dialog */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
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
      </div>

      {/* Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
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

            {/* Search Box */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search subreddits..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Subreddit List */}
            <div className="max-h-80 overflow-y-auto">
              {filteredSubreddits.length > 0 ? (
                filteredSubreddits.map((subreddit) => (
                  <div
                    key={subreddit.id}
                    className={`p-4 border-b border-gray-200 flex items-center hover:bg-gray-50 cursor-pointer ${
                      selectedSubreddits.includes(subreddit.id)
                        ? "bg-blue-50"
                        : ""
                    }`}
                    onClick={() => toggleSubreddit(subreddit.id)}
                  >
                    <div className="mr-3">{subreddit.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">
                        {subreddit.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {subreddit.description}
                      </p>
                    </div>
                    <div className="ml-2">
                      {selectedSubreddits.includes(subreddit.id) ? (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <FaCheck className="text-white text-xs" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No subreddits found matching "{searchTerm}"
                </div>
              )}
            </div>

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
