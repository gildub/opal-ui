import * as React from 'react';
import { Card, CardBody, CardTitle } from '@patternfly/react-core';

interface IOpenshiftCardProps {
  openshift: any;
}

const OpenshiftCard: React.FunctionComponent<IOpenshiftCardProps> = ({ openshift }: IOpenshiftCardProps) => {
  return (
    <Card>
      <CardTitle>Openshift</CardTitle>
      <CardBody>Name: {openshift.name}</CardBody>
      <CardBody>Id: {openshift.id}</CardBody>
    </Card>
  );
};

export default OpenshiftCard;
