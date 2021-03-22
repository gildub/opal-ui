import * as React from 'react';
import { PageSection, Tab, Tabs, TabTitleText, Title } from '@patternfly/react-core';

import useBrowserRouteMatch from '../hooks/useBrowserRouteMatch';
import { useHistory } from 'react-router';
import ProviderTree from './ProviderTree';
import {
  useHostsByProvider,
  useNetworksByProvider,
  useStorageByProvider,
  useVMsByProvider,
} from '@app/analytics/common/hooks/useProviderQueries';

export enum BrowserType {
  hosts = 'hosts',
  networks = 'networks',
  storage = 'storage',
  vms = 'vms',
}

const Explorer: React.FunctionComponent = () => {
  const history = useHistory();
  const { browserType } = useBrowserRouteMatch();

  const handleTabClick = (_event, tabKey) => {
    history.push(`/analytics/explorer/${tabKey}`);
  };

  const hostsByProvider = useHostsByProvider();
  const networksByProvider = useNetworksByProvider();
  const storageByProvider = useStorageByProvider();
  const vmsByProvider = useVMsByProvider();

  return (
    <PageSection>
      <Title headingLevel="h2" size="lg">
        Inventory Browsers
      </Title>
      <div>
        <Tabs activeKey={browserType} onSelect={handleTabClick} isBox={false}>
          <Tab eventKey="hosts" title={<TabTitleText>Hosts and Clusters</TabTitleText>}>
            {hostsByProvider ? <ProviderTree providers={hostsByProvider} browserType={BrowserType.hosts} /> : null}
          </Tab>
          <Tab eventKey="vms" title={<TabTitleText>VM and Templates</TabTitleText>}>
            {vmsByProvider ? <ProviderTree providers={vmsByProvider} browserType={BrowserType.vms} /> : null}
          </Tab>
          <Tab eventKey="storage" title={<TabTitleText>Storage</TabTitleText>}>
            {storageByProvider ? (
              <ProviderTree providers={storageByProvider} browserType={BrowserType.storage} />
            ) : null}
          </Tab>
          <Tab eventKey="networks" title={<TabTitleText>Networking</TabTitleText>}>
            {networksByProvider ? (
              <ProviderTree providers={networksByProvider} browserType={BrowserType.networks} />
            ) : null}
          </Tab>
        </Tabs>
      </div>
    </PageSection>
  );
};

export default Explorer;
