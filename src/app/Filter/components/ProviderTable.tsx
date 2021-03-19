import * as React from 'react';
import { Table, TableHeader, TableBody, sortable, ICell, IRow, wrappable } from '@patternfly/react-table';

import { FilterToolbar, FilterType, FilterCategory } from '@app/common/components/FilterToolbar';
import { Flex, FlexItem, Level, LevelItem, TreeViewDataItem } from '@patternfly/react-core';
import { useFilterState } from '@app/common/hooks/useFilterState';

interface IProviderTableProps {
  providers: any;
}

const getVMsFromTreeQuery = (providers: any[]): any[] =>
  providers.flatMap((provider) =>
    provider.children.flatMap((datacenter) =>
      datacenter.children.flatMap((cluster) =>
        cluster.children.flatMap((host) =>
          host.children.flatMap((vm) => {
            return {
              ...vm,
              id: vm.id.split('.')[0],
              provider: provider.name,
              datacenter: datacenter.name,
              cluster: cluster.name,
              host: host.name,
            };
          })
        )
      )
    )
  );

// TODO: Use forklift-ui function
const getMostSevereVMConcern = (concerns: any): any | null => {
  if (!concerns || concerns.length === 0) {
    return null;
  }
  const critical = concerns.find((concern) => concern.category === 'Critical');
  const warning = concerns.find((concern) => concern.category === 'Warning');
  const advisory = concerns.find((concern) => concern.category === 'Information' || concern.category === 'Advisory');
  if (critical) return critical;
  if (warning) return warning;
  if (advisory) return advisory;
  // Default to warning if an unexpected severity is found
  return { category: 'Warning', label: 'Unknown', assessment: '' };
};

const hasVMConcernCategory = (concerns: any, category: string): any | undefined =>
  concerns.find((concern) => concern.category === category);

const ProviderTable: React.FunctionComponent<IProviderTableProps> = ({ providers }: IProviderTableProps) => {
  const vms = getVMsFromTreeQuery(providers);
  // console.log(vms);
  const filterCategories: FilterCategory<any>[] = [
    {
      key: 'id',
      title: 'Id',
      type: FilterType.search,
      placeholderText: 'Filter by Id...',
      getItemValue: (item) => {
        return item.id;
      },
    },
    {
      key: 'name',
      title: 'Name',
      type: FilterType.search,
      placeholderText: 'Filter by name...',
      getItemValue: (item) => {
        return item.name;
      },
    },
    {
      key: 'provider',
      title: 'Provider',
      type: FilterType.search,
      placeholderText: 'Filter by provider...',
      getItemValue: (item) => {
        return item.provider;
      },
    },
    {
      key: 'datacenter',
      title: 'Datacenter',
      type: FilterType.search,
      placeholderText: 'Filter by datacenter...',
      getItemValue: (item) => {
        return item.datacenter;
      },
    },
    {
      key: 'cluster',
      title: 'Cluster',
      type: FilterType.search,
      placeholderText: 'Filter by cluster...',
      getItemValue: (item) => {
        return item.cluster;
      },
    },
    {
      key: 'host',
      title: 'Host',
      type: FilterType.search,
      placeholderText: 'Filter by host...',
      getItemValue: (item) => {
        return item.host;
      },
    },
    {
      key: 'concern',
      title: 'Concern',
      type: FilterType.select,
      selectOptions: [
        { key: 'Warning', value: 'Warning' },
        { key: 'Critical', value: 'Critical' },
        { key: 'Advisory', value: 'Advisory' },
      ],
      getItemValue: (item) => {
        if (item.concerns) {
          if (hasVMConcernCategory(item.concerns, 'Critical')) return 'Critical';
          if (hasVMConcernCategory(item.concerns, 'Warning')) return 'Warning';
          if (hasVMConcernCategory(item.concerns, 'Advisory')) return 'Advisory';
        }
        return '';
      },
    },
    {
      key: 'powerstate',
      title: 'powerState',
      type: FilterType.select,
      selectOptions: [
        { key: 'On', value: 'On' },
        { key: 'Off', value: 'Off' },
      ],
      getItemValue: (item) => {
        return item.powerState.match(/on/i) ? 'On' : 'Off';
      },
    },
    {
      key: 'memory',
      title: 'Memory',
      type: FilterType.search,
      placeholderText: 'Filter by RAM...',
      getItemValue: (item) => {
        return item.memoryMB;
      },
    },
  ];

  const columns: ICell[] = [
    { title: 'Id', transforms: [sortable, wrappable] },
    { title: 'Name', transforms: [sortable, wrappable] },
    { title: 'Provider', transforms: [sortable, wrappable] },
    { title: 'Datacenter', transforms: [sortable, wrappable] },
    { title: 'Cluster', transforms: [sortable, wrappable] },
    { title: 'Host', transforms: [sortable, wrappable] },
    { title: 'Concerns', transforms: [sortable, wrappable] },
    { title: 'Power State', transforms: [sortable, wrappable] },
    { title: 'Memory', transforms: [sortable, wrappable] },
  ];

  const { filterValues, setFilterValues, filteredItems } = useFilterState(vms, filterCategories);

  const rows: IRow[] = [];

  if (filteredItems) {
    filteredItems.forEach((vm) => {
      const concern = getMostSevereVMConcern(vm.concerns).category;

      rows.push({
        meta: { vm },
        cells: [
          vm.id,
          vm.name,
          vm.provider,
          vm.datacenter,
          vm.cluster,
          vm.host,
          concern ? concern : 'Ok',
          vm.powerState,
          vm.memoryMB,
        ],
      });
    });
  }

  return (
    <>
      <Level>
        <LevelItem>
          <Flex>
            <FlexItem alignSelf={{ default: 'alignSelfFlexStart' }} spacer={{ default: 'spacerNone' }}>
              <FilterToolbar<TreeViewDataItem>
                filterCategories={filterCategories}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
              />
            </FlexItem>
          </Flex>
        </LevelItem>
      </Level>
      <Table aria-label="Providers table" cells={columns} rows={rows}>
        <TableHeader />
        <TableBody />
      </Table>
    </>
  );
};

export default ProviderTable;
