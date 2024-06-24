import { useApi } from "@backstage/core-plugin-api";
import { kubernetesApiRef } from '@backstage/plugin-kubernetes';
import { useCallback } from "react";
import useAsyncRetry from 'react-use/esm/useAsyncRetry';
import useInterval from 'react-use/esm/useInterval';
import { KUBERNETES_PATH_RESULTS } from "../utils/constants/annotations";
import { UseKubernetesProps, UseKubernetesResponse } from "../utils/types/useKubernetesResults";


export const useKubernetesResults = ({
  clusterName,
  intervalMs = 1000000,
}: UseKubernetesProps): UseKubernetesResponse => {
  const kubernetesApi = useApi(kubernetesApiRef);

  const getResults = useCallback(async () => {
    try {
      return await (
        await kubernetesApi.proxy({
          clusterName,
          path: KUBERNETES_PATH_RESULTS,
        })
      ).json();
    } catch (error: any) {
      throw new Error(error);
    }
  }, [kubernetesApi, clusterName]);

  const { value, loading, error, retry } = useAsyncRetry(
    async () => getResults(),
    [getResults],
  );

  useInterval(() => retry(), intervalMs);

  return {
    kubernetesResults: value,
    loading: loading,
    error: error?.message as string,
  };
};