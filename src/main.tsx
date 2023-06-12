import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import Home from './pages/Home/Home';
import RepoPage from './pages/RepoPage/RepoPage';
import './index.css'
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import Authorization from './pages/Authorization/Authorization';
import { client } from './graphql';
import App from './App';
const store = setupStore()
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Authorization />,
  },
  {
    path: "/:repoOwner",
    element: <Home />,
  },
  {
    path: "/:repoOwner/:repoName",
    element: <RepoPage />,
  },

]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
      <RouterProvider router={router} />
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </Provider>
)
