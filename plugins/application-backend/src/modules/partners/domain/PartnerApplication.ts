import { Entity } from "../../../core/domain/Entity";

export type PartnerApplicationsProps = {
  
    partner_id: string;
    application_id: string;
};

export class PartnerApplication extends Entity<PartnerApplicationsProps>{
    partner_id?: string;
    application_id?: string;
    

    private constructor(props: PartnerApplicationsProps, id?: string) {
        super(props, id);
      }
      static create(props: PartnerApplicationsProps, id?: string): PartnerApplication {
        return new PartnerApplication(props, id);
      }

}
