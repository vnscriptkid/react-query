## Observations
- good points
  - keep track states of req: `loading` || `error` || `success` || `fetching` with nice api
  - avoid doing things like `const [loading, setLoading] = useState(false)`
  - do retries in case of failure
  - decide when to refetch a query
    - `refetchOnWindowFocus`
    - `staleTime`
      - out-of-the-box: done `fetching` -> `stale`
      - `staleTime` is how long a query remains `fresh` after done fetching (by default it becomes `stale` right away)
    - `cacheTime`: component get unmounted, how long query stay `inactive` (in cache) ?
  - can parameterize component by `queryKey` used inside
  - same queryKeys produce only 1 network req
  - can abtract query into custom hook, to reuse between components
  - queries run parallel
  - can cache search result
  - can set condition when to start a query by `enabled`
  - can config descriptive query name using array
  - can setup `initalData` for query
  - `initialData` + `initialState`:
    - use case: `index` page to `details` page
    - first set initialData of `details` page from `index` page
    - as `initialState` is true, it starts a query to get all the latest data of details
  - can share data between queries: `queryCache.getQueryData("posts")`
  - helps with scroll restoration (as we have caching)
    - react-router supports scroll restoration out-of-the-box
  - refetch periodically with `refetchInterval`
    - use case: chat-app (polling approach >< websocket)
    - `refetchIntervalInBackground`: even when tab is not active
## errors
- retries:
  - default: exponential backoff, retry 3 times, before mark it as error
  - configurable
- cancel outdated queries (autocomplete for exp):
  - normal: `debounce`
  - react-query way: expose `axios` req to `react-query`

## pull and push styles with `queryCache`
- pull: proactively ask for data from another query
- push: proactively set data for another query

## side-effects: tap into query's life-cycle
- 3 side-effects: `onSuccess`, `onError`, `onSettled`

## invalidation
- invalide a queryKey (work in `prefix` fashion) => refetch that queryKey
- use subKey to spawn diff instances of queries
```js
invalidateQueries(['post'])
invalidateQueries(['post', 'A'])
invalidateQueries(['post', 'B'])
```

## prefetch
- imperatively `prefetch` at root component: `queryCache.prefetchQuery('posts', fetchPosts)` in `useEffect`
- `prefetch` when hover on link with `onMouseEnter`, use `staleTime` not to annoy server before certain duration
- use `force` option to run query whether it's stale or not

## mutations
- def:
  - query: Read
  - mutation: Create, Update, Delete

![image](https://user-images.githubusercontent.com/28957748/141688846-17c314d0-a876-422c-9d38-c02dcc154d76.png)

- flow: createPost -> successful -> invalidate `posts` query -> refetch `posts` query
- same as `query`, `mutation` does have `side-effects`: `onSuccess`, `onError`, `onSettled`
- `onError` receives `error` object from axios in case status is in error range
- for exp: `error.response.data.message`

![image](https://user-images.githubusercontent.com/28957748/141689962-227e9957-165b-4c31-89c9-061fcebbc6d0.png)

- optimistic reload: save todo -> getting updated data -> set data to query (without calling get api)
- optimistic update:
  - populate data to client before getting updated data
  - handle error

![image](https://user-images.githubusercontent.com/28957748/141711450-ed5b92d7-a638-4a69-83c1-9d23c02096a4.png)

## pagination
- use `usePaginatedQuery`

![image](https://user-images.githubusercontent.com/28957748/141713306-6c2754db-adaa-48f5-9644-59be654c7817.png)

## Redux vs react-query
