import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import './index.css'
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { client } from './graphql';
import App from './App';

const store = setupStore()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
      <ApolloProvider client={client}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
      </ApolloProvider>
    </Provider>
)
