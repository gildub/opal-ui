import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';

import ProviderTable from './ProviderTable';
import { useHostsByProvider } from '@app/common/hooks/useProviderQueries';

const ProviderFilter: React.FunctionComponent = () => {
  const hostsByProvider = useHostsByProvider();

  return (
    <>
      <PageSection>
        <Title headingLevel="h1" size="lg">
          Filter Virtual Machines (by Host and Cluster view)
        </Title>
      </PageSection>
      <PageSection>{hostsByProvider ? <ProviderTable providers={hostsByProvider} /> : null}</PageSection>
    </>
  );
};

export default ProviderFilter;
