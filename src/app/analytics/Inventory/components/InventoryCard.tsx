import * as React from 'react';

import VCenterCard from './VCenterCard';
import DatacenterCard from './DatacenterCard';
import DatastoreCard from './DatastoreCard';
import ClusterCard from './ClusterCard';
import HostCard from './HostCard';
import NetworkCard from './NetworkCard';
import DVPortGroupCard from './DVPortGroupCard';
import DVSwitchCard from './DVSwitchCard';
import VMCard from './VMCard';
import VMCCard from './VMCCard';
import FolderCard from './FolderCard';
import NamespaceCard from './NamespaceCard';

interface IInventoryCardProps {
  item: any;
}

const InventoryCard: React.FunctionComponent<IInventoryCardProps> = ({ item }: IInventoryCardProps) => {
  return (
    <>
      {item.kind === 'Provider' ? (
        <VCenterCard vcenter={item}></VCenterCard>
      ) : item.kind === 'Datacenter' ? (
        <DatacenterCard datacenter={item}></DatacenterCard>
      ) : item.kind === 'Cluster' ? (
        <ClusterCard cluster={item}></ClusterCard>
      ) : item.kind === 'Datastore' ? (
        <DatastoreCard datastore={item}></DatastoreCard>
      ) : item.kind === 'Host' ? (
        <HostCard host={item}></HostCard>
      ) : item.kind === 'Network' ? (
        <NetworkCard network={item}></NetworkCard>
      ) : item.kind === 'DVSwitch' ? (
        <DVSwitchCard dvswitch={item}></DVSwitchCard>
      ) : item.kind === 'DVPortGroup' ? (
        <DVPortGroupCard dvportgroup={item}></DVPortGroupCard>
      ) : item.kind === 'VM' ? (
        <VMCard vm={item}></VMCard>
      ) : item.kind === 'Folder' ? (
        <FolderCard folder={item}></FolderCard>
      ) : item.kind === 'Openshift' ? (
        <VCenterCard vcenter={item}></VCenterCard>
      ) : item.kind === 'Namespace' ? (
        <NamespaceCard namespace={item}></NamespaceCard>
      ) : item.kind === 'VMC' ? (
        <VMCCard vm={item}></VMCCard>
      ) : null}
    </>
  );
};

export default InventoryCard;
