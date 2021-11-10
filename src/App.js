import { useQuery } from "react-query";
import axios from "axios";

import "./App.css";

function App() {
  const queryInfo = useQuery(
    "pokemon",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await axios.get("https://pokeapi.co/api/v2/pokemon");

      return res.data.results;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return queryInfo.status === "loading" ? (
    <div>loading...</div>
  ) : queryInfo.status === "error" ? (
    <div>Ooops! {queryInfo.error.message}</div>
  ) : (
    <div>
      <h2>list of pokes</h2>
      <ul>
        {queryInfo.data.map((poke) => (
          <li key={poke.name}>{poke.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
