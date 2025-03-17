export function extractGitHubInfo (url:string){

  const regex =
    /https:\/\/([^/]+)\/([^/]+)\/([^/]+)\/(blob|tree)\/([^/]+)(?:\/(.*))?/;
  const match = url.match(regex);

  if (!match) {
    throw new Error('URL inválida');
  }

  const [_, host, owner, repo, type, branch, path] = match;

  return {
    host,
    owner,
    repo,
    type,
    branch,
    path: path || '',
  };
};