export class Consumer {
  username: string;
  tags?: string[];

  constructor(username: string, tags?: string[]) {
    this.username = username;
    this.tags = tags;
  }
}
