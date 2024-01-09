import { Plugin } from '../domain/Plugin';
import { PluginResponseDto } from '../dtos/PluginResponseDto';

export class PluginMapper {
  static async toPersistence(plugin: Plugin) {
    return {
      id: plugin._id,
      name: plugin.props.name,
      service: plugin.props.service,
      kongPluginId: plugin.props.kongPluginId,
      createdAt: plugin.props.createdAt,
      updatedAt: plugin.props.updatedAt,
    };
  }
  static async listAllPluginsToResource(pluginResponseDto: PluginResponseDto) {
    return {
      plugins: pluginResponseDto.props.plugins ?? [],
      plugin: pluginResponseDto.props.plugin ?? '',
    };
  }
}
