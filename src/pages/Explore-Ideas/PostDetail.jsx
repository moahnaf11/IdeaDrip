import { useState, useRef, useEffect } from "react";
import { FaTimes, FaArrowUp, FaUser, FaRegCommentDots } from "react-icons/fa";
import { AiOutlineRobot } from "react-icons/ai";
import { ImSpinner } from "react-icons/im";
import { useAuthFetch } from "../authFetch";

function PostDetail({ post, open, setOpen, setPost, formData }) {
  const authFetch = useAuthFetch();
  const [showAI, setShowAI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [airesult, setAiresult] = useState("");
  const dialogRef = useRef(null);
  function parseMarkdownLinks(text) {
    // Turns [label](url) into anchor tags (basic)
    return text.replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      (_, label, url) => {
        return `<a href="${url}" class="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">${label}</a>`;
      },
    );
  }

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      console.log("inside");
      dialogRef.current.close();
      setPost(null);
    }
  }, [open, setPost]);

  // ai summary
  const aiSummary = async () => {
    setLoading(true);
    const text = `${post.title} ${post.selftext.trim()}`;
    try {
      const res = await authFetch(
        `${import.meta.env.VITE_SERVER_URL}/post/summarize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, formData }),
        },
      );

      const data = await res.json();
      console.log("AI Result:", data.result);
      setShowAI(true);
      setLoading(false);
      setAiresult(data.result);
    } catch (err) {
      console.error("Failed to fetch AI summary:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <dialog
        ref={dialogRef}
        className="rounded-3xl shadow-2xl border-none w-[95%] lg:w-[70%] bg-white overflow-visible relative"
        style={{
          padding: 0,
        }}
      >
        {/* Close button */}
        <button
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute top-5 right-5 text-gray-400 bg-white rounded-full p-2 hover:text-gray-700 shadow focus:outline-none z-20"
        >
          <FaTimes size={24} />
        </button>

        {/* Main dialog layout */}
        <div className="flex flex-col md:flex-row h-[90vh] md:h-[75vh] w-full relative">
          {/* Post Container */}
          <div className="flex-1 flex flex-col bg-white rounded-l-3xl overflow-hidden min-w-0">
            {/* Header */}
            <div className="flex items-center gap-3 px-8 pt-8 pb-3 border-b border-gray-100">
              <img
                src={post.subreddit.icon}
                alt="subreddit icon"
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <div className="text-xs font-bold text-gray-700">
                  <a
                    href={post.subreddit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {"r/" + post.subreddit.name}
                  </a>
                </div>
                <div className="text-xs mt-1 text-gray-500 flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <FaUser /> {post.author}
                  </div>
                  {post.flair && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs font-semibold">
                      {post.flair}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {/* Title - NOT scrollable */}
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-extrabold text-gray-900 pt-6 px-8 pb-2 flex-shrink-0 bg-white z-10"
            >
              {post.title}
            </a>

            {/* Post body - scrollable only body */}
            <div
              className="px-8 flex-grow min-h-0 pt-2 pb-6 text-gray-800 overflow-y-auto"
              style={{ whiteSpace: "pre-line" }}
            >
              <div
                className="leading-relaxed markdown"
                dangerouslySetInnerHTML={{
                  __html: parseMarkdownLinks(post.selftext),
                }}
              />
            </div>

            {/* Post footer */}
            <div className="px-8 pb-6 pt-2 text-xs flex items-center justify-start gap-8 text-gray-500 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <FaArrowUp className="text-purple-500" />
                <span className="font-semibold text-gray-700">
                  {post.upvotes}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaRegCommentDots className="text-blue-400" />
                <span>{post.comments} comments</span>
              </div>
            </div>
          </div>

          {/* AI Panel */}
          {showAI && (
            <div className="w-full md:w-[350px] max-h-[40%] md:max-h-none bg-gray-50 border-l border-gray-200 p-6 flex flex-col transition-all duration-300">
              <div className="flex flex-1 min-h-0 flex-col items-center w-full">
                <div className="flex items-center gap-2 text-indigo-700 font-bold mb-2 text-lg">
                  <AiOutlineRobot size={24} />
                  AI Response
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 w-full text-gray-700 text-base shadow-sm overflow-y-auto ">
                  <pre className="whitespace-pre-wrap">{airesult}</pre>
                </div>
              </div>
            </div>
          )}

          {/* Ask AI Button - fixed to bottom-right of dialog */}
          {!showAI && (
            <button
              disabled={loading}
              onClick={aiSummary}
              className={`absolute text-sm right-3 bottom-[1rem] z-20 text-white font-semibold rounded-xl px-2 py-1 shadow-lg transition flex items-center gap-3
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 hover:opacity-90"}
              `}
            >
              {loading ? (
                <ImSpinner className="size-5 animate-spin" />
              ) : (
                <AiOutlineRobot className="size-5" />
              )}
              {!loading && "AskAI"}
            </button>
          )}
        </div>
      </dialog>
    </div>
  );
}

export default PostDetail;
