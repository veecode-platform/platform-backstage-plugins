export interface PluginCard {
  id?: string | null;
  name: string;
  slug: string;
  associated?: boolean;
  // image: string,
  tags: string[];
  description: string;
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
  // image: string;
  name: string;
  slug: string;
  description: string;
  config: any;
  enabledToSpec: boolean;
}

export interface PullRequestResponse {
  status: number;
  link?: string;
  message: string;
}

export interface GithubFileResponse {
  type: 'dir' | 'file' | 'submodule' | 'symlink';
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string;
  _links: {
    git: string;
    self: string;
    html: string;
  };
}

export interface RouteDetailsProps {
  id: string;
  name: string;
  method: string;
  path: string;
}
