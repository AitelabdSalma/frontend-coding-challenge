import { useEffect, useState } from 'react'
import axios from 'axios'
import { get30DaysAgoDate } from '../utils/timeUtils'

export default function useRepositorySearch(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [repositories, setRepositories] = useState([])
  const [hasMore, setHasMore] = useState(false)

  const date = get30DaysAgoDate()

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: 'https://api.github.com/search/repositories',
      params: {
        q: `created:>${date}`,
        page: pageNumber,
        sort: 'stars',
        order: 'desc'
      },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setRepositories(prevRepositories => {
        return [...new Set([...prevRepositories, ...res.data.items])]
      })
      setHasMore(res.data.incomplete_results)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
      setLoading(false)
    })
    return () => cancel()
  }, [pageNumber, date])

  return { loading, error, repositories, hasMore }
}
