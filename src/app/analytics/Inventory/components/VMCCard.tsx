import * as React from 'react';
import { Card, CardBody, CardTitle } from '@patternfly/react-core';
interface IVMCCardProps {
  vmc: any;
}

const VMCCard: React.FunctionComponent<IVMCCardProps> = ({ vmc }: IVMCCardProps) => {
  return (
    <Card>
      <CardTitle>
        Virtual Machine Openshift
        <CardBody>
          Name: {vmc.name} - Id: {vmc.id.split('.')[0]}
        </CardBody>
      </CardTitle>
      <CardBody>Namespace: {vmc.namespace}</CardBody>
      <CardBody>Provider: {vmc.id.split('.')[1]}</CardBody>
    </Card>
  );
};

export default VMCCard;
