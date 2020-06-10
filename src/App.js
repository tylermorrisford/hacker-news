import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
export default function App() {
  
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  useEffect( () => {getResults()}, [])
  
      const getResults = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
          setResults(response.data.hits);
        } catch (err) {
          setError(err)
        }

          setLoading(false);
      }

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  }

  const handleClearSearch = () => {
    setQuery('');
    searchInputRef.current.focus()
  }

  return(
    <div style={{display: 'grid', alignItems: 'center', justifyContent: 'center'}}> 
    <h2 style={{textAlign: 'center'}}>Grab Articles From Hacker News</h2>
    <div style={{display: 'inline-block', textAlign: 'center'}}>
      <form onSubmit={handleSearch}>
    <input style={{width: '300px'}} type='text' value={query} onChange={event => setQuery(event.target.value)} ref={searchInputRef}></input>
    <button type='submit'>Search</button>
    <button type='button' onClick={handleClearSearch}>Clear</button>
      </form>
    </div>
    {loading ? <div>Loading Results</div> : <ul>
      {results.map(result => (
        <li key={result.objectID}>
          <a href={result.url}>{result.title}</a>
        </li>
      ))}
    </ul>}
    {error && <div>{error.message}</div>}
    </div>
  )
}
