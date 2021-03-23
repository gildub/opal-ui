import * as React from 'react';
import { Card, CardBody, CardTitle } from '@patternfly/react-core';

interface INamespaceCardProps {
  namespace: any;
}

const NamespaceCard: React.FunctionComponent<INamespaceCardProps> = ({ namespace }: INamespaceCardProps) => {
  return (
    <Card>
      <CardTitle>Namespace</CardTitle>
      <CardBody>Name: {namespace.name}</CardBody>
      <CardBody>Provider: {namespace.id.split('.')[1]}</CardBody>
    </Card>
  );
};

export default NamespaceCard;
