import { useHistory, useRouteMatch } from 'react-router';

import { ProviderType, TreeType } from '../components/Explorer';

interface IBrowserMatchParams {
  url: string;
  treeType: string;
  providerType: string;
}

interface IElementMatchParams {
  url: string;
  providerType: string;
  treeType: string;
  provider: string;
  elementId: string;
}

const useExplorerRouteMatch = () => {
  const history = useHistory();

  const rootMatch = useRouteMatch<IBrowserMatchParams>({
    path: '/analytics/explorer/:providerType/:treeType',
    strict: true,
    sensitive: true,
  });

  const elementMatch = useRouteMatch<IElementMatchParams>({
    path: '/analytics/explorer/:providerType/:treeType/:provider/:elementId',
    strict: true,
    sensitive: true,
  });

  const goToItem = (providerType: ProviderType, treeType: TreeType, itemId) => {
    const [element, provider] = itemId.split('.');
    history.push(`/analytics/explorer/${providerType}/${treeType}/${provider}/${element}`);
  };

  const providerTypeFromRoute = () => {
    if (rootMatch?.params.providerType) return rootMatch.params.providerType;
    if (elementMatch?.params.providerType) return elementMatch.params.providerType;
    return 'vsphere';
  };

  const treeTypeFromRoute = (providerType) => {
    if (rootMatch?.params.treeType) return rootMatch.params.treeType;
    if (elementMatch?.params.treeType) return elementMatch.params.treeType;
    if (providerType === 'openshift') return 'namespaces';
    return 'hosts';
  };

  const activeItemFromRoute = () => {
    return elementMatch?.params.elementId
      ? `${elementMatch.params.elementId}.${elementMatch.params.provider}`
      : undefined;
  };

  const providerType = providerTypeFromRoute();
  const treeType = treeTypeFromRoute(providerType);
  const activeItem = activeItemFromRoute();

  return { providerType, treeType, activeItem, goToItem };
};

export default useExplorerRouteMatch;
