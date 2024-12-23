import React from "react";
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import "./App.css";

const elasticPassword = import.meta.env.ELASTIC_PASSWORD;
const host = import.meta.env.HOST;
const username = import.meta.env.USERNAME;

// Check if the environment variables are loaded correctly (optional)
console.log(elasticPassword, host, username);

const connector = new ElasticsearchAPIConnector({
  host: host,
  index: "cv-transcriptions",
  connectionOptions: {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${username}:${elasticPassword}`),
    },
  },
});

const config = {
  searchQuery: {
    search_fields: {
      "generated_text": { weight: 3 },
      "text": { weight: 2 },
      "filename": { weight: 2 },
      "accent": { weight: 1 },
      "age": { weight: 1 },
      "gender": { weight: 1 }
    },
    result_fields: {
      filename: { raw: {} },
      generated_text: { raw: {} },
      text: { raw: {} },
      duration: { raw: {} },
      age: { raw: {} },
      gender: { raw: {} },
      accent: { raw: {} },
      // up_votes: { raw: {} },
      // down_votes: { raw: {} }
    },
    disjunctiveFacets: ["accent.keyword", "age.keyword", "gender.keyword"],
    facets: {
      "accent.keyword": { type: "value" },
      "age.keyword": { type: "value" },
      "gender.keyword": { type: "value" },
      "duration": {
        type: "range",
        ranges: [
          { from: 0, to: 4, name: "0-4s" },
          { from: 5, to: 9, name: "5-9s" },
          { from: 10, to: 14, name: "10-14s" },
          { from: 15, to: 19, name: "15-19s" },
          { from: 20, name: "20s+" }
        ]
      }
    }
  },
  autocompleteQuery: {
    results: {
      resultsPerPage: 5,
      search_fields: {
        "generated_text": { weight: 3 },
        "text": { weight: 2 },
        "filename": { weight: 2 }
      },
      result_fields: {
        generated_text: { snippet: { size: 100, fallback: true } },
        text: { snippet: { size: 100, fallback: true } },
        filename: { raw: {} }
      }
    }
  },
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true
};

export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
        {({ wasSearched }) => (
          <div className="App">
            <ErrorBoundary>
              <Layout
                header={
                  <SearchBox
                    autocompleteMinimumCharacters={3}
                    autocompleteResults={{
                      linkTarget: "_blank",
                      sectionTitle: "Results",
                      titleField: "filename",
                      urlField: "url",
                      shouldTrackClickThrough: true,
                    }}
                    autocompleteSuggestions={true}
                    debounceLength={0}
                  />
                }
                sideContent={
                  <div>
                    {wasSearched && <Sorting label={"Sort by"} sortOptions={[]} />}
                    <Facet key={"1"} field={"accent.keyword"} label={"Accent"} />
                    <Facet key={"2"} field={"age.keyword"} label={"Age"} />
                    <Facet key={"3"} field={"gender.keyword"} label={"Gender"} />
                    <Facet key={"4"} field={"duration"} label={"Duration"} />
                  </div>
                }
                bodyContent={<Results shouldTrackClickThrough={true} />}
                bodyHeader={
                  <React.Fragment>
                    {wasSearched && <PagingInfo />}
                    {wasSearched && <ResultsPerPage />}
                  </React.Fragment>
                }
                bodyFooter={<Paging />}
              />
            </ErrorBoundary>
          </div>
        )}
      </WithSearch>
    </SearchProvider>
  );
}
