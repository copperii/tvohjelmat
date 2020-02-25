import { useState, useEffect } from 'react'
import axios from 'axios'
import { getCurrentTime } from '../utils'

const useFetch = (initialUrl = '', initialValue = []) => {
  const [data, setData] = useState(initialValue)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [url, setUrl] = useState(initialUrl)
  const [fetchAgain, setFetchAgain] = useState(0)
  const [lastFetch, setLastFetch] = useState()

  useEffect(() => {
    setLastFetch(getCurrentTime())

    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(url)

        if (response.status === 200) {
          setData(response.data)
        }
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url, fetchAgain])

  const refetch = () => {
    if (!loading && data.length !== 0) {
      if (lastFetch !== getCurrentTime()) {
        setFetchAgain(fetchAgain + 1)
      }
    }
  }

  return [{ loading, data, error }, refetch, setUrl]
}

export default useFetch
