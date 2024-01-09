import { Entity } from "../../../core/domain/Entity";

export type ApplicationServiceProps = {
  
    application_id: string;
    service_id: string;
};

export class ApplicationService extends Entity<ApplicationServiceProps>{
    application_id?: string;
    service_id?: string;
    

    private constructor(props: ApplicationServiceProps, id?: string) {
        super(props, id);
      }
      static create(props: ApplicationServiceProps, id?: string): ApplicationService {
        return new ApplicationService(props, id);
      }

}
