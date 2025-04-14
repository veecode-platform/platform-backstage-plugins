import { FileContent } from "@veecode-platform/backstage-plugin-vee-common";
import { getLanguageFromFilename } from "./getLanguageFromFilename";

function transformToObjectWithFileContent(obj: Record<string, any>,baseFilePath: string = ""): FileContent[] {
  const result: FileContent[] = [];

  function traverse(currentObject: Record<string, any>, currentPath: string = ""): void {
    for (const key in currentObject) {
      if (Object.hasOwn(currentObject, key)) { 
        const newPath = currentPath ? `${currentPath}/${key}` : key;
        if (currentObject[key] === null) {
          result.push({
            name: key,
            relativePath: `${baseFilePath}/${newPath.replace(/^\//, '')}`,
            content: `Content of ${key} here`,
            type: getLanguageFromFilename(key),
          });
        } else if (typeof currentObject[key] === 'object') {
          traverse(currentObject[key], newPath);
        }
      }
    }
  }

  traverse(obj);
  return result;
}

export function transformStringToObject(jsonString: string, baseFilePath: string = ""): FileContent[] {
  const newJsonString = jsonString.replace(
    /([{,]\s*)(\.\w+|[a-zA-Z0-9_\-.]+)\s*:/g,
    '$1"$2":'
  );
  const objTransformed: Record<string, any> = JSON.parse(newJsonString); 
  const fileContentsData = transformToObjectWithFileContent(objTransformed,baseFilePath);
  return fileContentsData;
}