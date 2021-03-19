import * as React from 'react';
import { useQuery } from 'react-query';
import { PageSection, Title } from '@patternfly/react-core';
import { request } from 'graphql-request';
import ProviderTable from './ProviderTable';

const query = `
  query listProviders {
    providers {
      id
      name
      product
      datacenters { name id }
    }
  }
`;

const ProviderTableView: React.FunctionComponent = () => {
  const { data, _ } = useQuery('providers', async () => {
    const providers = await request('http://localhost:9002/graphql', query, {});
    return providers;
  });

  return (
    <>
      <PageSection>
        <Title headingLevel="h1" size="lg">
          Inventory Provider Table View
        </Title>
      </PageSection>
      <PageSection>{data && data.providers ? <ProviderTable providers={data.providers} /> : null}</PageSection>
    </>
  );
};

export default ProviderTableView;
