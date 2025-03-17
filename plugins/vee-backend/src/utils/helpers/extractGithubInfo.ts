export function extractGitHubInfo(url:string, partial?:boolean) {
  const regex =
    /https:\/\/([^/]+)\/([^/]+)\/([^/]+)\/(blob|tree)\/([^/]+)(?:\/([^?]+))?/;
  const match = url.match(regex);

  if (!match) {
    throw new Error('URL inválida');
  }

  const [_, host, owner, repo, type, branch, path] = match;

  if (partial && path) {
    const folderPath = path.split('/').slice(0, -1).join('/');
    return {
      host,
      owner,
      repo,
      type,
      branch,
      path,
      folderPath,
    };
  }

  return {
    host,
    owner,
    repo,
    type,
    branch,
    path: path || '',
  };
};