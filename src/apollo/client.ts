import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthService } from '../services/auth.service';

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_BASE_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = AuthService.getTokens();
  console.warn('token', token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? token.accessToken : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          user: {
            read(_, { args, toReference }) {
              return toReference({
                __typename: 'UserEntity',
                id: args?.id,
              });
            },
          },
        },
      },
    },
  }),
});
