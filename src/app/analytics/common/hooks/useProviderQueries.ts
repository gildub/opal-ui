import { useQuery } from 'react-query';
import { request } from 'graphql-request';

import {
  queryHostsByProvider,
  queryNetworksByProvider,
  queryStorageByProvider,
  queryVMsByProvider,
} from '@app/analytics/Explorer/queries';

export const useHostsByProvider = () => {
  const { data, _ } = useQuery('hostsByProvider', async () => {
    const providers = await request('http://localhost:9002/graphql', queryHostsByProvider, {});
    return providers;
  });

  return data && data.providers ? data.providers : undefined;
};

export const useNetworksByProvider = () => {
  const { data, _ } = useQuery('networksByProvider', async () => {
    const providers = await request('http://localhost:9002/graphql', queryNetworksByProvider, {});
    return providers;
  });

  return data && data.providers ? data.providers : undefined;
};

export const useStorageByProvider = () => {
  const { data, _ } = useQuery('storageByProvider', async () => {
    const providers = await request('http://localhost:9002/graphql', queryStorageByProvider, {});
    return providers;
  });

  return data && data.providers ? data.providers : undefined;
};

export const useVMsByProvider = () => {
  const { data, _ } = useQuery('vmsByProvider', async () => {
    const providers = await request('http://localhost:9002/graphql', queryVMsByProvider, {});
    return providers;
  });

  return data && data.providers ? data.providers : undefined;
};
