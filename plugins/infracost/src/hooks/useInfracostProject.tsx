import { useApi } from "@backstage/core-plugin-api";
import { infracostApiRef } from "../api";
import useAsync from "react-use/esm/useAsync";
import { InfracostEstimate } from "@veecode-platform/backstage-plugin-infracost-common";

export const useInfracostProjects : 
(infracostProject:string) => {
    estimate?: InfracostEstimate | null,
    loading: boolean,
    error?: Error
} = (infracostProject) => {
  const api = useApi(infracostApiRef);
  const { value, loading, error} = useAsync(()=>{
    return api.getEstimateByName(infracostProject)
  },[api]);

  return {
    estimate: value,
    loading,
    error
  }
};
