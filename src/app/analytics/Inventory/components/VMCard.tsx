import * as React from 'react';
import { Button, Card, CardBody, CardTitle, List, ListItem, Text } from '@patternfly/react-core';
import { useHistory } from 'react-router-dom';
import ProviderIcon from '@patternfly/react-icons/dist/js/icons/cloud-tenant-icon';
import HostIcon from '@patternfly/react-icons/dist/js/icons/container-node-icon';
import PowerOnIcon from '@patternfly/react-icons/dist/js/icons/on-running-icon';
import PowerOffIcon from '@patternfly/react-icons/dist/js/icons/power-off-icon';
import MemoryIcon from '@patternfly/react-icons/dist/js/icons/memory-icon';
import CPUIcon from '@patternfly/react-icons/dist/js/icons/cpu-icon';
import IPIcon from '@patternfly/react-icons/dist/js/icons/pficon-network-range-icon';
import DiskIcon from '@patternfly/react-icons/dist/js/icons/storage-domain-icon';
import NetworkIcon from '@patternfly/react-icons/dist/js/icons/network-icon';
import useExplorerRouteMatch from '@app/analytics/Explorer/hooks/useExplorerRouteMatch';

interface IVMCardProps {
  vm: any;
}

const VMCard: React.FunctionComponent<IVMCardProps> = ({ vm }: IVMCardProps) => {
  const history = useHistory();

  const { providerType } = useExplorerRouteMatch();

  const onClickNetwork = (network: string) => {
    const [networkId, provider] = network.split('.');
    history.push(`/analytics/explorer/${providerType}/networks/${provider}/${networkId}`);
  };

  const onClickDatastore = (diskName: string) => {
    const [datastoreId, provider] = diskName.split('.');
    history.push(`/analytics/explorer/${providerType}/storage/${provider}/${datastoreId}`);
  };

  return (
    <Card>
      <CardTitle>
        Virtual Machine
        <CardBody>
          Name: {vm.name} - Id: {vm.id.split('.')[0]}
        </CardBody>
      </CardTitle>
      <CardBody>
        <ProviderIcon /> Provider: {vm.id.split('.')[1]}
      </CardBody>
      {vm.host ? (
        <CardBody>
          <HostIcon /> Host
          <List>
            <ListItem key={vm.host.id}>Name: {vm.host.id.split('.')[0]}</ListItem>
            <ListItem key={vm.host.inMaintenance}>
              Status: {vm.host.inMaintenance ? 'In Maintenance' : 'Ready'}
            </ListItem>
          </List>
        </CardBody>
      ) : null}
      <CardBody>
        {vm.powerState === 'poweredOn' ? <PowerOnIcon /> : <PowerOffIcon />} Power State:{' '}
        {vm.powerState === 'poweredOn' ? 'On' : 'Off'}
      </CardBody>
      <CardBody>
        <MemoryIcon /> Memory: {vm.memoryMB} MB
      </CardBody>
      <CardBody>
        <IPIcon /> IP Address: {vm.ipAddress ? vm.ipAddress : 'none'}
      </CardBody>
      <CardBody>
        <CPUIcon /> {vm.cpuHotAddEnabled ? 'CPU Hot Add Enabled' : 'CPU Hot Add Disabled'}
      </CardBody>
      <CardBody>Firmware: {vm.firmware}</CardBody>
      <CardBody>
        Concerns:{' '}
        {vm.concerns && vm.concerns.length > 0 ? (
          <List>
            {vm.concerns.map((concern) => (
              <ListItem key={vm.id.label}>
                {concern.category} - {concern.label}
                <Text>{concern.assessment}</Text>
              </ListItem>
            ))}
          </List>
        ) : (
          'none'
        )}
      </CardBody>
      <CardBody>
        <DiskIcon /> Disks
        {vm.disks && vm.disks.length > 0 ? (
          <List>
            {vm.disks.map((disk) => (
              <ListItem key={`${vm.id}.${disk.name}`}>
                <Button variant="link" onClick={() => onClickDatastore(`${disk.datastore.id}.${vm.id.split('.')[1]}`)}>
                  {disk.name}
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          ' N/A'
        )}
      </CardBody>
      <CardBody>
        <NetworkIcon /> Networks
        {vm.networks && vm.networks.length > 0 ? (
          <List>
            {vm.networks.map((network) => (
              <ListItem key={`${vm.id}.${network.name}.${Math.random()}`}>
                <Button variant="link" onClick={() => onClickNetwork(network.name)}>
                  {network.name.split('.')[0]}
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          ' N/A'
        )}
      </CardBody>
    </Card>
  );
};

export default VMCard;
