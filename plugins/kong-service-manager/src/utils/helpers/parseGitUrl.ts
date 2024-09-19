export function parseGitUrl(url:string){
 return url.split('url:')[1];
}