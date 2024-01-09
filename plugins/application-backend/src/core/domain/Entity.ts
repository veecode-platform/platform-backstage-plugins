import { v4 as uuidv4 } from 'uuid';

export class Entity<T> {
  public _id?: string;
  public props: T;

  constructor(props: T, id?: string) {
    this._id = id ?? uuidv4();
    this.props = props;
  }
}
  