import React from 'react';
import { Button, Flex, FlexItem, Grid, GridItem, TreeView, TreeViewDataItem } from '@patternfly/react-core';
import ProviderIcon from '@patternfly/react-icons/dist/js/icons/cloud-tenant-icon';
import DatacenterIcon from '@patternfly/react-icons/dist/js/icons/infrastructure-icon';
import DatastoreIcon from '@patternfly/react-icons/dist/js/icons/storage-domain-icon';
import ClusterIcon from '@patternfly/react-icons/dist/js/icons/cluster-icon';
import PortIcon from '@patternfly/react-icons/dist/js/icons/port-icon';
import SwitchIcon from '@patternfly/react-icons/dist/js/icons/hubspot-icon';
import NetworkIcon from '@patternfly/react-icons/dist/js/icons/network-icon';
import HostIcon from '@patternfly/react-icons/dist/js/icons/container-node-icon';
import VMIcon from '@patternfly/react-icons/dist/js/icons/virtual-machine-icon';
import FolderIcon from '@patternfly/react-icons/dist/js/icons/folder-icon';
import NamespaceIcon from '@patternfly/react-icons/dist/js/icons/namespaces-icon';

import InventoryCard from '@app/analytics/Inventory/components/InventoryCard';
import useExplorerRouteMatch from '../hooks/useExplorerRouteMatch';
import { ProviderType, TreeType } from './Explorer';
import './ProviderTree.css';

type ProviderTree = {
  id: string;
  name: string;
  children: any;
};

interface IProviderTreeProps {
  providers: ProviderTree[];
  providerType: ProviderType;
  treeType: TreeType;
}

const getIcon = (kind) => {
  if (kind.match(/VSphere|Openshift/)) {
    return <ProviderIcon />;
  }
  if (kind === 'Datacenter') {
    return <DatacenterIcon />;
  }
  if (kind === 'Cluster') {
    return <ClusterIcon />;
  }
  if (kind === 'Datastore') {
    return <DatastoreIcon />;
  }
  if (kind === 'DVPortGroup') {
    return <PortIcon />;
  }
  if (kind === 'DVSwitch') {
    return <SwitchIcon />;
  }
  if (kind === 'Network') {
    return <NetworkIcon />;
  }
  if (kind === 'Host') {
    return <HostIcon />;
  }
  if (kind.match(/VM|VMC/)) {
    return <VMIcon />;
  }
  if (kind === 'Folder') {
    return <FolderIcon />;
  }
  if (kind === 'Namespace') {
    return <NamespaceIcon />;
  }
  return null;
};

const sortByKindOrName = (a, b) => {
  if (a.kind === b.kind) return a.name.localeCompare(b.name);
  return a.kind.localeCompare(b.kind);
};

const sortProviders = (node) => {
  node.sort(sortByKindOrName);
  return node.map((element) => {
    let children = {};
    if (element.children) {
      element.children.sort(sortByKindOrName);
      children = sortProviders(element.children);
    }
    return { ...element, children: children };
  });
};

const getItem = (node: any[], id: string) => {
  const res = node.flatMap((element) => {
    if (element.id === id || element.id.split('.')[0] === id) return element;
    if (element.children) return getItem(element.children, id);
  });
  return res.filter((e) => e != null)[0];
};

const getTreeNodesFromProviderNode = (node: any[]): TreeViewDataItem[] =>
  node.map((element) => {
    return {
      id: element.id,
      name: element.name,
      kind: element.kind,
      icon: getIcon(element.kind),
      ...(element.children ? { children: getTreeNodesFromProviderNode(element.children) } : {}),
    };
  });

const ProviderTree: React.FunctionComponent<IProviderTreeProps> = ({
  providers,
  providerType,
  treeType,
}: IProviderTreeProps) => {
  const { activeItem, goToItem } = useExplorerRouteMatch();
  sortProviders(providers);

  const [cardItem, setCardItem] = React.useState(activeItem());

  const treeItems = getTreeNodesFromProviderNode(providers);
  const selectedItem = activeItem() !== null ? getItem(treeItems, activeItem()) : undefined;

  React.useEffect(() => {
    if (activeItem() !== null) setCardItem(getItem(providers, activeItem()));
  }, [providers, activeItem]);

  const onClick = (providerType, treeType, itemId) => {
    const item = getItem(providers, activeItem());
    setCardItem(item);
    goToItem(providerType, treeType, itemId);
  };

  return (
    <Grid hasGutter>
      <GridItem className="tree" span={3}>
        <TreeView
          data={treeItems}
          defaultAllExpanded
          onSelect={(_, item) => onClick(providerType, treeType, item.id)}
          activeItems={[selectedItem]}
        />
      </GridItem>
      <GridItem span={9}>
        <Flex alignItems={{ default: 'alignItemsStretch' }}>
          <FlexItem>{cardItem ? <InventoryCard item={cardItem}></InventoryCard> : null}</FlexItem>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ProviderTree;
