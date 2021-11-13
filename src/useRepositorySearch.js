import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useRepositorySearch(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [repositories, setRepositories] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: 'https://api.github.com/search/repositories',
      params: { q: 'created:>2017-10-22', page: pageNumber, sort: 'stars', order: 'desc' },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      console.log("resres", res);
      setRepositories(prevRepositories => {
        return [...new Set([...prevRepositories, ...res.data.items.map(b => b.name)])]
      })
      setHasMore(res.data.incomplete_results)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [pageNumber])

  return { loading, error, repositories, hasMore }
}
