import { Card, CardBody, CardTitle } from '@patternfly/react-core';
import * as React from 'react';

interface IDatastoreCardProps {
  datastore: any;
}

const DatastoreCard: React.FunctionComponent<IDatastoreCardProps> = ({ datastore }: IDatastoreCardProps) => {
  return (
    <Card>
      <CardTitle>
        Datastore {datastore.name} ({datastore.id.split('.')[0]})
      </CardTitle>
      <CardBody>Provider: {datastore.id.split('.')[1]}</CardBody>
    </Card>
  );
};

export default DatastoreCard;
