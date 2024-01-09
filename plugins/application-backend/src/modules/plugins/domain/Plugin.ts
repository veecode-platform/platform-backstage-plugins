import { Entity } from '../../../core/domain/Entity';

export type PluginProps = {
  name: string;
  kongPluginId: string;
  service: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Plugin extends Entity<PluginProps> {
  private constructor(props: PluginProps, id?: string) {
    super(props, id);
  }
  static create(props: PluginProps, id?: string): Plugin {
    props.createdAt = props.createdAt || new Date();
    return new Plugin(props, id);
  }
}
