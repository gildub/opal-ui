import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client

const queryClient = new QueryClient();

const App: React.FunctionComponent = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default hot(App);
