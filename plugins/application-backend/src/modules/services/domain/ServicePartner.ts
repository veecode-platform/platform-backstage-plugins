import { Entity } from "../../../core/domain/Entity";

export type ServicePartnerProps = {
  
    service_id: number;
    partner_id: number;
};

export class ServicePartner extends Entity<ServicePartnerProps>{
    service_id?: number;
    partner_id?: number;
    

    private constructor(props: ServicePartnerProps, id?: string) {
        super(props, id);
      }
      static create(props: ServicePartnerProps, id?: string): ServicePartner {
        return new ServicePartner(props, id);
      }

}

