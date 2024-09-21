  export interface PluginCard {
    id?: string | null,
    name: string,
    slug: string,
    associated?: boolean,
    image: string,
    tags: string[],
    description: string,
  }
  export interface HeaderObj {
    id: string;
    value: string;
  }

  export interface Headers {
    headers: {
        [key: string]: string[];
    };
  }

  export interface Destination {
    ip: string;
    port: number;
  }

  export interface Sources {
    ip: string;
    port: number;
  }

export interface PluginForSpec {
  image: string,
  name: string,
  slug: string,
  description: string,
  config: any
  enabledToSpec: boolean,
}


export interface PullRequestResponse {
  status: number;
  link?: string;
  message: string;
}
