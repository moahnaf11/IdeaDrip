const fetchPosts = async (
  sort = "hot",
  controller,
  setPosts,
  subreddits,
  setLoading,
) => {
  try {
    setLoading(true);
    const response = await fetch(
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
    if (!response.ok) {
      console.log("response failed");
      return;
    }
    const data = await response.json();
    setPosts(data);
    setLoading(false);
  } catch (err) {
    console.log("Failed in fetch posts", err);
  }
};

export default fetchPosts;
