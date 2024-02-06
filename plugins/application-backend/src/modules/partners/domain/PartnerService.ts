import { Entity } from "../../../core/domain/Entity";

export type PartnerServiceProps = {
  
    partner_id: string;
    service_id: string;
};

export class PartnerService extends Entity<PartnerServiceProps>{
    partner_id?: string;
    service_id?: string;
    

    private constructor(props: PartnerServiceProps, id?: string) {
        super(props, id);
      }
      static create(props: PartnerServiceProps, id?: string): PartnerService {
        return new PartnerService(props, id);
      }

}
