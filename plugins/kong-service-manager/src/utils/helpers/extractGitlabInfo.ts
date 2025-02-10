export function extractGitLabInfo(url:string) {
    const regex = /https:\/\/([^\/]+)\/(.+?)\/([^\/]+)\/-\/blob\/([^\/]+)\/(.*)$/;
    const match = url.match(regex);
  
    if (!match) {
      throw new Error('Invalid URL');
    }
  
    const [_, host, group, repo, branch, filePath] = match;
  
    return {
      host,
      group,
      repo,
      branch,
      filePath,
    };
  }