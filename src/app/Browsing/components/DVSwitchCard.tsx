import { Card, CardBody, CardTitle } from '@patternfly/react-core';
import * as React from 'react';

interface IDVSwitchCardProps {
  dvswitch: any;
}

const DVSwitchCard: React.FunctionComponent<IDVSwitchCardProps> = ({ dvswitch }: IDVSwitchCardProps) => {
  return (
    <Card>
      <CardTitle>
        DVSwitch {dvswitch.name} ({dvswitch.id.split('.')[0]})
      </CardTitle>
      <CardBody>Provider: {dvswitch.id.split('.')[1]}</CardBody>
    </Card>
  );
};

export default DVSwitchCard;
