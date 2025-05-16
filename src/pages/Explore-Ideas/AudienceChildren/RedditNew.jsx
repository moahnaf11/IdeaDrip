import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import fetchPosts from "../fetchPosts";
import { ImSpinner } from "react-icons/im";
import PostDetail from "../PostDetail";
import { useAuthFetch } from "../../authFetch";
import { FormDataContext } from "../questionformcontext";
import PostCard from "./PostCard";

function RedditNew() {
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
      "new",
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

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex justify-center mt-8 gap-2">
          Fetching New posts <ImSpinner className="animate-spin size-8" />
        </div>
      ) : (
        <PostCard
          posts={posts}
          setPost={setPost}
          setOpen={setOpen}
          savedPostId={savedPostId}
          query={query}
          setSavedPostId={setSavedPostId}
        />
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

export default RedditNew;
