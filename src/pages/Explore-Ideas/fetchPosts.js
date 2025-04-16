const fetchPosts = async (sort = "hot", controller, setPosts) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/reddit/reddit-posts?sort=${sort}`,
      {
        mode: "cors",
        method: "GET",
        credentials: "include",
        signal: controller.signal,
      },
    );
    if (!response.ok) {
      console.log("response failed");
      return;
    }
    const data = await response.json();
    setPosts(data);
  } catch (err) {
    console.log("Failed in fetch posts", err);
  }
};

export default fetchPosts;
