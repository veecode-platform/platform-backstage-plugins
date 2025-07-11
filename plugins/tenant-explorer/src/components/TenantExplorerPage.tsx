import { useOutlet } from 'react-router-dom';
import {
  DefaultTenantExplorerPage,
  DefaultTenantExplorerPageProps,
} from './DefaultTenantExplorerPage';

/**
 * TenantExplorerPage
 * @public
 */
export const TenantExplorerPage = (props: DefaultTenantExplorerPageProps) => {
  const outlet = useOutlet();

  return outlet || <DefaultTenantExplorerPage {...props} />;
};
