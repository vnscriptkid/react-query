import axios from "axios";
import { useQuery, queryCache } from "react-query";

const PostDetails = ({ setPostId, postId }) => {
  const queryInfo = useQuery(
    ["post", postId],
    async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/${postId}`
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));

      return res.data;
    },
    {
      initialStale: true,
    }
  );

  if (queryInfo.isLoading) return <div>loading...</div>;

  return (
    <div>
      <button onClick={() => setPostId(-1)}>Back</button>
      <h3>
        {queryInfo.data.title}{" "}
        {queryInfo.isFetching && <span>updating...</span>}
      </h3>
      <p>Completed: {String(queryInfo.data.completed)}</p>
      <button onClick={() => queryCache.invalidateQueries(["post", postId])}>
        invalidate post details
      </button>
      <br />
    </div>
  );
};

export default PostDetails;
