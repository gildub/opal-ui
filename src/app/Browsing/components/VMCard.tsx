import * as React from 'react';
import { Button, Card, CardBody, CardTitle, List, ListItem } from '@patternfly/react-core';
import { useHistory } from 'react-router-dom';
import PowerOnIcon from '@patternfly/react-icons/dist/js/icons/on-running-icon';
import PowerOffIcon from '@patternfly/react-icons/dist/js/icons/power-off-icon';
import MemoryIcon from '@patternfly/react-icons/dist/js/icons/memory-icon';
import CPUIcon from '@patternfly/react-icons/dist/js/icons/cpu-icon';
import IPIcon from '@patternfly/react-icons/dist/js/icons/pficon-network-range-icon';
import DiskIcon from '@patternfly/react-icons/dist/js/icons/storage-domain-icon';
import NetworkIcon from '@patternfly/react-icons/dist/js/icons/network-icon';

interface IVMCardProps {
  vm: any;
}

const VMCard: React.FunctionComponent<IVMCardProps> = ({ vm }: IVMCardProps) => {
  const history = useHistory();

  const onClickNetwork = (network: string) => {
    const [networkId, provider] = network.split('.');
    history.push(`/inventory/browsers/networks/${provider}/${networkId}`);
  };

  const onClickDatastore = (diskName: string) => {
    const [datastoreId, provider] = diskName.split('.');
    history.push(`/inventory/browsers/storage/${provider}/${datastoreId}`);
  };

  return (
    <Card>
      <CardTitle>
        Virtual Machine {vm.name} ({vm.id.split('.')[0]})
      </CardTitle>
      <CardBody>Provider: {vm.id.split('.')[1]}</CardBody>
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
      {vm.host ? (
        <CardBody>
          Host: {vm.host.id}, Status: {vm.host.inMaintenance ? 'In Maintenance' : 'Ready'}
        </CardBody>
      ) : null}
      <CardBody>Concerns: {vm.concerns && vm.concerns.length > 0 ? vm.concerns : 'none'}</CardBody>
      <CardBody>
        <DiskIcon /> Disks
        {vm.disks && vm.disks.length > 0 ? (
          <List>
            {vm.disks.map((disk) => (
              <ListItem key={disk.name}>
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
              <ListItem key={network.name}>
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
