import React, { useEffect, useState } from "react"; 
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import { SearchDriver } from "@elastic/search-ui";
import "./App.css";

const connector = new ElasticsearchAPIConnector({
  host: "http://localhost:9200",
  index: "cv-transcriptions",
  connectionOptions: {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("elastic:aquila"),
    },
  },
});

const config = {
  apiConnector: connector,
  searchQuery: {
    search_fields: {
      generated_text: { weight: 3 },
      duration: { weight: 1 },
      age: { weight: 1 },
      gender: { weight: 1 },
      accent: { weight: 1 },
    },
    result_fields: {
      generated_text: { raw: {} },
      duration: { raw: {} },
      age: { raw: {} },
      gender: { raw: {} },
      accent: { raw: {} },
    },
  },
};

const driver = new SearchDriver(config);

function App() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = driver.subscribeToStateChanges((state) => {
      if (state.results) {
        setResults(state.results);
      }
      if (state.error) {
        setError(state.error);
      }
    });
  
    // Trigger a search action
    driver.getActions().setSearchTerm("");
  
    // Remove this line as no unsubscribe function is returned
  }, []);
  

  return (
    <div>
      <h1>Search Results</h1>
      {error && <p>Error: {error.message}</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <p><strong>Generated Text:</strong> {result.generated_text?.raw ? result.generated_text.raw : "No text available"}</p>
            <p><strong>Duration:</strong> {result.duration?.raw ? result.duration.raw : "No text available"}s</p>
            <p><strong>Age:</strong> {result.age?.raw ? result.age.raw : "No text available"}</p>
            <p><strong>Gender:</strong>  {result.gender?.raw ? result.gender.raw : "No text available"}</p>
            <p><strong>Accent:</strong> {result.accent?.raw ? result.accent.raw : "No text available"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
