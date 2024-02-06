import { Service } from '../domain/Service';
import { ServiceResponseDto } from '../dtos/ServiceResponseDto';

export class ServiceMapper {
  static async toPersistence(service: Service) {

    return {
      id: service._id,
      name: service.props.name,
      active: service.props.active,
      description: service.props.description,
      kongServiceName: service.props.kongServiceName,
      kongServiceId: service.props.kongServiceId,
      createdAt: service.props.createdAt,
      securityType: service.props.securityType,
      rateLimiting: service.props.rateLimiting,
      rateLimitingType: service.props.rateLimitingType,
      rateLimitingBy: service.props.rateLimitingBy
    }
    
  }
  static async listAllServicesToResource(
    serviceResponseDto: ServiceResponseDto,
  ) {
    return {
      services: serviceResponseDto.props.services ?? [],
      service: serviceResponseDto.props.service ?? '',
    };
  }
}
