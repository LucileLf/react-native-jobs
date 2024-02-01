import { useState, useEffect } from 'react'
import axios from 'axios'

// import { RAPID_API_KEY } from '@env'
// const rapidApiKey = RAPID_API_KEY

const useFetch = (endpoint, query) => {
  //console.log(`received request to ${endpoint} with q ${query.query}`);
  //console.log('params', {...query});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  //const axios = require('axios');

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {...query},
    headers: {
      'X-RapidAPI-Key': '81fbc7676fmsh2e55a9da1214b45p1d1bb1jsn1b5f976881f7',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false)
    } catch (error) {
      setError(error);
      alert(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }

  return { data, isLoading, error, refetch }
}


export default useFetch;
