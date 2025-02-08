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

const RouteListComponent : React.FC<RouteListComponentProps> = (props) => { 
  const [ routeDetailsState, routeDetailsDispatch] = React.useReducer(RouteDetailsReducer, initialRouteDetailsState);
  const { getRoutesList } = useKongServiceManagerContext();
  const { specname } = props;

  const fetchRoutes = async (): Promise<RouteResponse[]> => {
    const data = await getRoutesList() as RouteResponse[];
    return data;
  }

  const resetRouteIdValue = () => routeDetailsDispatch(removeRouteDetails())

  const {value: routes, loading, error} = useAsync(fetchRoutes,[]);

  // TODO create error component
  if(error)  return (
    <WrapperComponent title="Route List">
      <div>Error...</div>  
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