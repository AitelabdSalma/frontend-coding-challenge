import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useRepositorySearch(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [repositories, setRepositories] = useState([])
  const [hasMore, setHasMore] = useState(false)

  const date = formatDate()

  function formatDate() {
    let today = new Date()
    var priorDate = new Date().setDate(today.getDate() - 30)
    let d = new Date(priorDate)

    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

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
        return [...new Set([...prevRepositories, ...res.data.items.map(b => b.name)])]
      })
      setHasMore(res.data.incomplete_results)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [pageNumber, date])

  return { loading, error, repositories, hasMore }
}
