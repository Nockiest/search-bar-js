import {useEffect, useState} from 'react'
import AutocompleteSearchBar from './Searchbar';
import QueryListTable from './queryListTable';
import axios from 'axios'
function App() {
  const [query, setQuery] = useState ("");
  const [results, setResults] = useState( []);

  useEffect(() => {

    axios
      .get("http://localhost:3002/search", { params: { query } })
      .then((response) => {
        const data = response.data;
        console.log('data', data)
        if (data === null){
          return
        }
        setResults(data);

      })
      .catch((error) => {
        throw new Error('problem with fetching data', error.message,  )
      });
  }, [query]);
  return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <div style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50% )",
            }}>Googleplex</div>
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50% )",
            }}
          >
            <AutocompleteSearchBar query={query} setQuery={setQuery}/>
            <QueryListTable results={results} query={query} setQuery={setQuery}/>
          </div>
        </div>

  );
}





export default App;
