import axios from "axios";
import { useQuery } from "react-query";

const useSearch = (pokemon) =>
  useQuery(
    ["pokemon", pokemon],
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );

      return res.data;
    },
    {
      cacheTime: Infinity,
      enabled: !!pokemon,
      retry: 1,
      retryDelay: 1000,
    }
  );

const SearchResult = ({ pokemon }) => {
  const queryInfo = useSearch(pokemon);

  if (queryInfo.isLoading) return <span>loading...</span>;

  if (queryInfo.isError) return <span>{queryInfo.error.message}</span>;

  return (
    <div>
      {queryInfo?.data?.sprites?.front_default ? (
        <img
          src={queryInfo?.data?.sprites?.front_default}
          width="200px"
          height="200px"
          alt="search"
        />
      ) : (
        <div style={{ color: "red" }}>Not found</div>
      )}
    </div>
  );
};

export default SearchResult;
