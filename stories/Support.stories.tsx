import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import InventoryProviderTable from '@app/Inventory/ProviderTableView';

const stories = storiesOf('Components', module);
stories.addDecorator(withInfo);
stories.add('Support', () => <InventoryProviderTable />, { info: { inline: true } });
