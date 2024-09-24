import yaml from 'js-yaml';
import { IDefinition } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export function formatObject(obj: IDefinition): string {
    return yaml.dump(obj, { noRefs: true, lineWidth: 120 });
}