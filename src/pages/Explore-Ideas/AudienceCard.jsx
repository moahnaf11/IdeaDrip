import { useEffect, useRef, useState } from "react";
import { FaTag, FaTimes, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function AudienceCard({
  item,
  setAudience,
  setIsDialogOpen,
  setTitle,
  setSelectedSubreddits,
  setIsedit,
  setSearchTerm,
  setLoading,
  setEditingAudienceId,
}) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const maxHeight = 40;

  useEffect(() => {
    if (containerRef.current) {
      setIsOverflowing(containerRef.current.scrollHeight > maxHeight);
    }
  }, [item]);

  const handleEditAudience = (audienceItem) => {
    setIsDialogOpen(true);
    setTitle(audienceItem.title);
    setSelectedSubreddits(audienceItem.subreddits || []);
    setSearchTerm(audienceItem.searchTerm);
    setIsedit(true);
    setEditingAudienceId(audienceItem.id);
    setLoading(false);
  };

  const deleteAudience = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/audience/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();
      if (res.ok) {
        console.log("Audience deleted!", data);
        setAudience((prev) => prev.filter((aud) => aud.id !== id));
      } else {
        console.log("Failed to delete audience", data);
      }
    } catch (err) {
      console.log("failed in fetch request", err);
    }
  };
  return (
    <>
      <Link
        to={`/${item.id}`}
        className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-purple-100"
      >
        <div className="flex items-center gap-2 mb-2">
          <FaTag className="w-4 h-4 text-purple-600" />
          <h3 className="font-semibold max-h-[28px] text-gray-800 truncate">
            {item.title}
          </h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleEditAudience(item);
            }}
            className="text-gray-500 ml-auto hover:text-gray-700 transition-colors"
          >
            <FaRegEdit />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              deleteAudience(item.id);
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {item.subreddits.length === 0 ? (
          <p className="text-sm text-gray-500 italic">
            No subreddits selected.
          </p>
        ) : (
          <div className="mt-2">
            <div
              ref={containerRef}
              className="flex flex-wrap gap-2 transition-all duration-300 ease-in-out overflow-hidden"
              style={{
                maxHeight: expanded ? "1000px" : `${maxHeight}px`,
              }}
            >
              {item.subreddits.map((subreddit, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100 transition-all hover:bg-purple-100"
                >
                  {subreddit.name}
                </span>
              ))}
            </div>

            {isOverflowing && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
                className="mt-1 text-xs font-medium text-purple-600 hover:text-purple-800 transition-colors flex items-center"
              >
                {expanded ? "Show less" : "Show more..."}
              </button>
            )}
          </div>
        )}
      </Link>
    </>
  );
}

export default AudienceCard;
