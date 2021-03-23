import * as React from 'react';
import { Card, CardBody, CardTitle } from '@patternfly/react-core';

interface INamespaceCardProps {
  namespace: any;
}

const NamespaceCard: React.FunctionComponent<INamespaceCardProps> = ({ namespace }: INamespaceCardProps) => {
  return (
    <Card>
      <CardTitle>
        Namespace {namespace.name} ({namespace.id.split('.')[0]})
      </CardTitle>
      <CardBody>Provider: {namespace.id.split('.')[1]}</CardBody>
    </Card>
  );
};

export default NamespaceCard;
