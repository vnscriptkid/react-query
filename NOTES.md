## Observations
- good points
  - keep track states of req: `loading` || `error` || `success`
  - avoid doing things like `const [loading, setLoading] = useState(false)`
  - do retries in case of failure