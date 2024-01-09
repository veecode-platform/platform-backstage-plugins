import { PartnerService } from "../domain/PartnerService";


export class PartnerServiceMapper {
  static async toPersistence(partners: PartnerService) {
    return {
      id: partners._id,
      service_id: partners.props.service_id,
      partner_id: partners.props.partner_id
    };
  }
}
