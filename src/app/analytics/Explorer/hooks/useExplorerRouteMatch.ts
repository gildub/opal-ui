import { useHistory, useRouteMatch } from 'react-router';

import { ProviderType, TreeType } from '../components/Explorer';

interface IExploraterMatchParams {
  url: string;
  providerType: string;
  treeType: string;
}
interface IProviderMatchParams extends IExploraterMatchParams {
  provider: string;
}
interface IElementMatchParams extends IProviderMatchParams {
  elementId: string;
}

const useExplorerRouteMatch = () => {
  const history = useHistory();

  const rootMatch = useRouteMatch<IExploraterMatchParams>({
    path: '/analytics/explorer/:providerType/:treeType',
    strict: true,
    sensitive: true,
  });

  const providerMatch = useRouteMatch<IProviderMatchParams>({
    path: '/analytics/explorer/:providerType/:treeType/:provider',
    strict: true,
    sensitive: true,
  });

  const elementMatch = useRouteMatch<IElementMatchParams>({
    path: '/analytics/explorer/:providerType/:treeType/:provider/:elementId',
    strict: true,
    sensitive: true,
  });

  const goToItem = (providerType: ProviderType, treeType: TreeType, itemId) => {
    const getProvider = (id) => {
      return id.split('.')[1];
    };

    const getItem = (id) => {
      return id.split('.')[0];
    };

    const provider = getProvider(itemId);
    const element = getItem(itemId);
    if (!provider) {
      history.push(`/analytics/explorer/${providerType}/${treeType}/${element}`);
      return;
    }

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

  const providerType = providerTypeFromRoute();
  const treeType = treeTypeFromRoute(providerType);

  const activeItem = elementMatch?.params.elementId
    ? `${elementMatch.params.elementId}.${elementMatch.params.provider}`
    : `${providerMatch?.params.provider}`;

  return { providerType, treeType, activeItem, goToItem };
};

export default useExplorerRouteMatch;
