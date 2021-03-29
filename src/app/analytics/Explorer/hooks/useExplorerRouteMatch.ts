import React from 'react';
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

const tabStates = [
  {
    kind: 'vsphere',
    title: 'VSphere Explorator ',
  },
  {
    kind: 'openshift',
    title: 'Openshift Explorator',
  },
];

const subTabStates = [
  { kind: 'hosts', title: 'Host and Cluster view' },
  { kind: 'vms', title: 'Virtual Machine Hierarchy view' },
  {
    kind: 'networks',
    title: 'Network view',
  },
  {
    kind: 'storage',
    title: 'Storage view',
  },
  { kind: 'hostTreeFlat', title: 'Filter Virtual Machines (by Host and Cluster)' },
  {
    kind: 'namespaces',
    title: 'Namespace view',
  },
  { kind: 'vmcs', title: 'Virtual Machines' },
];

const getProvider = (id) => {
  return id.split('.')[1];
};

const getItemId = (id) => {
  return id.split('.')[0];
};

const useExplorerRouteMatch = () => {
  const getTitle = (providerType) => tabStates.find((tab) => tab.kind === providerType)?.title;
  const getSubTitle = (treeType) => subTabStates.find((tab) => tab.kind === treeType)?.title;

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
    const provider = getProvider(itemId);
    const element = getItemId(itemId);

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

  const activeItem = () =>
    elementMatch?.params.elementId
      ? `${elementMatch.params.elementId}.${elementMatch.params.provider}`
      : `${providerMatch?.params.provider}`;

  const pageTitle = getTitle(providerType);
  const pageTitleSub = getSubTitle(treeType);

  return { providerType, treeType, activeItem, pageTitle, pageTitleSub, goToItem };
};

export default useExplorerRouteMatch;
