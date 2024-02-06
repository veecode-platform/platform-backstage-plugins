export class ResponseEntity<T> {
  public props: T;
  protected _statusMessage?: string;
  constructor(props: T, statusMessage?: string) {
    this.props = props;
    this._statusMessage = statusMessage;
  }
}
