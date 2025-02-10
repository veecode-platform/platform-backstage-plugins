import { RouteResponse } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { useKongServiceManagerContext } from "../../../../context";
import React from "react";
import { RouteListComponentProps } from "./types";
import useAsync from "react-use/esm/useAsync";
import { WrapperComponent } from "../wrapperComponent";
import { PluginsTableComponent } from "../pluginsTableComponent";
import RouteListTable from "./routeListTable/RouteListTable";
import { initialRouteDetailsState, removeRouteDetails, RouteDetailsReducer } from "./state";
import { transformPath } from "../../../../utils/helpers/transformPath";
import { EmptyState } from "@backstage/core-components";
import { useRouteListComponentStyles } from "./style";

const RouteListComponent : React.FC<RouteListComponentProps> = (props) => { 
  const [ routeDetailsState, routeDetailsDispatch] = React.useReducer(RouteDetailsReducer, initialRouteDetailsState);
  const { getRoutesList } = useKongServiceManagerContext();
  const { root } = useRouteListComponentStyles();
  const { specname } = props;

  const fetchRoutes = async (): Promise<RouteResponse[]> => {
    const data = await getRoutesList() as RouteResponse[];
    return data;
  }

  const resetRouteIdValue = () => routeDetailsDispatch(removeRouteDetails())

  const {value: routes, loading, error} = useAsync(fetchRoutes,[]);

  if(error)  return (
    <WrapperComponent title="Route List">
     <div className={root}>
      <EmptyState 
       missing="data" 
       title="No routes to show" 
       description={error.message}
        />  
     </div>
    </WrapperComponent>
  )

  return (
    <>
      {routeDetailsState ? (
        <WrapperComponent 
          title={<>Plugins associated to path <span>{transformPath(routeDetailsState.path)}</span></>} 
          buttonBack
          handleBack={resetRouteIdValue}
          >
          <PluginsTableComponent 
            specName={specname} 
            route={routeDetailsState}
            />
        </WrapperComponent>
      ) : (
        <WrapperComponent title="Route List">
          <RouteListTable
            routes={routes!}
            loading={loading}
            setRouteDetails={routeDetailsDispatch}
          />
        </WrapperComponent>
      )}
    </>
  );
}

export default React.memo(RouteListComponent)