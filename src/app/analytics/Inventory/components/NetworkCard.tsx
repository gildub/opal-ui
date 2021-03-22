import * as React from 'react';
import { Card, CardBody, CardTitle } from '@patternfly/react-core';

interface INetworkCardProps {
  network: any;
}

const NetworkCard: React.FunctionComponent<INetworkCardProps> = ({ network }: INetworkCardProps) => {
  return (
    <Card>
      <CardTitle>
        Network {network.name} ({network.id.split('.')[0]})
      </CardTitle>
      <CardBody>Provider: {network.id.split('.')[1]}</CardBody>
    </Card>
  );
};

export default NetworkCard;
