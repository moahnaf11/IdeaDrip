import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import fetchPosts from "../fetchPosts";

function RedditRising() {
  const { posts, setPosts } = useOutletContext();
  useEffect(() => {
    const controller = new AbortController();
    fetchPosts("rising", controller, setPosts);
    return () => {
      controller.abort();
    };
  }, [setPosts]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-5 flex flex-col transition-all duration-200 hover:shadow-md hover:scale-[1.01] hover:border-gray-300 border border-transparent"
          >
            {/* Title and link */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
              </h3>
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
            </div>

            {/* Tags like subreddit and flair */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                r/{post.subreddit}
              </span>
              {post.flair && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  {post.flair}
                </span>
              )}
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                Posted by u/{post.author}
              </span>
            </div>

            {/* Selftext / description */}
            {post.selftext && (
              <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                {post.selftext.length > 200
                  ? `${post.selftext.slice(0, 200)}...`
                  : post.selftext}
              </p>
            )}

            {/* Stats row */}
            <div className="mt-auto flex items-center text-sm text-gray-500">
              <div className="flex items-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {post.upvotes}
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {post.comments} comments
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default RedditRising;
