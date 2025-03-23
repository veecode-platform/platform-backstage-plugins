export function extractGitHubInfo(url:string) {
  const regex =
    /https:\/\/([^/]+)\/([^/]+)\/([^/]+)\/(blob|tree)\/([^/]+)(?:\/([^?]+))?/;
  const match = url.match(regex);

  if (!match) {
    throw new Error('URL inválida');
  }

  const [_, host, owner, repo, type, branch, path] = match;
  const folderPath = path ? path.split('/').slice(0, -1).join('/') : '';

  return {
    host,
    owner,
    repo,
    type,
    branch,
    path: path || '',
    folderPath
  };
};