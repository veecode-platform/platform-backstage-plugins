import { Entity } from "../../../core/domain/Entity";

export type ApplicationPartnerProps = {
  
    application_id: string;
    partner_id: string;
};

export class ApplicationPartner extends Entity<ApplicationPartnerProps>{
    application_id?: string;
    partner_id?: string;
    

    private constructor(props: ApplicationPartnerProps, id?: string) {
        super(props, id);
      }
      static create(props: ApplicationPartnerProps, id?: string): ApplicationPartner {
        return new ApplicationPartner(props, id);
      }

}
