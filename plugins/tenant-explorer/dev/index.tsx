import { createDevApp } from '@backstage/dev-utils';
import { TenantExplorerPlugin, TenantOverviewPage } from '../src/plugin';

createDevApp()
  .registerPlugin(TenantExplorerPlugin)
  .addPage({
    element: <TenantOverviewPage />,
    title: 'Root Page',
    path: '/tenant-overview',
  })
  .render();
