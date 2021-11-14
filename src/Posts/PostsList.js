import axios from "axios";
import { useQuery, queryCache } from "react-query";

async function fetchTodos() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return res.data;
}

const PostsList = ({ setPostId }) => {
  const queryInfo = useQuery(
    "posts",
    async () => {
      const todos = await fetchTodos();

      return todos;
    },
    {
      onSuccess: (todos) => {
        console.log("success: ", todos);
        todos.forEach((todo) => {
          queryCache.setQueryData(["post", todo.id], todo);
        });
      },
    }
  );

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
