import  type { ServiceInfoResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export interface AboutServiceProps {
    error: Error | undefined,
    loading: boolean,
    serviceDetails: ServiceInfoResponse | null | undefined
}
