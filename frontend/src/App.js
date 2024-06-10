import './App.css';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";

import BooksView from './components/BooksView';

const link = from([
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(), 
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BooksView />
    </ApolloProvider>
  );
}

export default App;
