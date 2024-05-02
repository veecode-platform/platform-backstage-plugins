export const decodeBase64 = (base64String: string) : string => {
    const base64Encoded = base64String.split(',')[1];
    const decodedString = atob(base64Encoded);
    return decodedString
}