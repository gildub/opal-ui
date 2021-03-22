import * as React from 'react';
import { Card, CardBody, CardTitle } from '@patternfly/react-core';

interface IDatacenterCardProps {
  datacenter: any;
}

const DatacenterCard: React.FunctionComponent<IDatacenterCardProps> = ({ datacenter }: IDatacenterCardProps) => {
  return (
    <Card>
      <CardTitle>
        Datacenter {datacenter.name} ({datacenter.id.split('.')[0]})
      </CardTitle>
      <CardBody>Provider: {datacenter.id.split('.')[1]}</CardBody>
    </Card>
  );
};

export default DatacenterCard;
