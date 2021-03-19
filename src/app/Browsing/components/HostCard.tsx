import { Card, CardBody, CardTitle } from '@patternfly/react-core';
import * as React from 'react';

interface IHostCardProps {
  host: any;
}

const HostCard: React.FunctionComponent<IHostCardProps> = ({ host }: IHostCardProps) => {
  return (
    <Card>
      <CardTitle>
        Host {host.name} ({host.id.split('.')[0]})
      </CardTitle>
      <CardBody>Provider: {host.id.split('.')[1]}</CardBody>
    </Card>
  );
};

export default HostCard;
