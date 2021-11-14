import axios from "axios";
import { useQuery, queryCache } from "react-query";

const PostsList = ({ setPostId }) => {
  const queryInfo = useQuery("posts", async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");

    const todos = res.data;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    todos.forEach((todo) => {
      queryCache.setQueryData(["post", todo.id], todo);
    });

    return todos;
  });

  if (queryInfo.isLoading) return <div>loading...</div>;

  const todos = queryInfo.data || [];

  return (
    <div>
      <h2>PostsList {queryInfo.isFetching && <span>updating...</span>}</h2>
      {todos.map((todo) => (
        <li key={todo.id}>
          <a href="#" onClick={() => setPostId(todo.id)}>
            {todo.title}
          </a>
        </li>
      ))}
    </div>
  );
};

export default PostsList;
