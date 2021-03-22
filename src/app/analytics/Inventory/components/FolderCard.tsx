import * as React from 'react';
import { Card, CardBody, CardTitle } from '@patternfly/react-core';

interface IFolderCardProps {
  folder: any;
}

const FolderCard: React.FunctionComponent<IFolderCardProps> = ({ folder }: IFolderCardProps) => {
  return (
    <Card>
      <CardTitle>
        Folder {folder.name} ({folder.id.split('.')[0]})
      </CardTitle>
      <CardBody>Provider: {folder.id.split('.')[1]}</CardBody>
    </Card>
  );
};

export default FolderCard;
