import * as React from 'react';
import { PageSection, Tab, Tabs, TabTitleText, Title } from '@patternfly/react-core';

import useExplorerRouteMatch from '../hooks/useExplorerRouteMatch';
import { useHistory } from 'react-router';
import ProviderTree from './ProviderTree';
import {
  useHostsByProvider,
  useNetworksByProvider,
  useStorageByProvider,
  useVMsByProvider,
  useNamespacesByProvider,
  useVMCsByProvider,
} from '@app/analytics/common/hooks/useProviderQueries';
import HostTreeFlatTable from './HostTreeFlatTable';

export enum TreeType {
  hosts = 'hosts',
  networks = 'networks',
  storage = 'storage',
  vms = 'vms',
  vmcs = 'vmcs',
  namespaces = 'namespaces',
}

export enum ProviderType {
  vsphere = 'vsphere',
  openshift = 'openshift',
}

const Explorer: React.FunctionComponent = () => {
  const history = useHistory();
  const { providerType, treeType, pageTitle, pageTitleSub } = useExplorerRouteMatch();

  const handleTabClick = (_event, tabKey) => {
    const view = tabKey === 'openshift' ? 'namespaces' : 'hosts';
    history.push(`/analytics/explorer/${tabKey}/${view}`);
  };

  const handleTabClickSecond = (_event, tabKey) => {
    history.push(`/analytics/explorer/${providerType}/${tabKey}`);
  };

  const hostsByProvider = useHostsByProvider();
  const networksByProvider = useNetworksByProvider();
  const storageByProvider = useStorageByProvider();
  const vmsByProvider = useVMsByProvider();
  const namespacesByProvider = useNamespacesByProvider();
  const vmcsByProvider = useVMCsByProvider();

  return (
    <PageSection>
      <Title headingLevel="h2" size="lg">
        {pageTitle} - {pageTitleSub}
      </Title>
      <div>
        <Tabs activeKey={providerType} onSelect={handleTabClick} isBox={false}>
          <Tab eventKey="vsphere" title={<TabTitleText>VSphere</TabTitleText>}>
            <Tabs activeKey={treeType} isSecondary onSelect={(_event, tabKey) => handleTabClickSecond(_event, tabKey)}>
              <Tab eventKey="hosts" title={<TabTitleText>Hosts and Clusters</TabTitleText>}>
                {hostsByProvider ? (
                  <ProviderTree
                    providers={hostsByProvider}
                    providerType={ProviderType.vsphere}
                    treeType={TreeType.hosts}
                  />
                ) : null}
              </Tab>
              <Tab eventKey="vms" title={<TabTitleText>VM and Templates</TabTitleText>}>
                {vmsByProvider ? (
                  <ProviderTree providers={vmsByProvider} providerType={ProviderType.vsphere} treeType={TreeType.vms} />
                ) : null}
              </Tab>
              <Tab eventKey="storage" title={<TabTitleText>Storage</TabTitleText>}>
                {storageByProvider ? (
                  <ProviderTree
                    providers={storageByProvider}
                    providerType={ProviderType.vsphere}
                    treeType={TreeType.storage}
                  />
                ) : null}
              </Tab>
              <Tab eventKey="networks" title={<TabTitleText>Networking</TabTitleText>}>
                {networksByProvider ? (
                  <ProviderTree
                    providers={networksByProvider}
                    providerType={ProviderType.vsphere}
                    treeType={TreeType.networks}
                  />
                ) : null}
              </Tab>
              <Tab eventKey="hostTreeFlat" title={<TabTitleText>Filter VMs</TabTitleText>}>
                {hostsByProvider ? <HostTreeFlatTable providers={hostsByProvider} /> : null}
              </Tab>
            </Tabs>
          </Tab>
          <Tab eventKey="openshift" title={<TabTitleText>OpenShift</TabTitleText>}>
            <Tabs activeKey={treeType} isSecondary onSelect={(_event, tabKey) => handleTabClickSecond(_event, tabKey)}>
              <Tab eventKey="namespaces" title={<TabTitleText>Namespaces</TabTitleText>}>
                {namespacesByProvider ? (
                  <ProviderTree
                    providers={namespacesByProvider}
                    providerType={ProviderType.openshift}
                    treeType={TreeType.namespaces}
                  />
                ) : null}
              </Tab>
              <Tab eventKey="vmcs" title={<TabTitleText>Virtual Machines</TabTitleText>}>
                {vmcsByProvider ? (
                  <ProviderTree
                    providers={vmcsByProvider}
                    providerType={ProviderType.openshift}
                    treeType={TreeType.vmcs}
                  />
                ) : null}
              </Tab>
            </Tabs>
          </Tab>
        </Tabs>
      </div>
    </PageSection>
  );
};

export default Explorer;
