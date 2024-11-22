export function extractGitHubInfo(url: string) {
  const regex = /https:\/\/([^\/]+)\/([^\/]+)\/([^\/]+)\/tree\/([^\/]+)(?:\/(.*))?\/([^\/]+)$/;
  const match = url.match(regex);

  if (!match) {
    throw new Error("Invalid URL ;@");
  }

  const [_, host, owner, repo, branch, path, file] = match;

  return {
    host,
    owner,
    repo,
    branch,
    path: path || "",
    file,
  };
}
