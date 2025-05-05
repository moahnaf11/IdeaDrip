const fetchPosts = async (
  sort = "hot",
  controller,
  setAllPosts,
  subreddits,
  setLoading,
  setSavedPostId,
  authFetch,
) => {
  try {
    setLoading(true);
    const response = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/api/reddit/reddit-posts`,
      {
        mode: "cors",
        method: "POST",
        credentials: "include",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sort, subreddits }),
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
    setAllPosts(data.posts);
    setSavedPostId(data.saved);
    setLoading(false);
  } catch (err) {
    console.log("Failed in fetch posts", err);
  }
};

export default fetchPosts;
