
import { ApplicationPartner } from '../domain/ApplicationPartner';
import { ApplicationResponseDto } from '../dtos/ApplicationResponseDto';

export class ApplicationPartnerMapper {
  static async toPersistence(application: ApplicationPartner) {
    return {
      id: application._id,
      application_id: application.props.application_id,
      partner_id: application.props.partner_id
    };
  }
  static async listAllApplicationsToResource(
    applicationResponseDto: ApplicationResponseDto,
  ) {
    return {
      applications: applicationResponseDto.props.applications ?? [],
      application: applicationResponseDto.props.application ?? '',
      partner: applicationResponseDto.props.partner ?? [],
    };
  }
}
