## Observations
- good points
  - keep track states of req: `loading` || `error` || `success` || `fetching` with nice api
  - avoid doing things like `const [loading, setLoading] = useState(false)`
  - do retries in case of failure
  - decide when to refetch a query
    - `refetchOnWindowFocus`