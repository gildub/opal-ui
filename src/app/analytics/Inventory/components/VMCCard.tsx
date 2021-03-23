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
import useExplorerRouteMatch from '@app/analytics/Explorer/hooks/useExplorerRouteMatch';

interface IVMCCardProps {
  vm: any;
}

const VMCCard: React.FunctionComponent<IVMCCardProps> = ({ vm }: IVMCCardProps) => {
  const history = useHistory();

  const { providerType } = useExplorerRouteMatch();

  return (
    <Card>
      <CardTitle>
        Virtual Machine {vm.name} ({vm.id.split('.')[0]})
      </CardTitle>
      <CardBody>Provider: {vm.id.split('.')[1]}</CardBody>
    </Card>
  );
};

export default VMCCard;
