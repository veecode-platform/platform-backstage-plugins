import { Entity } from '../../../core/domain/Entity';

export type ApplicationProps = {
  name: string;
  creator: string;
  active?: boolean;
  externalId?: string;
  createdAt?: Date;
  updateAt?: Date;
  partner?: string;
};

export class Application extends Entity<ApplicationProps> {
  name?: string;
  creator?: string;
  active?: boolean;
  externalId?: string;
  createdAt?: Date;
  updateAt?: Date;
  partner?: string;
  private constructor(props: ApplicationProps, id?: string) {
    super(props, id);
  }
  static create(props: ApplicationProps, id?: string): Application {
    props.createdAt = props.createdAt || new Date();
    return new Application(props, id);
  }
}
