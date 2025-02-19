export function extractGitHubInfo(url: string) {
  const regex =
    /^https:\/\/([^\/]+)\/([^\/]+)\/([^\/]+)\/tree\/([^\/]+)(?:\/.*)?$/;
  const match = url.match(regex);

  if (!match) {
    throw new Error("Invalid GitHub URL.");
  }

  const [_, host, owner, repo, branch] = match;

  return {
    host,
    owner,
    repo,
    branch,
  };
}