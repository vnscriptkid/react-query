import axios from "axios";
import { useQuery } from "react-query";

const useSearch = (pokemon) =>
  useQuery(
    ["pokemon", pokemon],
    () => {
      const source = axios.CancelToken.source();

      const promise = new Promise((resolve) => setTimeout(resolve, 2000)).then(
        () => {
          return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
            cancelToken: source.token,
          });
        }
      );

      promise.cancel = () => {
        source.cancel(
          `Query ${["pokemon", pokemon]} is cancelled by react-query.`
        );
        console.log(
          `Query ${["pokemon", pokemon]} is cancelled by react-query.`
        );
      };

      return promise;
    },
    {
      enabled: !!pokemon,
      retry: 2,
      retryDelay: 1000,
      onError: (err) => {
        console.log("oops, ", { err });
      },
      onSettled: (data, err) => {
        const dataOrError = err || data;
        console.log("it is either success or error", dataOrError);
      },
    }
  );

const SearchResult = ({ pokemon }) => {
  const queryInfo = useSearch(pokemon);

  if (queryInfo.isLoading) return <span>loading...</span>;

  if (queryInfo.isError) return <span>{queryInfo.error.message}</span>;

  return (
    <div>
      {queryInfo?.data?.data?.sprites?.front_default ? (
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
