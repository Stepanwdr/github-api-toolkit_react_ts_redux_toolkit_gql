import { gql } from '@apollo/client';
export const GET_REPOSITORY = gql`
  query GetRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      stargazerCount
      pushedAt
      owner {
        login
        avatarUrl
        url
      }
      languages(first: 20) {
        nodes {
          name
        }
      }
      description
    }
  }
`;

export const SEARCH_REPOSITORIES = gql`
     query searchRepositories($query:String!,$first:Int,$last:Int,$before:String,$after:String){
      search(query:$query, type: REPOSITORY, first: $first,last:$last,before:$before,after:$after) {
        repositoryCount
       pageInfo{
        endCursor
        startCursor
       }
       edges {
        cursor
        node {
          ... on Repository {
          name
          owner {
            login
           avatarUrl
             url
            }
          url
          stargazerCount
          pushedAt
          }
    }
}}
  }

`