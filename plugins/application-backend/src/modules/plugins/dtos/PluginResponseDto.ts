import { Plugin } from '../domain/Plugin';
import { ResponseEntity } from '../../../core/domain/ResponseEntity';

type ResponseProps = {
  plugins?: Plugin[] | void;
  pluginIt?: Plugin[] | void;
  plugin?: Plugin | void;
};

export class PluginResponseDto extends ResponseEntity<ResponseProps> {
  private constructor(props: ResponseProps) {
    super(props);
  }
  static create(props: ResponseProps): PluginResponseDto {
    props.plugin =
      (props.pluginIt?.length && props.pluginIt?.[0]) || props.plugin;
    return new PluginResponseDto(props);
  }
}
