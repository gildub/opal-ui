import * as React from 'react';
import { Table, TableHeader, TableBody, sortable, ICell, IRow, wrappable, cellWidth } from '@patternfly/react-table';

import { FilterToolbar, FilterType, FilterCategory } from '@app/analytics/common/components/FilterToolbar';
import { Button, Flex, FlexItem, Level, LevelItem, TreeViewDataItem } from '@patternfly/react-core';
import { useFilterState } from '@app/analytics/common/hooks/useFilterState';
import useExplorerRouteMatch from '../hooks/useExplorerRouteMatch';
import { ProviderType, TreeType } from './Explorer';

interface IHostTreeFlatTableProps {
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
              id: vm.id,
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
const getMostSevereVMConcern = (concerns: any): any | '' => {
  if (concerns.length === 0) {
    return '';
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

const getConcernsByCategory = (concerns: any, category: string) =>
  concerns.filter((concern) => concern.category === category);

const hasVMConcernCategory = (concerns: any, category: string) =>
  concerns.find((concern) => concern.category === category);

const HostTreeFlatTable: React.FunctionComponent<IHostTreeFlatTableProps> = ({
  providers,
}: IHostTreeFlatTableProps) => {
  const vms = getVMsFromTreeQuery(providers);
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
        { key: 'Critical', value: 'Critical' },
        { key: 'Warning', value: 'Warning' },
        { key: 'Information', value: 'Information' },
      ],
      getItemValue: (item) => {
        if (item.concerns) {
          if (hasVMConcernCategory(item.concerns, 'Critical')) return 'Critical';
          if (hasVMConcernCategory(item.concerns, 'Warning')) return 'Warning';
          if (hasVMConcernCategory(item.concerns, 'Information')) return 'Information';
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
    { title: 'Provider / Datacenter/ Cluster / Host', transforms: [sortable, cellWidth(30), wrappable] },
    { title: 'Concerns', transforms: [sortable, wrappable] },
    { title: 'Power State', transforms: [sortable, wrappable] },
    { title: 'Memory', transforms: [sortable, wrappable] },
  ];

  const { filterValues, setFilterValues, filteredItems } = useFilterState(vms, filterCategories);
  const { goToItem } = useExplorerRouteMatch();

  const rows: IRow[] = [];

  if (filteredItems) {
    filteredItems.forEach((vm) => {
      const highestConcern = getMostSevereVMConcern(vm.concerns).category;
      const criticalConcerns = getConcernsByCategory(vm.concerns, 'Critical');
      const warningConcerns = getConcernsByCategory(vm.concerns, 'Warning');
      const informationConcerns = getConcernsByCategory(vm.concerns, 'Information');

      rows.push({
        meta: { vm },
        cells: [
          <div key={vm.id}>
            <Button variant="link" isInline onClick={(_event) => goToItem(ProviderType.vsphere, TreeType.hosts, vm.id)}>
              {vm.id.split('.')[0]}
            </Button>
          </div>,
          vm.name,
          `${vm.provider}/${vm.datacenter}/${vm.cluster}/${vm.host}`,
          highestConcern ? (
            <>
              {criticalConcerns.length ? `${criticalConcerns.length} x Critical` : null}
              {criticalConcerns.length && warningConcerns.length ? ' - ' : null}
              {warningConcerns.length ? `${warningConcerns.length} x Warning` : null}
              {warningConcerns.length && informationConcerns.length ? ' - ' : null}
              {informationConcerns.length ? `${informationConcerns.length} x Information` : null}
            </>
          ) : (
            'No concerns'
          ),
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
      <Table aria-label="Providers table" variant="compact" cells={columns} rows={rows}>
        <TableHeader />
        <TableBody />
      </Table>
    </>
  );
};

export default HostTreeFlatTable;
