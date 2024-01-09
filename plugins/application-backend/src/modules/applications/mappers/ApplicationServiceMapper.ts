
import { ApplicationService } from '../domain/ApplicationService';
import { ApplicationResponseDto } from '../dtos/ApplicationResponseDto';

export class ApplicationServiceMapper {
  static async toPersistence(application: ApplicationService) {
    return {
      id: application._id,
      application_id: application.props.application_id,
      service_id: application.props.service_id
    };
  }
  static async listAllApplicationsToResource(
    applicationResponseDto: ApplicationResponseDto,
  ) {
    return {
      applications: applicationResponseDto.props.applications ?? [],
      application: applicationResponseDto.props.application ?? '',
      services: applicationResponseDto.props.services ?? [],
    };
  }
}
