import React from "react";
import { WrapperComponent } from "../wrapperComponent";
import { ServiceComponentProps } from "./types";
import { PluginsTableComponent } from "../pluginsTableComponent";

const ServiceSpecList : React.FC<ServiceComponentProps> = (props) => {
  const { specname } = props;
  return (
    <WrapperComponent title="Plugins associated to service">
      <PluginsTableComponent specName={specname} />
    </WrapperComponent>
  )
}

export default React.memo(ServiceSpecList)