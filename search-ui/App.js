import { SearchProvider, SearchBox, Results, Facet } from '@elastic/react-search-ui';
import { ElasticsearchAPIConnector } from '@elastic/search-ui-elasticsearch-connector';

const connector = new ElasticsearchAPIConnector({
  apiConnector: {
    apiBase: 'http://localhost:9200', // Elasticsearch endpoint
    searchEndpoint: '/your_index_name/_search', // Replace with your index name
  },
  facets: ['generated_text', 'duration', 'age', 'gender', 'accent'],  // Add your searchable fields here
});

const App = () => (
  <SearchProvider config={{ apiConnector: connector }}>
    <SearchBox />
    <Results />
    <Facet field="generated_text" />
    <Facet field="duration" />
    <Facet field="age" />
    <Facet field="gender" />
    <Facet field="accent" />
  </SearchProvider>
);

export default App;