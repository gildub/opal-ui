import React from 'react';
import { Flex, FlexItem, Grid, GridItem, TreeView, TreeViewDataItem } from '@patternfly/react-core';
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

import InventoryCard from './InventoryCard';
import useBrowserRouteMatch from '../hooks/useBrowserRouteMatch';
import { BrowserType } from './Browsers';
import './ProviderTree.css';

type ProviderTree = {
  id: string;
  name: string;
  children: any;
};

interface IProviderTreeProps {
  providers: ProviderTree[];
  browserType: BrowserType;
}

const getIcon = (kind) => {
  if (kind === 'Provider') {
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
  if (kind === 'VM') {
    return <VMIcon />;
  }
  if (kind === 'Folder') {
    return <FolderIcon />;
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
  const res = node.map((element) => {
    if (element.id === id) return element;
    if (element.children) return getItem(element.children, id);
  });
  return res.flat().filter((e) => e != null)[0];
};

const ProviderTree: React.FunctionComponent<IProviderTreeProps> = ({ providers, browserType }: IProviderTreeProps) => {
  const { activeItem, goToItem } = useBrowserRouteMatch();

  const cardItem = activeItem ? getItem(providers, activeItem) : undefined;

  const getTreeNodesFromProviderNode = (node: any[]): TreeViewDataItem[] =>
    node.map((element) => {
      if (element.kind === 'VM') {
        return {
          name: `${element.name} (${element.id})`,
          icon: getIcon(element.kind),
          kind: 'VM',
          id: element.id,
        };
      }

      return {
        icon: getIcon(element.kind),
        name: element.name,
        kind: element.kind,
        id: element.id ? element.id : null,
        ...(element.children ? { children: getTreeNodesFromProviderNode(element.children) } : {}),
      };
    });

  sortProviders(providers);
  const treeItems = getTreeNodesFromProviderNode(providers);

  return (
    <Grid hasGutter>
      <GridItem className="tree" span={3}>
        <TreeView
          data={treeItems}
          defaultAllExpanded
          onSelect={(_, item) => goToItem(browserType, item.id)} /* activeItems={[activeItem]} */
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
