import { useHistory, useRouteMatch } from 'react-router';

import { BrowserType } from '../components/Explorer';

interface IBrowserMatchParams {
  url: string;
  browserType: string;
}

interface IElementMatchParams {
  url: string;
  browserType: string;
  provider: string;
  elementId: string;
}
const useBrowserRouteMatch = () => {
  const history = useHistory();

  const rootMatch = useRouteMatch<IBrowserMatchParams>({
    path: '/analytics/explorer/:browserType',
    strict: true,
    sensitive: true,
  });

  const elementMatch = useRouteMatch<IElementMatchParams>({
    path: '/analytics/explorer/:browserType/:provider/:elementId',
    strict: true,
    sensitive: true,
  });

  const browserType = rootMatch?.params.browserType || elementMatch?.params.browserType || 'hosts';

  const goToItem = (browserType: BrowserType, itemId) => {
    const [element, provider] = itemId.split('.');
    history.push(`/analytics/explorer/${browserType}/${provider}/${element}`);
  };

  const activeItem = elementMatch?.params.elementId
    ? `${elementMatch.params.elementId}.${elementMatch.params.provider}`
    : undefined;

  return { browserType, activeItem, goToItem };
};

export default useBrowserRouteMatch;
