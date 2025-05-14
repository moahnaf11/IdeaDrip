import { useEffect, useState } from "react";
import handleToggleSave from "../toggleSave";
import { ImSpinner } from "react-icons/im";
import { FaBookmark } from "react-icons/fa";
import PostDetail from "../Explore-Ideas/PostDetail";
import { useAuthFetch } from "../authFetch";

function Saved() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [open, setOpen] = useState(false);
  const authFetch = useAuthFetch();
  useEffect(() => {
    const controller = new AbortController();
    const fetchSavedPosts = async () => {
      try {
        setLoading(true);
        const response = await authFetch(
          `${import.meta.env.VITE_SERVER_URL}/post/saved`,
          {
            mode: "cors",
            method: "GET",
            credentials: "include",
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!response) {
          return;
        }
        if (!response.ok) {
          console.log("response failed");
          return;
        }
        const data = await response.json();
        setSavedPosts(data);
        setLoading(false);
      } catch (err) {
        console.log("Failed in fetching saved posts", err);
      }
    };
    fetchSavedPosts();
    return () => {
      controller.abort();
    };
  }, [authFetch]);
  return (
    <>
      {loading ? (
        <div className="min-h-screen flex justify-center mt-8 gap-2">
          Fetching Saved Posts <ImSpinner className="animate-spin size-8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {savedPosts.map((postSaved) => (
            <div
              onClick={() => {
                setPost(postSaved);
                setOpen(true);
              }}
              key={postSaved.id}
              className="bg-white rounded-xl shadow-sm p-5 flex flex-col transition-all duration-200 hover:shadow-md hover:scale-[1.01] hover:border-gray-300 border border-transparent"
            >
              {/* Title and link */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">
                  <a
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    href={postSaved.post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {postSaved.post.title}
                  </a>
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleSave(
                      postSaved.post.id,
                      "unsave",
                      setSavedPosts,
                      null,
                      authFetch,
                    );
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaBookmark />
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  r/{postSaved.post.subreddit.name}
                </span>
                {postSaved.post.flair && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    {postSaved.post.flair}
                  </span>
                )}
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  Posted by u/{postSaved.post.author}
                </span>
              </div>

              {/* Description */}
              {postSaved.post.selftext && (
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {postSaved.post.selftext.length > 200
                    ? `${postSaved.post.selftext.slice(0, 200)}...`
                    : postSaved.post.selftext}
                </p>
              )}

              {/* Stats */}
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
                  {postSaved.post.upvotes}
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
                  {postSaved.post.comments} comments
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {post && (
        <PostDetail
          post={post.post}
          open={open}
          setOpen={setOpen}
          setPost={setPost}
        />
      )}
    </>
  );
}

export default Saved;
