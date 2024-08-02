import React from 'react';
import { useOutlet } from 'react-router-dom';
import {
  DefaultClusterExplorerPage,
  DefaultClusterExplorerPageProps,
} from './DefaultClusterExplorerPage';

/**
 * ClusterExplorerPage
 * @public
 */
export const ClusterExplorerPage = (props: DefaultClusterExplorerPageProps) => {
  const outlet = useOutlet();

  return outlet || <DefaultClusterExplorerPage {...props} />;
};