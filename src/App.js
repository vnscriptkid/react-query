import { useQuery } from "react-query";
import axios from "axios";
import { useReducer } from "react";

import "./App.css";
import PokemonSearch from "./Search/PokemonSearch";

const usePokemon = () =>
  useQuery(
    "pokemon",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await axios.get("https://pokeapi.co/api/v2/pokemon");

      return res.data.results;
    },
    {
      cacheTime: Infinity,
    }
  );

const useBerries = () =>
  useQuery(
    "berries",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await axios.get("https://pokeapi.co/api/v2/berry");

      return res.data.results;
    },
    {
      cacheTime: Infinity,
    }
  );

function CountPokemons() {
  const queryInfo = usePokemon();

  return <h3>there are {queryInfo.data?.length} pokemons loaded</h3>;
}

function Pokemon() {
  const queryInfo = usePokemon();

  return queryInfo.isLoading ? (
    <div>loading...</div>
  ) : queryInfo.isError ? (
    <div>Ooops! {queryInfo.error.message}</div>
  ) : (
    <div>
      <h2>list of pokes</h2>
      <ul>
        {queryInfo.data.map((poke) => (
          <li key={poke.name}>{poke.name}</li>
        ))}
      </ul>
      <br />
      {queryInfo.isFetching && <div>updating...</div>}
    </div>
  );
}

function Berries() {
  const queryInfo = useBerries();

  return queryInfo.isLoading ? (
    <div>loading...</div>
  ) : queryInfo.isError ? (
    <div>Ooops! {queryInfo.error.message}</div>
  ) : (
    <div>
      <h2>list of berries</h2>
      <ul>
        {queryInfo.data.map((b) => (
          <li key={b.name}>{b.name}</li>
        ))}
      </ul>
      <br />
      {queryInfo.isFetching && <div>updating...</div>}
    </div>
  );
}

const App = () => {
  const [show, toggle] = useReducer((s) => !s, true);

  return (
    <div>
      {show ? (
        <div>
          <button onClick={toggle}>Hide</button>
          <PokemonSearch />
          <CountPokemons />
          <Berries />
          <Pokemon />
        </div>
      ) : (
        <button onClick={toggle}>Show</button>
      )}
    </div>
  );
};

export default App;
