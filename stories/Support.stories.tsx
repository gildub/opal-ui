import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import InventoryProviderTable from '@app/analytics/Filter/components/ProviderTable';

const stories = storiesOf('Components', module);
stories.addDecorator(withInfo);
stories.add('Support', () => <InventoryProviderTable providers={} />, { info: { inline: true } });
