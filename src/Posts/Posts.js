import { useState } from "react";
import PostDetails from "./PostDetails";
import PostsList from "./PostsList";

const Posts = () => {
  const [postId, setPostId] = useState(-1);

  if (postId === -1) return <PostsList setPostId={setPostId} />;

  return <PostDetails setPostId={setPostId} postId={postId} />;
};

export default Posts;
