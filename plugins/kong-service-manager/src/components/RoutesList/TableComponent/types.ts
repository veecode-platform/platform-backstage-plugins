import { RoutesResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export interface TableComponentProps {
    isLoading: boolean;
    dataProps: RoutesResponse[] | [];
    handleEditModal?: (route: any) => void;
    refreshList: () => void
  }  

export interface TableData {
    id: string,
    name: string,
    protocols: string[],
    methods: string[],
    hosts: string[],
    paths: string[],
    tags: string[]
  }