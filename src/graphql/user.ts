import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    viewer {
      login
      name
      email
      avatarUrl
      repositories(first: 10) {
        nodes {
          name
          description
          stargazerCount
        }
      }
    }
  }
`;
