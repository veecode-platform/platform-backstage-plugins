import { PartnerApplication } from "../domain/PartnerApplication";


export class PartnerApplicationMapper {
  static async toPersistence(partners: PartnerApplication) {
    return {
      id: partners._id,
      application_id: partners.props.application_id,
      partner_id: partners.props.partner_id
    };
  }
}
