import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import { accessibleRouteChangeHandler } from '@app/utils/utils';
import Explorer from '@app/analytics/Explorer/components/Explorer';
import PlayGround from '@app/analytics/PlayGround';
import { NotFound } from '@app/NotFound/NotFound';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';

let routeFocusTimer: number;
export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  /* eslint-disable @typescript-eslint/no-explicit-any */
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  exact?: boolean;
  path: string;
  title: string;
  isAsync?: boolean;
  routes?: undefined;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: AppRouteConfig[] = [
  {
    label: 'Analytics',
    routes: [
      {
        component: Explorer,
        exact: true,
        path: '/analytics/explorer',
        label: 'Explorers',
        title: 'analytics Explorer',
      },
      {
        component: Explorer,
        exact: true,
        path: '/analytics/explorer/:providerType',
        title: 'analytics Explorer Type',
      },
      {
        component: Explorer,
        exact: true,
        path: '/analytics/explorer/:providerType/:viewType',
        title: 'analytics Explorer View',
      },
      {
        component: Explorer,
        exact: true,
        path: '/analytics/explorer/:providerType/:viewType/:provider',
        title: 'analytics Explorer Provider Card',
      },
      {
        component: Explorer,
        exact: true,
        path: '/analytics/explorer/:providerType/:viewType/:provider/:itemId',
        title: 'analytics Explorer Card',
      },
      {
        component: PlayGround,
        exact: true,
        label: 'PlayGround',
        path: '/analytics/playGround',
        title: 'Inventory PlayGround',
      },
    ],
  },
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
const useA11yRouteChange = (isAsync: boolean) => {
  const lastNavigation = useLastLocation();
  React.useEffect(() => {
    if (!isAsync && lastNavigation !== null) {
      routeFocusTimer = accessibleRouteChangeHandler();
    }
    return () => {
      window.clearTimeout(routeFocusTimer);
    };
  }, [isAsync, lastNavigation]);
};

const RouteWithTitleUpdates = ({ component: Component, isAsync = false, title, ...rest }: IAppRoute) => {
  useA11yRouteChange(isAsync);
  useDocumentTitle(title);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return <Component {...rest} {...routeProps} />;
  }

  return <Route render={routeWithTitle} />;
};

const PageNotFound = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
};

const flattenedRoutes: IAppRoute[] = routes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[]
);

const AppRoutes = (): React.ReactElement => (
  <LastLocationProvider>
    <Switch>
      {flattenedRoutes.map(({ path, exact, component, title, isAsync }, idx) => (
        <RouteWithTitleUpdates
          path={path}
          exact={exact}
          component={component}
          key={idx}
          title={title}
          isAsync={isAsync}
        />
      ))}
      <PageNotFound title="404 Page Not Found" />
    </Switch>
  </LastLocationProvider>
);

export { AppRoutes, routes };
