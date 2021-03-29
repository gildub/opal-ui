export const queryHostsByProvider = `
  query HostsByProvider {
    providers {
      id
      name
      product
      kind
      children: datacenters {
        name
        id
        kind
        children: clusters {
          id
          name
          kind
          children: hosts {
            id name kind
            children: vms {
              id name kind
              powerState
              memoryMB
              cpuHotAddEnabled
              firmware
              host { id inMaintenance }
              concerns { label category assessment }
              disks {
                kind name: file shared
                datastore { id }
                }
              networks {
                ... on Network { kind name: id }
                ... on DVPortGroup { kind name: id }
                ... on DVSwitch { kind name: id }
              }
            }
          }
        }
      }
    }
  }
`;

export const queryVMsByProvider = `
  query VMsByProvider {
    providers {
      id
      name
      product
      kind
      children: datacenters {
        id
        name
        kind
        children: vms {
          ...FolderFields
          ...VMFields
          ...ChildrenRecursive
        }
      }
    }
  }

  fragment VMFields on VM {
    id name kind
    powerState
    memoryMB
    cpuHotAddEnabled
    firmware
    host { id inMaintenance }
    concerns { label category assessment }
    disks {
      kind name: file shared
      datastore { id }
      }
    networks {
      ... on Network { kind name: id }
      ... on DVPortGroup { kind name: id }
      ... on DVSwitch { kind name: id }
    }
  }

  fragment FolderFields on Folder {
    id
    name
    kind
    children {
      ...VMFields
    }
  }

  fragment ChildrenRecursive on Folder {
    children {
      ...FolderFields
      ... on Folder {
        ...FolderFields
        children {
          ...FolderFields
          ... on Folder {
            ...FolderFields
            children {
              ...FolderFields
              ... on Folder {
                ...FolderFields
              }
            }
          }
        }
      }
    }
  }
`;

export const queryStorageByProvider = `
  query StorageByProvider {
    providers {
    id
    name
    product
    kind
    children: datacenters {
      name
      id
      kind
      children: datastores {
          id name kind type capacity free maintenance
          hosts { id name}
          vms {id name}
        }
      }
    }
  }
`;

export const queryNetworksByProvider = `
  query NetworksByProvider {
    providers {
    id
    name
    product
    kind
    children: datacenters {
      name
      id
      kind
      children: networks {
        ... on Network { id name kind }
        ... on DVPortGroup { id name kind }
        ... on DVSwitch { id name kind }
        }
      }
    }
  }
`;

export const queryNamespacesByProvider = `
  query NamespacesByProvider {
    openshift {
      id
      kind
      name
      children: namespaces {
        id
        name
        kind
      }
    }
  }
`;

export const queryVMCsByProvider = `
  query VMCsByProvider {
    openshift {
      id
      kind
      name
      children: vmcs {
        id kind name namespace
      }
    }
  }
`;
