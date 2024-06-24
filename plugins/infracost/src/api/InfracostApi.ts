import { createApiRef } from '@backstage/core-plugin-api';
import { InfracostEstimate } from '@veecode-platform/backstage-plugin-infracost-common';

export const infracostApiRef = createApiRef<InfracostApi>({
  id: 'plugin.infracost.service',
});

export interface InfracostApi {
  getEstimates(): Promise<InfracostEstimate[] | null>;
  getEstimateByName(estimateName:string):Promise<InfracostEstimate | null>;
}