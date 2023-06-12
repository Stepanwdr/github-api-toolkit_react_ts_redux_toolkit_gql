import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context";
import { history } from '../helpers/history';

  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    let token= localStorage.getItem('token')
    token = token ? JSON.parse(token) : ''
  
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((error) => {
        
        console.log('GraphQL Error:', error.message);
      });
    }
    if (networkError) {
     
      console.log('Network Error:', networkError);
      localStorage.removeItem('token')
      history.push('/auth')
    }
  });

   export const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
    cache: new InMemoryCache(),
  });



