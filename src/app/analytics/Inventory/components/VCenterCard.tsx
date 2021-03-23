import * as React from 'react';
import { Card, CardBody, CardTitle } from '@patternfly/react-core';

interface IVCenterCardProps {
  vcenter: any;
}

const VCenterCard: React.FunctionComponent<IVCenterCardProps> = ({ vcenter }: IVCenterCardProps) => {
  return (
    <Card>
      <CardTitle>VCenter</CardTitle>
      <CardBody>Name: {vcenter.name}</CardBody>
      <CardBody>Id: {vcenter.id}</CardBody>
      <CardBody>Product: {vcenter.product}</CardBody>
    </Card>
  );
};

export default VCenterCard;
