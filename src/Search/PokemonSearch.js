import { useState } from "react";
import SearchResult from "./SearchResult";

const PokemonSearch = () => {
  const [pokemon, setPokemon] = useState("");

  return (
    <div>
      <label>type in name of pokemon:</label>
      <input value={pokemon} onChange={(e) => setPokemon(e.target.value)} />
      <button>search</button>
      <SearchResult pokemon={pokemon} />
    </div>
  );
};

export default PokemonSearch;
