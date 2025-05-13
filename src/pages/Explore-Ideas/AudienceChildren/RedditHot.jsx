import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import fetchPosts from "../fetchPosts";
import { ImSpinner } from "react-icons/im";
import PostDetail from "../PostDetail";
import handleToggleSave from "../../toggleSave.js";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useAuthFetch } from "../../authFetch.js";
import { FormDataContext } from "../questionformcontext.js";

function RedditHot() {
  const { posts, singleAudience, query, setAllPosts } = useOutletContext();
  const authFetch = useAuthFetch();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [open, setOpen] = useState(false);
  const [savedPostId, setSavedPostId] = useState([]);
  const { formData } = useContext(FormDataContext);

  useEffect(() => {
    const controller = new AbortController();
    fetchPosts(
      "hot",
      controller,
      setAllPosts,
      singleAudience.subreddits,
      setLoading,
      setSavedPostId,
      authFetch,
    );
    return () => {
      controller.abort();
    };
  }, [setAllPosts, singleAudience.subreddits, authFetch]);

  function decodeHtmlEntities(str) {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(str, "text/html").body
      .textContent;
    return decodedString || str;
  }

  return (
    <>
      {/* Dashboard Design Card (Low) */}
      {loading ? (
        <div className="min-h-screen flex justify-center mt-8 gap-2">
          Fetching Hot posts <ImSpinner className="animate-spin size-8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts
            .filter(
              (post) =>
                post.title.toLowerCase().includes(query.toLowerCase().trim()) ||
                post.selftext
                  .toLowerCase()
                  .includes(query.toLowerCase().trim()),
            )
            .map((post, index) => {
              const isSaved = savedPostId?.includes(post.id);
              return (
                <div
                  onClick={() => {
                    setPost(post);
                    setOpen(true);
                  }}
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-5 flex flex-col transition-all duration-200 hover:shadow-md hover:scale-[1.01] hover:border-gray-300 border border-transparent"
                >
                  {/* Title and link */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800">
                      <a
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {decodeHtmlEntities(post.title)}
                      </a>
                    </h3>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleSave(
                          post.id,
                          "save",
                          null,
                          setSavedPostId,
                          authFetch,
                        );
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
                  </div>

                  {/* Tags like subreddit and flair */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      r/{post.subreddit.name}
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
                      {decodeHtmlEntities(
                        post.selftext.length > 200
                          ? `${post.selftext.slice(0, 200)}...`
                          : post.selftext,
                      )}
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
              );
            })}
        </div>
      )}
      {post && (
        <PostDetail
          post={post}
          open={open}
          setOpen={setOpen}
          setPost={setPost}
          formData={formData}
        />
      )}
    </>
  );
}

export default RedditHot;
