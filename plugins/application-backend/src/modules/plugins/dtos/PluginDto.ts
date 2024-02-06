export class PluginDto {
  name: string;
  kongPluginId: string;
  service: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    name: string,
    service: string,
    pluginId: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.name = name;
    
    this.service = service;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.kongPluginId = pluginId;
  }
}
