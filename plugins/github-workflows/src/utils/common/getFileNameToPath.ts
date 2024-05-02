export const getFileNameToPath = (path:string) => {
    if(path && path.startsWith('.github/workflows/')){
        const parts = path.split("/");
        const lastPart = parts[parts.length - 1];
        const result = lastPart.replace(".yml", ".yaml");
        return result
    }
    return null
}