import { IDefinition } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export function formatObject(obj:IDefinition) : string{
    const jsonString = JSON.stringify(obj, null, 2);
    return jsonString.replace(/[{},]/g, '').replace(/["[\]]/g, '');
  }