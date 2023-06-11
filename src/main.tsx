import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter} from "react-router-dom";
import { ApolloProvider} from '@apollo/client';
import { client } from './graphql'
import Home from './pages/Home/Home';
import RepoPage from './pages/RepoPage/RepoPage';
import {onError} from '@apollo/client/link/error'
import App from './App';
import './index.css'
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
const store=setupStore()
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/:repoOwner/:repoName",
    element: <RepoPage/>,
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
      <App/>
      </Provider>
     
    </ApolloProvider>
  </React.StrictMode>,
)
