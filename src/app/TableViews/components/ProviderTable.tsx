import * as React from 'react';
import { Table, TableHeader, TableBody, sortable, ICell, IRow, wrappable } from '@patternfly/react-table';

interface IProviderTableProps {
  providers: any;
}

const ProviderTable: React.FunctionComponent<IProviderTableProps> = ({ providers }: IProviderTableProps) => {
  const columns: ICell[] = [
    { title: 'ID', transforms: [sortable, wrappable] },
    { title: 'Name', transforms: [sortable, wrappable] },
    { title: 'Datacenters', transforms: [sortable, wrappable] },
  ];

  const rows: IRow[] = [];

  if (providers) {
    providers.forEach((provider) => {
      const datacenters = provider.datacenters.map((datacenter) => datacenter.name).join(', ');
      rows.push({
        meta: { provider },
        cells: [provider.id, provider.name, datacenters],
      });
    });
  }

  return (
    <Table aria-label="Providers table" cells={columns} rows={rows}>
      <TableHeader />
      <TableBody />
    </Table>
  );
};

export default ProviderTable;
