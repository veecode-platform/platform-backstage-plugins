export function transformPath(input:string) {
    return input
      .replace(/~\/([^$?]+)\(\?<([a-zA-Z0-9_]+)>[^)]+\)\$?/g, (_, path, param) => {
        return `/${path}{${param.charAt(0).toUpperCase() + param.slice(1)}}`;
      })
      .replace(/~\/([^$?]+)\$?/g, (_, path) => {
        return `/${path}`;
      });
  }