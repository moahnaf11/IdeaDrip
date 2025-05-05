const handleToggleSave = async (
  postId,
  action,
  setSavedPosts,
  setSavedPostId,
  authFetch,
) => {
  const res = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/post/toggle`,
    {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    },
  );

  const data = await res.json();
  console.log("Saved status:", data.saved);
  if (action === "unsave") {
    setSavedPosts((prev) =>
      prev.filter((postsaved) => postsaved.post.id !== postId),
    );
    return;
  }
  // Toggle logic for savedPostIds
  setSavedPostId((prev) => {
    if (prev.includes(postId)) {
      // unsave: remove it
      return prev.filter((id) => id !== postId);
    } else {
      // save: add it
      return [...prev, postId];
    }
  });
};

export default handleToggleSave;
