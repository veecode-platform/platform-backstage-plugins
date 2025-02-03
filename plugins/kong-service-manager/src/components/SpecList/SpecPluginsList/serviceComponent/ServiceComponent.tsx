import React from "react";
import { PluginsTable } from "../pluginsTable";
import { WrapperComponent } from "../wrapperComponent";
import { ServiceComponentProps } from "./types";

const ServiceSpecList : React.FC<ServiceComponentProps> = (props) => {
  const { specname } = props;
  return (
    <WrapperComponent title="Plugins associated to service">
      <PluginsTable specName={specname} />
    </WrapperComponent>
  )
}

export default React.memo(ServiceSpecList)