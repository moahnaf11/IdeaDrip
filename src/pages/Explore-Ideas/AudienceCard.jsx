import { useEffect, useRef, useState } from "react";
import { FaTag } from "react-icons/fa";
import { Link } from "react-router-dom";

function AudienceCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const maxHeight = 40;

  useEffect(() => {
    if (containerRef.current) {
      setIsOverflowing(containerRef.current.scrollHeight > maxHeight);
    }
  }, []);
  return (
    <>
      <Link
        to={`/${item.id}`}
        className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-purple-100"
      >
        <div className="flex items-center gap-2 mb-2">
          <FaTag className="w-4 h-4 text-purple-600" />
          <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
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
                  {subreddit}
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
