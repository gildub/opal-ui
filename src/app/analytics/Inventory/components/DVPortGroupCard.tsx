import * as React from 'react';
import { Card, CardBody, CardTitle } from '@patternfly/react-core';

interface IDVPortGroupCardProps {
  dvportgroup: any;
}

const DVPortGroupCard: React.FunctionComponent<IDVPortGroupCardProps> = ({ dvportgroup }: IDVPortGroupCardProps) => {
  return (
    <Card>
      <CardTitle>
        DVPortGroup {dvportgroup.name} ({dvportgroup.id.split('.')[0]})
      </CardTitle>
      <CardBody>Provider: {dvportgroup.id.split('.')[1]}</CardBody>
    </Card>
  );
};

export default DVPortGroupCard;
