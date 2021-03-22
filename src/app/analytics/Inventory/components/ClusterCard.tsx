import * as React from 'react';
import { Card, CardBody, CardTitle } from '@patternfly/react-core';

interface IClusterCardProps {
  cluster: any;
}

const ClusterCard: React.FunctionComponent<IClusterCardProps> = ({ cluster }: IClusterCardProps) => {
  return (
    <Card>
      <CardTitle>
        Cluster {cluster.name} ({cluster.id.split('.')[0]})
      </CardTitle>
      <CardBody>Provider: {cluster.id.split('.')[1]}</CardBody>
    </Card>
  );
};

export default ClusterCard;
