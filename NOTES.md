## Observations
- good points
  - keep track states of req: `loading` || `error` || `success` || `fetching` with nice api
  - avoid doing things like `const [loading, setLoading] = useState(false)`
  - do retries in case of failure
  - decide when to refetch a query
    - `refetchOnWindowFocus`
    - `staleTime`
      - out-of-the-box: done `fetching` -> `stale`
      - `staleTime` is how long a query remains `fresh` after done fetching
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