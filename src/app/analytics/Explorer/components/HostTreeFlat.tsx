import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';

import HostTreeFlatTable from './HostTreeFlatTable';
import { useHostsByProvider } from '@app/analytics/common/hooks/useProviderQueries';

const HostTreeFlat: React.FunctionComponent = () => {
  const hostsByProvider = useHostsByProvider();

  return (
    <>
      <PageSection>
        <Title headingLevel="h1" size="lg">
          Filter Virtual Machines (by Host and Cluster view)
        </Title>
      </PageSection>
      <PageSection>{hostsByProvider ? <HostTreeFlatTable providers={hostsByProvider} /> : null}</PageSection>
    </>
  );
};

export default HostTreeFlat;
