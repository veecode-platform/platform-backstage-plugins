export function transformPath(input: string): string {
  return input
    .replace(/~\/([^$?]+)\(\?<([a-zA-Z0-9_]+)>[^)]+\)\$?/g, (_, path: string, param: string) => {
      const camelCaseParam = param
        .replace(/_([a-z])/g, (___, letter: string) => letter.toUpperCase())
        .replace(/([a-z])([A-Z]{2,})([a-z])/g, (__, p1: string, p2: string, p3: string) => 
          `${p1}${p2.charAt(0)}${p2.slice(1).toLowerCase()}${p3}`
        )
        .replace(/(id|uuid|token|key|code)$/i, (match: string) => 
          match.charAt(0).toUpperCase() + match.slice(1).toLowerCase() 
        );

      return `/${path}{${camelCaseParam}}`;
    })
    .replace(/~\/([^$?]+)\$?/g, (_, path: string) => {
      return `/${path}`;
    });
}
