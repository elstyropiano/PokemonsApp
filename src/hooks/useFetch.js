import { useState, useEffect } from 'react'

const useFetch = url => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        const rowData = await response.json()
        setLoading(false)
        setData(rowData)
      } catch (err) {
        setLoading(false)
        setData(null)
        setError(true)
      }
    })()
  }, [url])

  return { data, loading, error }
}

export default useFetch
